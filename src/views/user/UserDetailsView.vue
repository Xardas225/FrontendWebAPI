<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import { useUserStore } from "@/store/user";
import { useRoute } from "vue-router";
import {
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCard,
  ElCol,
  ElDivider,
  ElIcon,
  ElRow,
} from "element-plus";
import { useAuthStore } from "@/store/auth";
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const userApi = useUserStore();
const authApi = useAuthStore();
const userId = ref(route?.params?.id);
const currentUserId = ref(authApi.user.id);
const userData = reactive({});

const isEditable = computed(() => userId.value == currentUserId.value);

const load = async () => {
  try {
    const data = await userApi.loadUserData(userId.value);
    Object.assign(userData, data);
  } catch (error) {
    console.error("Ошибка при получении пользователей:", error.message);
  }
};

const editUser = () => {
  router.push({
    name: "user-edit",
    params: {
      id: userId.value
    }
  })
}

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="profile-page">
    <!-- Хлебные крошки -->
    <ElBreadcrumb separator="/" class="breadcrumb">
      <ElBreadcrumbItem :to="{ path: '/' }">Главная</ElBreadcrumbItem>
      <ElBreadcrumbItem :to="{ path: '/users' }">Пользователи</ElBreadcrumbItem>
      <ElBreadcrumbItem>{{ userData.name }}</ElBreadcrumbItem>
    </ElBreadcrumb>

    <!-- Основная информация -->
    <ElCard class="profile-card" shadow="never">
      <div class="profile-header">
        <div class="profile-avatar">
          <ElAvatar :size="100" :src="userData.avatarUrl">
            {{ userData.name }}
          </ElAvatar>

          <!-- <ElButton @click="chooseFile"> Изменить </ElButton>

          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            class="file-input"
            @change="handleFileSelect"
          /> -->
        </div>

        <div class="profile-info">
          <h1 class="profile-name">
            {{ userData.name }} {{ userData.lastName }}
          </h1>
        </div>

        <div class="profile-actions">
          <ElButton v-if="isEditable" @click="editUser">
            <ElIcon>
              <Edit />
            </ElIcon>
            Редактировать
          </ElButton>
        </div>
      </div>

      <!-- Детали -->
      <ElDivider />

      <div class="profile-details">
        <ElRow :gutter="20">
          <ElCol :span="12">
            <div class="detail-item">
              <span class="detail-label">Email:</span>
              <span class="detail-value">{{ userData.email }}</span>
            </div>
          </ElCol>

          <ElCol :span="12">
            <div class="detail-item">
              <span class="detail-label">Телефон:</span>
              <span class="detail-value">{{
                userData.phone || "Не указан"
              }}</span>
            </div>
          </ElCol>
        </ElRow>
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
@import "@/assets/styles/components/profiles.css";
</style>
