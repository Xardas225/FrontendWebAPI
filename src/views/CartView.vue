<script setup>
import { Delete } from "@element-plus/icons-vue";
import {
  ElButton,
  ElCard,
  ElCol,
  ElImage,
  ElInputNumber,
  ElRow,
} from "element-plus";
import { onMounted, computed } from "vue";
import { useNotification } from "@/composables/useNotification";
import { useCartStore } from "@/store/cart";
import { useRouter } from "vue-router";

const cartApi = useCartStore();
const router = useRouter();
const cartItems = computed(() => cartApi.items);
const cartItemsAmount = computed(() => cartApi.amount);
const cartSum = computed(() => cartApi.sum);

const load = async () => {
  try {
    await cartApi.getItemsFromCart();

  } catch (error) {
    useNotification("Неудачно", "Данные по корзине не загрузились", "error");
  }
};

const removeItem = async (itemId) => {
  try {
    await cartApi.deleteItemFromCart(itemId);
    await load();
  } catch (error) {
    useNotification(
      "Неудачно",
      "Не вышло удалить. Попробуйте ещё раз",
      "error",
    );
  }
};

const routeToOrderCheckout = () => {
  router.push({
    name: "order-checkout",
  });
};

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="cart-page">
    <h1 class="cart-title">Корзина</h1>

    <ElRow v-if="cartItemsAmount" :gutter="20">
      <ElCol :xs="24" :lg="16">
        <ElCard shadow="never" class="cart-items-card">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <ElRow :gutter="16" align="middle">
              <ElCol :span="4" class="item-image-col">
                <ElImage
                  src="https://via.placeholder.com/100x100"
                  fit="cover"
                  class="item-image"
                />
              </ElCol>

              <ElCol :span="8" class="item-info">
                <div class="item-name">{{ item.dishName }}</div>
                <div class="item-desc">{{ item.dishDescription }}</div>
                <div class="item-price">{{ item.dishPrice }}</div>
              </ElCol>

              <ElCol :span="6" class="item-quantity-col">
                <ElInputNumber
                  v-model="item.dishAmount"
                  :min="1"
                  size="small"
                  controls-position="right"
                />
              </ElCol>

              <ElCol :span="4" class="item-total-col">
                <span class="item-total">{{ item.dishPrice }}</span>
              </ElCol>

              <ElCol :span="2" class="item-remove-col">
                <ElButton
                  @click="removeItem(item.id)"
                  :icon="Delete"
                  text
                  size="small"
                  class="remove-btn"
                />
              </ElCol>
            </ElRow>
          </div>
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="8">
        <ElCard shadow="never" class="summary-card">
          <template #header>
            <span class="summary-title">Ваша корзина</span>
          </template>

          <div class="summary-row">
            <span>Товары ({{ cartItemsAmount }})</span>
            <span>{{ cartSum }}</span>
          </div>
          <div class="summary-row">
            <span>Доставка</span>
            <span>Бесплатно</span>
          </div>
          <el-divider />

          <div class="summary-total">
            <span>Итого</span>
            <span class="total-price">{{ cartSum }}</span>
          </div>

          <ElButton
            @click="routeToOrderCheckout"
            type="primary"
            size="large"
            class="checkout-btn"
            block
          >
            Перейти к оформлению
          </ElButton>
        </ElCard>
      </ElCol>
    </ElRow>

    <div v-else>Корзина пуста</div>
  </div>
</template>

<style scoped>
.cart-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}

.cart-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1a1a1a;
}

/* Карточка с товарами */
.cart-items-card {
  border-radius: 16px;
  overflow: hidden;
}

.cart-item {
  padding: 20px 0;
  border-bottom: 1px solid #f0f2f5;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 100px;
  height: 100px;
  border-radius: 12px;
  object-fit: cover;
}

.item-info {
  padding-left: 8px;
}

.item-name {
  font-weight: 600;
  font-size: 18px;
  color: #1a1a1a;
  margin-bottom: 4px;
}

.item-desc {
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 8px;
}

.item-price {
  font-weight: 500;
  color: #1a1a1a;
}

.item-quantity-col {
  text-align: center;
}

:deep(.el-input-number) {
  width: 120px;
}

.item-total-col {
  text-align: right;
}

.item-total {
  font-weight: 600;
  font-size: 18px;
  color: #1a1a1a;
}

.item-remove-col {
  text-align: right;
}

.remove-btn {
  color: #adb5bd;
  font-size: 18px;
}

.remove-btn:hover {
  color: #dc3545;
}

/* Боковая карточка итогов */
.summary-card {
  border-radius: 16px;
  position: sticky;
  top: 24px;
}

.summary-title {
  font-weight: 600;
  font-size: 18px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 16px;
  color: #555;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 20px;
  margin: 20px 0 24px;
  color: #1a1a1a;
}

.total-price {
  color: #005bff;
}

.checkout-btn {
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 12px;
  background: #005bff;
  border: none;
}

.checkout-btn:hover {
  background: #0047cc;
}

/* Адаптивность */
@media (max-width: 768px) {
  .cart-title {
    font-size: 24px;
  }

  .item-image {
    width: 80px;
    height: 80px;
  }

  .item-name {
    font-size: 16px;
  }

  .item-price {
    font-size: 14px;
  }

  .item-total {
    font-size: 16px;
  }

  .item-quantity-col {
    text-align: left;
    margin-top: 12px;
  }

  .item-total-col {
    text-align: left;
    margin-top: 12px;
  }

  .item-remove-col {
    text-align: left;
    margin-top: 12px;
  }

  .summary-card {
    margin-top: 24px;
    position: static;
  }
}
</style>
