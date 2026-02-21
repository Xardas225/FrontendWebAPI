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
  ElRow,
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
const filters = reactive({});
const kitchens = ref([]);
const ingredients = ref([]);
const categories = ref([]);

const sortItems = ref([
  {
    id: 0,
    name: "По возрастанию цены",
    value: "asc",
  },
  {
    id: 1,
    name: "По убыванию цены",
    value: "desc",
  },
]);
const sort = ref();

const load = async () => {
  try {
    isLoading.value = true;
    dishes.value = [];
    const data = await dishApi.getAllDishes(null, null);
    dishes.value = data;

    const kitchensData = await dishApi.getAllKitchens();
    kitchens.value = kitchensData?.data;

    const ingredientData = await dishApi.getAllIngredients();
    ingredients.value = ingredientData?.data;

    const categoriesData = await dishApi.getAllCategories();
    categories.value = categoriesData?.data;
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

const applyFilters = async () => {
  try {
    isLoading.value = true;
    const data = await dishApi.getAllDishes(filters, sort.value ?? null);
    dishes.value = data;
  } catch (error) {
    useNotification("Неудачно", "Данные по блюдам не загрузились", "error");
  } finally {
    isLoading.value = false;
  }
};

const resetFilters = async () => {
  try {
    for (const key in filters) {
      delete filters[key];
    }

    isLoading.value = true;
    const data = await dishApi.getAllDishes(null, sort.value);
    dishes.value = data;
  } catch (error) {
    useNotification("Неудачно", "Данные по блюдам не загрузились", "error");
  } finally {
    isLoading.value = false;
  }
};

const applySort = async () => {
  try {
    isLoading.value = true;
    const data = await dishApi.getAllDishes(filters, sort.value);
    dishes.value = data;
  } catch (error) {
    useNotification("Неудачно", "Данные по блюдам не загрузились", "error");
  } finally {
    isLoading.value = false;
  }
};

const routeToDishDetails = (id) => {
  router.push({
    name: "dishes-detail",
    params: {
      id,
    },
  });
};

onMounted(async () => {
  await load();
});
</script>

<template>
  <div class="button-container">
    <ElButton v-if="isChef" @click="routeToCreateDish">
      <ElIcon>
        <Plus />
      </ElIcon>
      Добавить блюдо
    </ElButton>

    <ElSelect
      @change="applySort"
      v-model="sort"
      placeholder="Сортировка"
      size="small"
      class="sort-select"
    >
      <ElOption
        v-for="item in sortItems"
        :key="item.id"
        :value="item.value"
        :label="item.name"
      />
    </ElSelect>
  </div>

  <div class="container">
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
          label="Категория"
          prop="category"
          class="form-item"
        >
          <ElSelect
            v-model="filters.category"
            placeholder="Выберите категорию"
            filterable
            clearable
            size="large"
            class="full-width"
          >
            <ElOption
              v-for="category in categories"
              :key="category.value"
              :label="category.name"
              :value="category.value"
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
            v-model="filters.MinPrice"
            :min="0"
            :max="1000000"
            :step="100"
            controls-position="right"
            placeholder="От"
            size="large"
            class="full-width"
          />
          <ElInputNumber
            v-model="filters.MaxPrice"
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

      <ElButton @click="applyFilters" type="primary"> Применить </ElButton>
      <ElButton @click="resetFilters" plain> Очистить </ElButton>
    </ElAside>

    <template v-if="isLoading">
      <ElSkeleton rows="10" animated />
    </template>
    <template v-else>
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
              
              <ElButton class="add-to-cart" v-if="!isChef">
                <ElIcon>
                  <Plus />
                </ElIcon>
              </ElButton>
            </div>

            <ElRow>
              <ElButton @click="routeToDishDetails(item.id)">
                Подробнее
              </ElButton>
            </ElRow>
          </template>
        </ElCard>
      </div>
    </template>
  </div>
</template>

<style scoped>
@import "@/assets/styles/components/cards.css";

.button-container {
  display: flex;
  justify-content: space-between;
  max-width: 1600px;
}

.sort-select {
  width: 200px;
}
</style>
