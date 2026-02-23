<script setup>
import { computed, onMounted, ref } from "vue";
import { useOrderStore } from "@/store/order";
import { useNotification } from "@/composables/useNotification";
import { useRoute, useRouter } from "vue-router";
import {
  ElButton,
  ElCard,
  ElCol,
  ElDescriptions,
  ElDescriptionsItem,
  ElRow,
  ElTable,
  ElTableColumn,
  ElTag,
} from "element-plus";

const orderApi = useOrderStore();
const route = useRoute();
const router = useRouter();
const orderId = computed(() => route.params?.id);

const order = computed(() => orderApi.currentOrder);

const load = async () => {
  try {
    await orderApi.getOrderByOrderId(orderId.value);
  } catch (error) {
    useNotification("Неудачно", "Не загрузились данные по заказу", "error");
  }
};

const formatDate = (isoString) => {
  if (!isoString) {
    return "";
  }

  const date = new Date(isoString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

const formatPrice = (value) => {
  if (value === undefined || value === null) return "—";
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 2,
  }).format(value);
};

const routeToDish = (id) => {
  router.push({
    name: "dishes-detail",
    params: {
      id,
    },
  });
};

const getOrderStatusText = (status) => {
  const statusMap = {
    0: "Неизвестно",
    1: "В работе",
    2: "Выполнен",
    3: "Отменён",
  };
  return statusMap[status] ?? "Неизвестный статус";
};

const getPaymentStatusText = (status) => {
  const statusMap = {
    0: "Ожидает оплаты",
    1: "Оплачен",
    2: "Ошибка оплаты",
  };
  return statusMap[status] ?? "Неизвестный статус";
};

const getPaymentMethodText = (method) => {
  const methodMap = {
    0: "Оплата по карте",
    1: "Оплата наличными",
  };
  return methodMap[method] ?? "Неизвестный статус";
};

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="order-detail">
    <!-- Основная карточка заказа -->
    <ElCard class="order-card" shadow="hover">
      <template #header>
        <div class="card-header">
          <span>Заказ #{{ order.id }}</span>
          <div class="status-tags">
            <ElTag effect="dark">
              {{ getOrderStatusText(order.status) }}
            </ElTag>
            <ElTag effect="plain">
              {{ getPaymentStatusText(order.paymentStatus) }}
            </ElTag>
          </div>
        </div>
      </template>

      <!-- Информация о заказе (клиент, доставка, оплата) -->
      <ElDescriptions :column="2" border class="info-section">
        <ElDescriptionsItem label="Дата создания">
          {{ formatDate(order.createdAt) }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Способ оплаты">
          {{ getPaymentMethodText(order.paymentMethod) }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Контактный телефон">
          {{ order.contactPhone }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Email">
          {{ order.email }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Адрес доставки" :span="2">
          {{ order.deliveryAddress }}
        </ElDescriptionsItem>
        <ElDescriptionsItem label="Комментарий" :span="2">
          {{ order.comment || "—" }}
        </ElDescriptionsItem>
      </ElDescriptions>

      <!-- Список позиций заказа -->
      <div class="items-section">
        <h3>Состав заказа</h3>
        <ElTable :data="order.items" stripe border style="width: 100%">
          <ElTableColumn prop="dishName" label="Блюдо" min-width="180" />
          <ElTableColumn
            prop="dishDescription"
            label="Описание"
            min-width="200"
            show-overflow-tooltip
          />
          <ElTableColumn
            prop="amount"
            label="Кол-во"
            width="80"
            align="center"
          />
          <ElTableColumn
            prop="unitPrice"
            label="Цена за ед."
            width="120"
            align="right"
          >
            <template #default="{ row }">
              {{ formatPrice(row.unitPrice) }}
            </template>
          </ElTableColumn>
          <ElTableColumn
            prop="totalPrice"
            label="Сумма"
            width="120"
            align="right"
          >
            <template #default="{ row }">
              {{ formatPrice(row.totalPrice) }}
            </template>
          </ElTableColumn>

          <ElTableColumn label="Действия" width="120">
            <template #default="{ row }">
              <ElButton size="small" @click="routeToDish(row.dishId)"
                >Просмотр</ElButton
              >
            </template>
          </ElTableColumn>
        </ElTable>
      </div>

      <!-- Итоговая информация -->
      <div class="total-section">
        <ElRow :gutter="20" justify="end">
          <ElCol :span="6" :xs="12">
            <div class="total-item">
              <span class="label">Всего позиций:</span>
              <span class="value">{{ order.amount }}</span>
            </div>
          </ElCol>
          <ElCol :span="6" :xs="12">
            <div class="total-item">
              <span class="label">Общая сумма:</span>
              <span class="value highlight">{{
                formatPrice(order.totalSum)
              }}</span>
            </div>
          </ElCol>
        </ElRow>
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
.order-detail {
  max-width: 1200px;
  margin: 20px auto;
  padding: 0 15px;
}

.order-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.status-tags {
  display: flex;
  gap: 8px;
}

.info-section {
  margin-bottom: 30px;
}

.items-section {
  margin-top: 20px;
  margin-bottom: 20px;
}

.items-section h3 {
  margin-bottom: 15px;
  font-size: 1.2rem;
  color: #303133;
}

.total-section {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #ebeef5;
}

.total-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.total-item .label {
  font-size: 14px;
  color: #909399;
}

.total-item .value {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
}

.total-item .value.highlight {
  color: #f56c6c;
  font-size: 18px;
}

/* Адаптивность для маленьких экранов */
@media (max-width: 768px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .status-tags {
    margin-top: 8px;
  }

  .total-item {
    margin-bottom: 10px;
  }
}
</style>
