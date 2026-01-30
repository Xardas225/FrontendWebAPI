<script setup>
import {
  ElAvatar,
  ElBreadcrumb,
  ElBreadcrumbItem,
  ElButton,
  ElCol,
  ElRate,
  ElRow,
  ElCard
} from "element-plus";
import { ref } from "vue";

const chef = ref({
  userId: 18,
  email: "ChefSuper2000@yandex.ru",
  phone: null,
  name: "ChefSuper2000",
  lastName: "ChefSuper2000",
  chefId: 1,
  kitchenName: "ChefSuper2000 K",
  description: "Home Kitchen",
  isActive: false,
  rating: 4.5,
  totalOrders: 0,
  startTime: null,
  endTime: null,
  chefExperience: 0,
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
          <ElAvatar :size="100">
            {{ chef.name }}
          </ElAvatar>
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
          <ElButton
            v-if="!chef.isActive"
            type="primary"
            @click="activateChef"
            :loading="activating"
          >
            Активировать кухню
          </ElButton>

          <ElButton
            v-else
            type="warning"
            @click="deactivateChef"
            :loading="deactivating"
          >
            Деактивировать кухню
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
