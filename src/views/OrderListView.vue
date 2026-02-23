<script setup>
import {
  ElButton,
  ElCard,
  ElCol,
  ElDatePicker,
  ElOption,
  ElPagination,
  ElRow,
  ElSelect,
  ElTable,
  ElTableColumn,
  ElTag,
} from "element-plus";
import { computed, onMounted, ref } from "vue";
import { useOrderStore } from "@/store/order";
import { useNotification } from "@/composables/useNotification";

const orderApi = useOrderStore();

const orders = computed(() => orderApi.orders);

const routeToOrder = (id) => {
  console.log("Просмотр заказа", id);
};

const load = async () => {
  try {
    await orderApi.getAllOrders();
  } catch (error) {
    useNotification("Неудачно", "Заказы не загрузились", "error");
  }
};

const formatDate = (isoString) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
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

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="orders-page">
    <h1 class="orders-title">Мои заказы</h1>

    <ElCard class="filters-card" shadow="never">
      <ElRow :gutter="16" align="middle">
        <ElCol :xs="24" :sm="8">
          <ElSelect placeholder="Статус заказа" clearable class="full-width">
            <ElOption label="Все" value="" />
            <ElOption label="В работе" value="inwork" />
            <ElOption label="Выполнен" value="completed" />
            <ElOption label="Отменён" value="rejected" />
          </ElSelect>
        </ElCol>
        <ElCol :xs="24" :sm="8">
          <ElDatePicker
            type="daterange"
            range-separator="—"
            start-placeholder="Дата с"
            end-placeholder="Дата по"
            class="full-width"
          />
        </ElCol>
        <ElCol :xs="24" :sm="8" class="filter-actions">
          <ElButton type="primary" plain>Применить</ElButton>
          <ElButton plain>Сбросить</ElButton>
        </ElCol>
      </ElRow>
    </ElCard>

    <ElCard class="orders-list-card" shadow="never">
      <ElTable :data="orders" style="width: 100%" stripe>
        <ElTableColumn prop="id" label="№ заказа" width="100" />
        <ElTableColumn label="Дата" width="180">
          <template #default="{ row }">
            {{ formatDate(row.createdAt) }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="amount" label="Товары" width="100" />
        <ElTableColumn prop="totalSum" label="Сумма" width="120" />
        <ElTableColumn label="Статус" width="120">
          <template #default="{ row }">
            <ElTag :type="row.status">{{
              getOrderStatusText(row.status)
            }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="Действия" width="120">
          <template #default="{ row }">
            <ElButton size="small" @click="routeToOrder(row.id)"
              >Просмотр</ElButton
            >
          </template>
        </ElTableColumn>
      </ElTable>

      <div class="pagination-wrapper">
        <ElPagination
          background
          layout="prev, pager, next"
          :total="30"
          :page-size="10"
        />
      </div>
    </ElCard>
  </div>
</template>

<style scoped>
.orders-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.orders-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.filters-card,
.orders-list-card {
  margin-bottom: 24px;
  border-radius: 16px;
  border: 1px solid #f0f2f5;
  background-color: #ffffff;
}

.full-width {
  width: 100%;
}

.filter-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
}

.pagination-wrapper {
  margin-top: 24px;
  display: flex;
  justify-content: center;
}

/* Адаптивность */
@media (max-width: 768px) {
  .orders-title {
    font-size: 24px;
  }

  .filter-actions {
    justify-content: flex-start;
    margin-top: 8px;
  }

  .el-table {
    font-size: 14px;
  }

  .el-table .el-button--small {
    padding: 5px 10px;
    font-size: 12px;
  }
}
</style>
