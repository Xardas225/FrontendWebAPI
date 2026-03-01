import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

// Models
import User from "./models/User.js";
import Message from "./models/Message.js";
import Chat from "./models/Chat.js";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

mongoose.connect("mongodb://localhost:27017/chats");

io.on("connection", async (socket) => {
  console.log(`SOCKET RUN - ${socket.id}`);

  // Регистрация пользователя
  await register(socket);

  // Событие обработки сообщения пользователя
  socket.on("chat message", async ({ chatId, senderId, recipientId, text }) => {
    const message = new Message({
      chatId,
      senderId,
      recipientId,
      text,
    });

    await message.save();

    await Chat.updateOne(
      { _id: chatId },
      {
        lastMessage: {
          text,
          senderId,
          sentAt: message.createdAt,
        },
      },
    );
  });
});

const register = async (socket) => {
  let chat,
    userIds = [];
  socket.on("register", async (request) => {
    // Проверяем чтобы все пользователи были в базе
    const [sender, recipient] = await Promise.all(
      request.users.map(async ({ id, name }) => {
        let userData = await User.findOne({ externalId: id });
        if (!userData) {
          userData = new User({ externalId: id, name });
          await userData.save();
        }
        return userData;
      }),
    );

    userIds = [sender._id, recipient._id];

    // Проверяем наличие чата
    chat = await Chat.findOne({
      type: "private",
      participants: { $all: userIds, $size: 2 },
    });

    // Если чата нет, создаём его
    if (!chat) {
      chat = new Chat({
        type: "private",
        participants: userIds,
      });

      await chat.save();
    }

    const response = {
      chatId: chat._id,
      senderId: sender._id,
      recipientId: recipient._id,
    };

    socket.emit("chat_ready", response);

    const messages = await getChatMessages(chat._id);

    console.log(messages);
    

    socket.emit("all_messages", messages);
  });
};

async function getChatMessages(chatId) {
  const messages = await Message.find({ chatId })
    .sort({ createdAt: -1 })
    .populate("senderId", "username avatar");

  return messages.reverse();
}

httpServer.listen(3001);
