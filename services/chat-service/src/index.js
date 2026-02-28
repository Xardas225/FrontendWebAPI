import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

const users = {};

io.on("connection", (socket) => {
  console.log(`SOCKET RUN - ${socket.id}`);

  // Регистрация пользователя
  socket.on("register", (userId) => {
    users[userId] = socket.id;
    console.log(`REGISTER USER - ${userId}`);
  });

  // Событие обработки сообщения пользователя
  socket.on("chat message", (message) => {
    console.log(message);
  });
});

httpServer.listen(3000);
