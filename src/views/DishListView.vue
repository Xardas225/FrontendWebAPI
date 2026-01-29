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
  <div class="dishes-container">
    <ElCard v-for="item in mockData" :key="item.id" class="dis-card">
      <template #header>
        <div class="card-header">
          <span class="dish-name">{{ item.name }}</span>
        </div>
      </template>

      <div class="dish-content">
        <div class="dish-description">
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
        <div class="dish-footer">
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
.dishes-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 колонки */
  gap: 24px; /* Расстояние между карточками */
  padding: 24px;
  max-width: 1400px;
  margin: 0 auto;
}

.dish-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%; /* Все карточки одинаковой высоты */
}

.dish-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.dish-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.dish-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.dish-card:hover .dish-image img {
  transform: scale(1.05);
}

.dish-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.dish-name {
  margin: 0 0 10px 0;
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.dish-description {
  margin: 0 0 20px 0;
  color: #666;
  font-size: 14px;
  line-height: 1.5;
  flex-grow: 1; /* Описание занимает доступное пространство */
}

.dish-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto; /* Прижимаем к низу */
}

.dish-price {
  font-size: 20px;
  font-weight: 700;
  color: #ff6b35;
}

.add-to-cart {
  background: #ff6b35;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart:hover {
  background: #ff5722;
  transform: scale(1.1);
}

/* Адаптивность */
@media (max-width: 1024px) {
  .dishes-container {
    grid-template-columns: repeat(2, 1fr); /* 2 колонки на планшетах */
    gap: 20px;
    padding: 20px;
  }
}

@media (max-width: 768px) {
  .dishes-container {
    grid-template-columns: 1fr; /* 1 колонка на мобильных */
    gap: 16px;
    padding: 16px;
  }

  .dish-image {
    height: 180px;
  }
}
</style>
