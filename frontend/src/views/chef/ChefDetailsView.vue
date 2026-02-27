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
import { useAuthStore } from "@/store/auth";
import { useNotification } from "@/composables/useNotification";
import BreadcrumbComponent from "@/components/BreadcrumbComponent.vue";

const route = useRoute();
const router = useRouter();
const chefApi = useChefStore();
const authApi = useAuthStore();
const chefUserId = ref(route.params.id);

const userId = authApi.user.id;
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

const isEditable = computed(() => userId == chef.value.userId);

const routeToEditKitchen = () => {
  router.push({
    name: "chef-edit",
    params: {
      id: userId,
    },
  });
};

const routeToChat = () => {
  router.push({
    name: "chat",
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
            <ElButton v-if="!chef.isActive" type="primary" @click="routeToChat">
              Написать шефу
            </ElButton>

            <ElButton v-else type="warning" @click="deactivateChef">
              Деактивировать кухню
            </ElButton>

            <ElButton v-if="isEditable" @click="routeToEditKitchen">
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

      <div class="dishes-section" v-if="chef.dishes && chef.dishes.length">
        <h3>Блюда шефа</h3>
        <div class="dishes-scroll">
          <ElCard
            v-for="dish in chef.dishes"
            :key="dish.id"
            class="dish-card"
            shadow="hover"
          >
            <!-- содержимое карточки (оставляем как было) -->
            <div class="dish-card-header">
              <span class="dish-name">{{ dish.name }}</span>
              <el-tag size="small" type="info">{{ dish.category }}</el-tag>
            </div>
            <p class="dish-description">{{ dish.description }}</p>
            <div class="dish-meta">
              <span class="dish-price">{{ dish.price }} ₽</span>
              <span class="dish-cook-time">{{ dish.cookTime }} мин</span>
            </div>
            <div class="dish-footer">
              <span class="dish-kitchen">{{ dish.kitchen }}</span>
              <span class="dish-date">{{
                new Date(dish.createdDate).toLocaleDateString()
              }}</span>
            </div>
          </ElCard>
        </div>
      </div>

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

.dishes-section {
  margin-top: 30px;
}
.dishes-section h3 {
  margin-bottom: 20px;
  font-size: 1.5rem;
  color: #303133;
}
.dish-card {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  width: 280px;
  margin: 0;
}
.dish-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}
.dish-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.dish-name {
  font-weight: 600;
  font-size: 1.1rem;
  color: #2c3e50;
}
.dish-description {
  color: #606266;
  font-size: 0.9rem;
  margin: 10px 0;
  line-height: 1.5;
  min-height: 3em;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
.dish-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.dish-price {
  font-weight: 700;
  color: #f56c6c;
}
.dish-cook-time {
  color: #909399;
}
.dish-footer {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #909399;
  border-top: 1px solid #ebeef5;
  padding-top: 8px;
}

.dishes-scroll {
  display: grid;
  grid-auto-flow: column;
  grid-template-rows: repeat(2, auto);
  gap: 20px;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 10px;
  scrollbar-width: thin;
}

.dishes-scroll::-webkit-scrollbar {
  height: 6px;
}

.dishes-scroll::-webkit-scrollbar-thumb {
  background-color: #c0c4cc;
  border-radius: 3px;
}

@media (max-width: 768px) {
  .dish-card {
    width: 220px;
  }
}
</style>
