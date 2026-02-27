<script setup>
import { ElCard, ElDescriptions, ElDescriptionsItem } from "element-plus";
import { onMounted, ref, watch, computed } from "vue";
import { useDishStore } from "@/store/dish";
import { useRoute } from "vue-router";

const route = useRoute();
const dish = ref({});
const dishApi = useDishStore();
const dishId = computed(() => route?.params?.id);

const load = async () => {
  try {
    const { data } = await dishApi.getDishById(dishId.value);

    dish.value = data;
  } catch (error) {}
};

watch(
  () => dishId.value,
  async () => await load(),
);

onMounted(async () => {
  await load();
});
</script>

<template>
  <ElCard class="dish-card" shadow="hover">
    <template #header>
      <div class="card-header">
        <span class="dish-name">{{ dish.name }}</span>
        <el-tag size="small" type="info">ID: {{ dish.id }}</el-tag>
      </div>
    </template>

    <ElDescriptions :column="2">
      <ElDescriptionsItem label="Описание">
        {{ dish.description }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Категория">
        <el-tag size="small">{{ dish.category }}</el-tag>
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Цена">
        {{ dish.price }} {{ dish.currency }}
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Кухня">
        <el-tag size="small">{{ dish.kitchen }}</el-tag>
      </ElDescriptionsItem>
      <ElDescriptionsItem label="Автор">
        {{ dish.authorName }} (ID: {{ dish.authorId }})
      </ElDescriptionsItem>
    </ElDescriptions>
  </ElCard>
</template>

<style scoped>
.dish-card {
  max-width: 600px;
  margin: 20px auto;
  border-radius: 16px;
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  border: none;
  overflow: hidden;
}

.dish-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(64, 158, 255, 0.05);
  border-bottom: 1px solid #eaeef2;
}

.dish-name {
  font-weight: 700;
  font-size: 1.4rem;
  color: #2c3e50;
  letter-spacing: -0.3px;
  background: linear-gradient(135deg, #2c3e50, #1e2a36);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.el-tag {
  border-radius: 20px;
  font-weight: 500;
  padding: 0 12px;
  height: 28px;
  line-height: 26px;
  border: 1px solid transparent;
  transition: all 0.2s;
}

.el-tag:hover {
  transform: scale(1.05);
}

.el-tag--info {
  background: #ecf5ff;
  color: #409eff;
}

.el-descriptions {
  padding: 16px 20px 20px;
}

.el-descriptions :deep(.el-descriptions__label) {
  font-weight: 600;
  color: #5a6a7a;
  background: #f5f7fa;
  width: 100px;
  text-align: right;
  border-radius: 8px 0 0 8px;
}

.el-descriptions :deep(.el-descriptions__content) {
  color: #2c3e50;
  background: white;
  border-radius: 0 8px 8px 0;
  font-weight: 500;
}

.el-descriptions-item {
  transition: background 0.2s;
}

.el-descriptions-item:hover :deep(.el-descriptions__label),
.el-descriptions-item:hover :deep(.el-descriptions__content) {
  background: #eef3f8;
}

/* Цена выделяем */
.el-descriptions-item .price-value {
  font-size: 1.2rem;
  font-weight: 700;
  color: #f56c6c;
  display: inline-block;
  margin-right: 4px;
}

/* Для мобильных */
@media (max-width: 480px) {
  .dish-card {
    margin: 10px;
  }
  .card-header {
    flex-direction: column;
    align-items: start;
    gap: 8px;
  }
  .el-descriptions :deep(.el-descriptions__label) {
    width: 80px;
  }
}
</style>
