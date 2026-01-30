<script setup>
import {
  ElButton,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElIcon,
  ElTag,
} from "element-plus";

const mockData = [
  {
    id: 0,
    name: "Dish name",
    description: "Description dish",
    category: "Soup",
    kitchen: "Russian",
    price: 1000,
    currency: "RUB",
  },
  {
    id: 1,
    name: "Dish name",
    description: "Description dish",
    category: "Soup",
    kitchen: "Russian",
    price: 1000,
    currency: "RUB",
  },
  {
    id: 2,
    name: "Dish name",
    description: "Description dish",
    category: "Soup",
    kitchen: "Russian",
    price: 1000,
    currency: "RUB",
  },
  {
    id: 3,
    name: "Dish name",
    description: "Description dish",
    category: "Soup",
    kitchen: "Russian",
    price: 1000,
    currency: "RUB",
  },
];
</script>

<template>
  <div class="cards-container">
    <ElCard v-for="item in mockData" :key="item.id" class="dis-card">
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
