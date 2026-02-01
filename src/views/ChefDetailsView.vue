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
} from "element-plus";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useChefStore } from "@/store/chef";
import { useUserStore } from "@/store/user";

const fileInput = ref();
const route = useRoute();
const router = useRouter();
const userId = ref(route?.params?.id || localStorage.getItem("userId"));
const chefApi = useChefStore();
const userApi = useUserStore();

const chef = ref({});

const load = async () => {
  try {
    chef.value = {};

    chef.value = await chefApi.getChefByUserId(userId.value);
  } catch (error) {}
};

const chooseFile = () => {
  fileInput.value.click();
};

const handleFileSelect = async (event) => {
  const file = event.target.files[0];

  if (file) {
    const formData = new FormData();

    formData.append("userId", userId.value);
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
  <div class="chef-page">
    <!-- Хлебные крошки -->
    <ElBreadcrumb separator="/" class="breadcrumb">
      <ElBreadcrumbItem :to="{ path: '/' }">Главная</ElBreadcrumbItem>
      <ElBreadcrumbItem :to="{ path: '/chefs' }">Повара</ElBreadcrumbItem>
      <ElBreadcrumbItem>{{ chef.name }}</ElBreadcrumbItem>
    </ElBreadcrumb>

    <!-- Основная информация -->
    <ElCard class="chef-card" shadow="never">
      <div class="chef-header">
        <div class="chef-avatar">
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

        <div class="chef-info">
          <h1 class="chef-name">{{ chef.name }} {{ chef.lastName }}</h1>

          <div class="chef-stats">
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
              <span class="total-orders">({{ chef.totalOrders }} заказов)</span>
            </div>
          </div>
        </div>

        <div class="chef-actions">
          <ElButton v-if="!chef.isActive" type="primary" @click="activateChef">
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

      <div class="chef-details">
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
              <span class="detail-value">{{ chef.phone || "Не указан" }}</span>
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
  </div>
</template>

<style scoped>
.chef-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.breadcrumb {
  margin-bottom: 20px;
}

.chef-card {
  margin-bottom: 20px;
}

.chef-header {
  display: flex;
  align-items: center;
  gap: 30px;
}

.chef-avatar {
  flex-shrink: 0;
}

.chef-info {
  flex: 1;
}

.chef-name {
  margin: 0 0 15px 0;
  font-size: 28px;
  color: #333;
}

.chef-stats {
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.status-tag {
  font-size: 14px;
  padding: 6px 12px;
}

.rating {
  display: flex;
  align-items: center;
  gap: 10px;
}

.total-orders {
  color: #666;
  font-size: 14px;
}

.chef-actions {
  flex-shrink: 0;
}

.chef-details {
  margin-bottom: 30px;
}

.detail-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.detail-label {
  font-weight: 600;
  color: #333;
  min-width: 150px;
  margin-right: 10px;
}

.detail-value {
  color: #666;
}

.description-section {
  margin-top: 30px;
}

.description-section h3 {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
}

.description-text {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

.no-description {
  color: #999;
  font-style: italic;
  margin: 0;
}

.coming-soon {
  margin-top: 20px;
}

.coming-soon h3 {
  margin: 0 0 10px 0;
  color: #333;
}

.coming-soon p {
  color: #666;
  margin: 0;
}

.file-input {
  display: none;
}

/* Адаптивность */
@media (max-width: 768px) {
  .chef-header {
    flex-direction: column;
    text-align: center;
    gap: 20px;
  }

  .chef-stats {
    justify-content: center;
  }

  .chef-actions {
    width: 100%;
  }

  .chef-actions .el-button {
    width: 100%;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-label {
    margin-bottom: 5px;
  }
}
</style>
