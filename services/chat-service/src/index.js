import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

mongoose.connect("mongodb://localhost:27017/chats");

const messageSchema = new mongoose.Schema({
  from: String,
  to: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

const users = {};

io.on("connection", (socket) => {
  console.log(`SOCKET RUN - ${socket.id}`);

  // Регистрация пользователя
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`REGISTER USER - ${userId}`);
  });

  // Событие обработки сообщения пользователя
  socket.on("chat message", async (message) => {
    const mongoMessage = new Message({
      from: socket.userId,
      to: message.to,
      text: message.text,
      room: false,
    });
    await mongoMessage.save();

    if (message.to && users[message.to]) {
      io.to(users[message.to]).emit("chat message", {
        from: socket.id,
        text: message.text,
        timestamp: Date.now(),
      });
    } else {
      console.log("Получатель не в сети или не найден");
    }
  });
});

httpServer.listen(3001);
