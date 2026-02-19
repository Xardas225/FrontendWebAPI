<script setup>
import {
  ElAside,
  ElButton,
  ElCard,
  ElDescriptions,
  ElDescriptionsItem,
  ElForm,
  ElFormItem,
  ElIcon,
  ElInput,
  ElInputNumber,
  ElOption,
  ElSelect,
  ElSkeleton,
  ElTag,
  ElText,
} from "element-plus";
import { onMounted, reactive, ref } from "vue";
import { useNotification } from "@/composables/useNotification";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/auth";
import { useDishStore } from "@/store/dish";

const dishes = ref([]);
const dishApi = useDishStore();
const authApi = useAuthStore();
const router = useRouter();
const isChef = authApi.isChef;
const isLoading = ref(false);
const filters = reactive({
  price: {
    from: null,
    to: null,
  },
});
const kitchens = ref([]);
const ingredients = ref([]);

const load = async () => {
  try {
    isLoading.value = true;
    dishes.value = [];
    const data = await dishApi.getAllDishes();
    dishes.value = data;

    const kitchensData = await dishApi.getAllKitchens();
    kitchens.value = kitchensData?.data;

    const ingredientData = await dishApi.getAllIngredients();
    ingredients.value = ingredientData?.data;
  } catch (error) {
    useNotification("Неудачно", "Данные по блюдам не загрузились", "error");
  } finally {
    isLoading.value = false;
  }
};

const routeToCreateDish = () => {
  router.push({
    name: "dishes-create",
  });
};

const applyFilters = () => {
  // TODO: logic filters
};

onMounted(async () => {
  await load();
});
</script>

<template>
  <template v-if="isLoading">
    <ElSkeleton rows="1" animated />
  </template>

  <template v-else>
    <ElButton v-if="isChef" @click="routeToCreateDish">
      <ElIcon>
        <Plus />
      </ElIcon>
      Добавить блюдо
    </ElButton>
  </template>

  <div class="container">
    <template v-if="isLoading">
      <ElSkeleton rows="10" animated />
    </template>

    <template v-else>
      <ElAside class="filters-container">
        <ElForm>
          <ElText size="large" class="filter-header"> Фильтры </ElText>

          <ElFormItem label-position="top" label="Название блюда">
            <ElInput v-model="filters.name" clearable :clear-icon="CloseBold" />
          </ElFormItem>

          <ElFormItem
            label-position="top"
            label="Кухня"
            prop="kitchen"
            class="form-item"
          >
            <ElSelect
              v-model="filters.kitchen"
              placeholder="Выберите кухню"
              filterable
              clearable
              size="large"
              class="full-width"
            >
              <ElOption
                v-for="kitchen in kitchens"
                :key="kitchen.value"
                :label="kitchen.name"
                :value="kitchen.value"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem
            label-position="top"
            label="Ингредиенты"
            prop="ingredients"
            class="form-item"
          >
            <ElSelect
              v-model="filters.ingredients"
              placeholder="Выберите ингредиент"
              filterable
              clearable
              size="large"
              class="full-width"
            >
              <ElOption
                v-for="item in ingredients"
                :key="item.value"
                :label="item.name"
                :value="item"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem
            label-position="top"
            label="Цена"
            prop="price"
            class="filter-item filter-price"
          >
            <ElInputNumber
              v-model="filters.price.from"
              :min="0"
              :max="1000000"
              :step="100"
              controls-position="right"
              placeholder="От"
              size="large"
              class="full-width"
            />
            <ElInputNumber
              v-model="filters.price.to"
              :min="0"
              :max="1000000"
              :step="100"
              controls-position="right"
              placeholder="До"
              size="large"
              class="full-width"
            />
          </ElFormItem>
        </ElForm>

        <ElButton @click="applyFilters"> Применить </ElButton>
      </ElAside>

      <div class="cards-container">
        <ElCard v-for="item in dishes" :key="item.id">
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
  </div>
</template>

<style scoped>
@import "@/assets/styles/components/cards.css";
</style>
