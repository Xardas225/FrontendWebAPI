<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import {
  ElContainer,
  ElAside,
  ElInput,
  ElMenu,
  ElMenuItem,
  ElBadge,
  ElAvatar,
  ElMain,
  ElHeader,
  ElButton,
} from "element-plus";
import { io } from "socket.io-client";
import { useAuthStore } from "@/store/auth";

const authApi = useAuthStore();
const user = computed(() => authApi.user);
const socket = ref(null);
const url = "http://localhost:3001";
const isConnected = ref(false);

const chats = ref([
  {
    id: 1,
    name: "Анна Смирнова",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    lastMessage: "Привет! Как дела?",
    time: "12:30",
    unread: 2,
  },
  {
    id: 2,
    name: "Иван Петров",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    lastMessage: "Созвонимся позже",
    time: "Вчера",
    unread: 0,
  },
  {
    id: 3,
    name: "Рабочая группа",
    avatar: "https://randomuser.me/api/portraits/lego/1.jpg",
    lastMessage: "Документы готовы",
    time: "15:20",
    unread: 5,
  },
  {
    id: 4,
    name: "Мария Иванова",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    lastMessage: "Спасибо за помощь",
    time: "09:45",
    unread: 0,
  },
]);

const messages = ref([
  {
    id: 1,
    text: "Привет! Ты получила мои файлы?",
    time: "12:30",
    isOwn: false,
  },
  { id: 2, text: "Да, спасибо. Посмотрю сегодня", time: "12:31", isOwn: true },
  {
    id: 3,
    text: "Отлично! Тогда созвонимся вечером",
    time: "12:32",
    isOwn: false,
  },
  { id: 4, text: "Договорились", time: "12:33", isOwn: true },
]);

const newMessage = ref("");

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

  socket.value.emit("register", user.value.id);
});

onUnmounted(() => {
  if (socket.value) {
    socket.value.disconnect();
    socket.value = null;
  }
});

const sendMessage = () => {
  if (!newMessage.value.trim()) return;
  socket.value.emit("chat message", {
    to: 18,
    text: newMessage.value,
    messageId: Date.now(), // временный ID
  });
  newMessage.value = "";
};
</script>

<template>
  <ElContainer class="chat-container">
    <ElAside width="320px" class="chat-aside">
      <div class="aside-header">
        <h3>Диалоги</h3>
        <ElInput
          placeholder="Поиск"
          prefix-icon="el-icon-search"
          size="small"
        />
      </div>
      <ElMenu class="chat-menu">
        <ElMenuItem v-for="chat in chats" :key="chat.id" class="chat-item">
          <ElBadge :value="chat.unread" :hidden="!chat.unread">
            <ElAvatar :size="40" :src="chat.avatar" />
          </ElBadge>
          <div class="chat-info">
            <div class="chat-name">{{ chat.name }}</div>
            <div class="chat-last">{{ chat.lastMessage }}</div>
          </div>
          <div class="chat-time">{{ chat.time }}</div>
        </ElMenuItem>
      </ElMenu>
    </ElAside>

    <ElMain class="chat-main">
      <ElHeader class="chat-header">
        <div class="current-chat-info">
          <ElAvatar
            :size="40"
            src="https://randomuser.me/api/portraits/women/44.jpg"
          />
          <span class="current-chat-name">Анна Смирнова</span>
        </div>
      </ElHeader>

      <div class="messages-area">
        <div
          v-for="msg in messages"
          :key="msg.id"
          class="message-wrapper"
          :class="{ own: msg.isOwn }"
        >
          <div class="message">
            <div class="message-text">{{ msg.text }}</div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>
      </div>

      <div class="message-input">
        <ElInput
          v-model="newMessage"
          placeholder="Напишите сообщение..."
          size="large"
        >
          <template #append>
            <ElButton @click="sendMessage">
              <ElIcon>
                <Message />
              </ElIcon>
            </ElButton>
          </template>
        </ElInput>
      </div>
    </ElMain>
  </ElContainer>
</template>

<style scoped>
.chat-container {
  height: 100vh;
  font-family:
    "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "Microsoft YaHei", Arial, sans-serif;
  display: flex;
}

.chat-aside {
  background-color: #f5f7fa;
  border-right: 1px solid #e4e7ed;
  display: flex;
  flex-direction: column;
}

.aside-header {
  padding: 20px 16px 10px;
  border-bottom: 1px solid #e4e7ed;
}

.aside-header h3 {
  margin: 0 0 12px 0;
  font-weight: 400;
  color: #303133;
}

.chat-menu {
  flex: 1;
  overflow-y: auto;
  border-right: none;
}

.chat-item {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  height: auto;
  line-height: normal;
  border-bottom: 1px solid #ebeef5;
}

.chat-item:hover {
  background-color: #ecf5ff;
}

.chat-info {
  flex: 1;
  margin-left: 12px;
  min-width: 0;
}

.chat-name {
  font-size: 16px;
  color: #303133;
  margin-bottom: 4px;
  font-weight: 500;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-last {
  font-size: 13px;
  color: #909399;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chat-time {
  font-size: 12px;
  color: #c0c4cc;
  align-self: flex-start;
  margin-left: 8px;
}

.chat-main {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0;
}

.message-input {
  flex-shrink: 0;
  padding: 20px;
  background-color: #ffffff;
  border-top: 1px solid #e4e7ed;
}

.chat-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  align-items: center;
  height: 60px;
  line-height: 60px;
  padding: 0 20px;
  flex-shrink: 0;
}

.current-chat-info {
  display: flex;
  align-items: center;
}

.current-chat-name {
  margin-left: 12px;
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.messages-area {
  flex: 1 1 auto;
  overflow-y: auto;
  padding: 20px;
  background-color: #f5f7fa;
  border-top: 1px solid #e4e7ed;
}

.message-wrapper {
  display: flex;
  margin-bottom: 16px;
}

.message-wrapper.own {
  justify-content: flex-end;
}

.message {
  max-width: 70%;
  background-color: #ffffff;
  padding: 10px 14px;
  border-radius: 18px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: relative;
  word-wrap: break-word;
}

.own .message {
  background-color: #ecf5ff;
  color: #303133;
}

.message-text {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 4px;
}

.message-time {
  font-size: 11px;
  color: #909399;
  text-align: right;
}
</style>
