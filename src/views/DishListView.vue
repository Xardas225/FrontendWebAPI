<script setup>
import {
  ElButton,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElIcon,
  ElTag,
} from "element-plus";
import { onMounted, ref } from "vue";
import { useNotification } from "@/composables/useNotification";
import { useDishStore } from "@/store/dish";

const dishes = ref([]);
const dishApi = useDishStore();

const load = async () => {
  try {
    dishes.value = [];
    const data = await dishApi.getAllDishes();

    dishes.value = data;
  } catch (error) {
    useNotification("Неудачно", "Данные по блюдам не загрузились", "error");
  }
};

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="cards-container">
    <ElCard v-for="item in dishes" :key="item.id" class="dis-card">
      <template #header>
        <div class="card-header">
          <span class="card-name">{{ item.name }}</span>
        </div>
      </template>

      <div class="card-content">
        <div class="card-description">
          {{ item.description }}
        </div>

        <ElDescriptions>
          <ElDescriptionsItem label="Kitchen">
            <ElTag>{{ item.kitchen }}</ElTag>
          </ElDescriptionsItem>
          <ElDescriptionsItem label="Category">
            <ElTag>{{ item.category }}</ElTag>
          </ElDescriptionsItem>
        </ElDescriptions>
      </div>

      <template #footer>
        <div class="card-footer">
          <ElDescriptions>
            <ElDescriptionsItem label="Price">
              <ElTag>{{ item.price }} {{ item.currency }}</ElTag>
            </ElDescriptionsItem>
          </ElDescriptions>

          <ElButton class="add-to-cart">
            <ElIcon>
              <Plus />
            </ElIcon>
          </ElButton>
        </div>
      </template>
    </ElCard>
  </div>
</template>

<style scoped>
@import "@/assets/styles/components/cards.css";
</style>
