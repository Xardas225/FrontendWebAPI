<script setup>
import {
  ElButton,
  ElCard,
  ElCol,
  ElForm,
  ElFormItem,
  ElInput,
  ElRadio,
  ElRadioGroup,
  ElRow,
} from "element-plus";
import { CloseBold } from "@element-plus/icons-vue";
import { useAuthStore } from "@/store/auth";
import { useCartStore } from "@/store/cart";
import { useOrderStore } from "@/store/order";
import { computed, reactive } from "vue";
import { useNotification } from "@/composables/useNotification";
import { useRouter } from "vue-router";

const cartApi = useCartStore();
const authApi = useAuthStore();
const orderApi = useOrderStore();

const router = useRouter();

const cartItems = computed(() => cartApi.items);
const cartItemsAmount = computed(() => cartApi.amount);
const cartSum = computed(() => cartApi.sum);

const user = computed(() => authApi.user);

const form = reactive({
  email: user.value.email,
  phone: user.value.phone,
  deliveryAddress: "",
  paymentMethod: "",
  comment: "",
  items: cartItems.value.map((item) => {
    return {
      dishId: item.dishId,
      amount: item.dishAmount,
      price: item.dishPrice,
    };
  }),
});

const createOrder = async () => {
  try {
    await orderApi.createOrder({ ...form });
    await cartApi.getItemsFromCart();
    router.push({
      name: "home",
    });
     useNotification("Успех", "Заказ успешно создан", "success");
  } catch (error) {
    useNotification("Неудачно", "Не создали заказ.", "error");
  }
};
</script>

<template>
  <div class="checkout-page">
    <h1 class="checkout-title">Оформление заказа</h1>

    <ElRow :gutter="24">
      <ElCol :xs="24" :lg="16">
        <ElCard class="checkout-card" shadow="never">
          <template #header>
            <span class="card-header">Контактная информация</span>
          </template>
          <ElForm label-position="top" class="checkout-form">
            <ElRow :gutter="16">
              <ElCol :span="12">
                <ElFormItem label="Телефон">
                  <ElInput
                    v-model="form.phone"
                    clearable
                    :clear-icon="CloseBold"
                  />
                </ElFormItem>
              </ElCol>
              <ElCol :span="12">
                <ElFormItem label="Email">
                  <ElInput
                    v-model="form.email"
                    clearable
                    :clear-icon="CloseBold"
                  />
                </ElFormItem>
              </ElCol>
            </ElRow>
          </ElForm>
        </ElCard>

        <ElCard class="checkout-card" shadow="never">
          <template #header>
            <span class="card-header">Способ доставки</span>
          </template>
          <ElForm label-position="top" class="checkout-form">
            <ElFormItem label="Адрес доставки">
              <ElInput
                v-model="form.deliveryAddress"
                placeholder="Город, улица, дом, квартира"
              />
            </ElFormItem>
            <!-- TODO: Добавить в модель -->
            <ElRadioGroup class="delivery-options">
              <ElRadio value="courier">Курьером</ElRadio>
              <ElRadio value="pickup">Самовывоз</ElRadio>
            </ElRadioGroup>
          </ElForm>
        </ElCard>

        <!-- TODO: Расширить базовую модель -->
        <ElCard class="checkout-card" shadow="never">
          <template #header>
            <span class="card-header">Способ оплаты</span>
          </template>
          <ElRadioGroup v-model="form.paymentMethod" class="payment-options">
            <ElRadio :value="0">Онлайн картой (Visa, Mastercard, МИР)</ElRadio>
            <ElRadio :value="1">Наличными курьеру</ElRadio>
          </ElRadioGroup>
        </ElCard>

        <ElCard class="checkout-card" shadow="never">
          <template #header>
            <span class="card-header">Комментарий к заказу</span>
          </template>
          <ElInput
            v-model="form.comment"
            type="textarea"
            :rows="3"
            placeholder="Пожелания по доставке или приготовлению"
          />
        </ElCard>
      </ElCol>

      <ElCol :xs="24" :lg="8">
        <ElCard class="checkout-summary" shadow="never">
          <template #header>
            <span class="card-header">Ваш заказ</span>
          </template>

          <div class="order-items">
            <div
              v-for="(item, index) in cartItems"
              :key="index"
              class="order-item"
            >
              <div class="item-image">
                <img src="https://via.placeholder.com/80x80" alt="блюдо" />
              </div>
              <div class="item-details">
                <div class="item-name">{{ item.dishName }}</div>
                <div class="item-meta">
                  <span class="item-quantity">{{ item.dishAmount }}</span>
                  <span class="item-price">{{ item.dishPrice }}</span>
                </div>
              </div>
            </div>
          </div>

          <el-divider />

          <div class="summary-row">
            <span>Товары ({{ cartItemsAmount }})</span>
            <span>{{ cartSum }}</span>
          </div>
          <div class="summary-row">
            <span>Доставка</span>
            <span>Бесплатно</span>
          </div>
          <div class="summary-total">
            <span>Итого</span>
            <span>{{ cartSum }}</span>
          </div>

          <ElButton
            @click="createOrder"
            type="primary"
            size="large"
            class="submit-btn"
          >
            Подтвердить заказ
          </ElButton>
          <p class="agreement">
            Нажимая «Подтвердить заказ», вы соглашаетесь с условиями оферты
          </p>
        </ElCard>
      </ElCol>
    </ElRow>
  </div>
</template>

<style scoped>
.checkout-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-color: #f8f9fa;
  min-height: 100vh;
}

.checkout-title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.checkout-card,
.checkout-summary {
  margin-bottom: 20px;
  border-radius: 16px;
  border: 1px solid #f0f2f5;
  background-color: #ffffff;
}

.card-header {
  font-weight: 600;
  font-size: 18px;
  color: #1a1a1a;
}

.checkout-form {
  padding: 0 4px;
}

.delivery-options,
.payment-options {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 8px;
}

.el-radio {
  margin-right: 0;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 4px;
}

.order-item {
  display: flex;
  gap: 12px;
  align-items: center;
}

.item-image {
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-name {
  font-weight: 500;
  margin-bottom: 4px;
  color: #1a1a1a;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #6c757d;
}

.item-price {
  font-weight: 600;
  color: #f56c6c;
}

.el-divider {
  margin: 20px 0;
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

.submit-btn {
  width: 100%;
  height: 56px;
  font-size: 18px;
  font-weight: 600;
  border-radius: 12px;
  background: #005bff;
  border: none;
  margin-bottom: 12px;
}

.submit-btn:hover {
  background: #0047cc;
}

.agreement {
  font-size: 12px;
  color: #8c8c8c;
  text-align: center;
  margin-top: 8px;
}

@media (max-width: 768px) {
  .checkout-title {
    font-size: 24px;
  }
  .checkout-summary {
    position: static;
    margin-top: 20px;
  }
}
</style>
