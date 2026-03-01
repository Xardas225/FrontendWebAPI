import { onMounted, ref, onUnmounted, computed } from "vue";
import { io } from "socket.io-client";

export const useSocket = () => {
  const socket = ref(null);
  const url = "http://localhost:3001";
  const isConnected = ref(false);
  const chatId = ref();
  const senderId = ref();
  const recipientId = ref();
  const messages = ref();

  // Подключение и регистрация
  onMounted(() => {
    socket.value = io(url, {
      autoConnect: true,
      transports: ["websocket"],
    });

    socket.value.on("connect", () => {
      isConnected.value = true;
      console.log("Сокет подключён");
    });

    socket.value.on("disconnect", () => {
      isConnected.value = false;
      console.log("Сокет отключён");
    });

    socket.value.on("chat_ready", (data) => {
      chatId.value = data.chatId;
      senderId.value = data.senderId;
      recipientId.value = data.recipientId;
    });


    socket.value.on("all_messages", (data) => {
      messages.value = data;
    });

  });

  onUnmounted(() => {
    if (socket.value) {
      socket.value.disconnect();
      socket.value = null;
    }
  });

  const emit = (event, data) => {
    socket.value.emit(event, data);
  };

  return {
    emit,
    chatId,
    senderId,
    recipientId,
    messages
  };
};
