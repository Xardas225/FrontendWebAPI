<script setup>
import {
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCol,
  ElRate,
  ElRow,
  ElCard,
  ElIcon,
  ElSkeleton,
} from "element-plus";
import { ref, onMounted, computed, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChefStore } from "@/store/chef";
import { useUserStore } from "@/store/user";
import { useAuthStore } from "@/store/auth";
import { useNotification } from "@/composables/useNotification";
import BreadcrumbComponent from "@/components/BreadcrumbComponent.vue";


const fileInput = ref();
const route = useRoute();
const router = useRouter();
const chefUserId = ref(route?.params?.id);
const chefApi = useChefStore();
const userApi = useUserStore();
const authApi = useAuthStore();

const userId = ref(authApi.user.id);
const chef = ref({});
const isLoading = ref(false);

const breadcrumbItems = reactive([
  {
    path: "/",
    title: "Главная",
  },
  {
    path: "/chefs",
    title: "Повара",
  },
  {
    path: "",
    title: "Редактирование",
  },
]);


const load = async () => {
  try {
    chef.value = {};

    chef.value = await chefApi.getChefByUserId(chefUserId.value);
  } catch (error) {
    useNotification("Неудачно", "Ошибка при получении данных", "error");
  }
};

const chooseFile = () => {
  fileInput.value.click();
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();

    formData.append("userId", chefUserId.value);
    formData.append("file", file);

    await userApi.setUserAvatar(formData);
    await load();
  }
};

const isEditable = computed(() => userId.value == chef.value.userId);

const editKitchen = () => {
  router.push({
    name: "chef-edit",
    params: {
      id: userId.value,
    },
  });
};

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="profile-page">
    <!-- Хлебные крошки -->

    <BreadcrumbComponent :items="breadcrumbItems" />

    <template v-if="isLoading">
      <ElSkeleton rows="5" animated />
    </template>

    <template v-else>
      <!-- Основная информация -->
      <ElCard class="profile-card" shadow="never">
        <div class="profile-header">
          <div class="profile-avatar">
            <ElAvatar :size="100" :src="chef.avatarUrl">
              {{ chef.name }}
            </ElAvatar>

            <ElButton @click="chooseFile"> Изменить </ElButton>

            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              class="file-input"
              @change="handleFileSelect"
            />
          </div>

          <div class="profile-info">
            <h1 class="profile-name">{{ chef.name }} {{ chef.lastName }}</h1>

            <div class="profile-stats">
              <el-tag
                :type="chef.isActive ? 'success' : 'info'"
                class="status-tag"
              >
                {{ chef.isActive ? "Активен" : "Не активен" }}
              </el-tag>

              <div class="rating">
                <ElRate
                  v-model="chef.rating"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
                <span class="total-orders"
                  >({{ chef.totalOrders }} заказов)</span
                >
              </div>
            </div>
          </div>

          <div class="profile-actions">
            <ElButton
              v-if="!chef.isActive"
              type="primary"
              @click="activateChef"
            >
              Активировать кухню
            </ElButton>

            <ElButton v-else type="warning" @click="deactivateChef">
              Деактивировать кухню
            </ElButton>

            <ElButton v-if="isEditable" @click="editKitchen">
              <ElIcon>
                <Edit />
              </ElIcon>
              Редактировать
            </ElButton>
          </div>
        </div>

        <!-- Детали -->
        <el-divider />

        <div class="profile-details">
          <ElRow :gutter="20">
            <ElCol :span="12">
              <div class="detail-item">
                <span class="detail-label">Название кухни:</span>
                <span class="detail-value">{{ chef.kitchenName }}</span>
              </div>

              <div class="detail-item">
                <span class="detail-label">Опыт:</span>
                <span class="detail-value">{{ chef.chefExperience }} лет</span>
              </div>

              <div class="detail-item">
                <span class="detail-label">Email:</span>
                <span class="detail-value">{{ chef.email }}</span>
              </div>
            </ElCol>

            <ElCol :span="12">
              <div class="detail-item">
                <span class="detail-label">Телефон:</span>
                <span class="detail-value">{{
                  chef.phone || "Не указан"
                }}</span>
              </div>

              <div v-if="chef.startTime && chef.endTime" class="detail-item">
                <span class="detail-label">Время работы:</span>
                <span class="detail-value"
                  >{{ chef.startTime }} - {{ chef.endTime }}</span
                >
              </div>

              <div class="detail-item">
                <span class="detail-label">Всего заказов:</span>
                <span class="detail-value">{{ chef.totalOrders }}</span>
              </div>
            </ElCol>
          </ElRow>
        </div>

        <!-- Описание -->
        <div class="description-section">
          <h3>Описание кухни</h3>
          <p v-if="chef.description" class="description-text">
            {{ chef.description }}
          </p>
          <p v-else class="no-description">Описание отсутствует</p>
        </div>
      </ElCard>

      <!-- Форма отзыва (будет позже) -->
      <div class="coming-soon">
        <ElCard>
          <h3>Отзывы</h3>
          <p>Функционал отзывов будет добавлен позже</p>
        </ElCard>
      </div>
    </template>
  </div>
</template>

<style scoped>
@import "@/assets/styles/components/profiles.css";
</style>
