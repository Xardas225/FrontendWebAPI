<script setup>
import { onMounted, ref } from "vue";
import { useChefStore } from "@/store/chef";
import {
  ElAvatar,
  ElButton,
  ElIcon,
  ElRate,
  ElRow,
  ElSkeleton,
} from "element-plus";
import { useRouter } from "vue-router";
import { useNotification } from "@/composables/useNotification";

const chefList = ref([]);
const chefStore = useChefStore();
const router = useRouter();
const isLoading = ref(false);

const loadAllChefs = async () => {
  try {
    isLoading.value = true;
    chefList.value = [];

    const data = await chefStore.loadAllChefs();

    chefList.value = data;
  } catch (error) {
    useNotification("Неудачно", "Ошибка при запросе данных", "error");
    console.error("Ошибка при запросе данных шефов", error.message);
  } finally {
    isLoading.value = false;
  }
};

const checkChefDetails = (data) => {
  router.push({
    name: "chef-detail",
    params: { id: data.userId },
  });
};

onMounted(async () => {
  await loadAllChefs();
});
</script>

<template>
  <div class="cards-container">
    <template v-if="isLoading">
      <ElSkeleton rows="5" animated />
    </template>

    <template v-else>
      <ElCard v-for="item in chefList" :key="item.id" class="dis-card">
        <template #header>
          <div class="card-header">
            <span class="card-name">{{ item.name }} {{ item.lastName }}</span>
            <ElAvatar :size="100" :src="item.avatarUrl">
              {{ item.name }}
            </ElAvatar>
          </div>
        </template>

        <div class="card-content">
          <div class="card-description">
            <ElRow> Kichen`s Name: {{ item.kitchenName }} </ElRow>
            <ElRow>Kichen`s Description: {{ item.description }}</ElRow>
            <ElRow
              >Rating:
              <ElRate
                v-model="item.rating"
                disabled
                show-score
                text-color="#ff9900"
            /></ElRow>
            <ElRow>Amount orders: {{ item.totalOrders }}</ElRow>
          </div>
        </div>

        <template #footer>
          <div class="card-footer">
            <ElButton>
              <ElIcon>
                <Star />
              </ElIcon>
            </ElButton>
            <ElButton @click="checkChefDetails(item)"> Подробнее </ElButton>
          </div>
        </template>
      </ElCard>
    </template>
  </div>
</template>

<style scoped>
@import "@/assets/styles/components/cards.css";
</style>
