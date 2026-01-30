<script setup>
import { onMounted, ref } from "vue";
import { useChefStore } from "@/store/chef";
import { ElButton, ElIcon, ElRate, ElRow } from "element-plus";
import { useRouter } from "vue-router";

const chefList = ref([]);
const chefStore = useChefStore();
const router = useRouter();

const loadAllChefs = async () => {
  try {
    chefList.value = [];

    const data = await chefStore.loadAllChefs();

    chefList.value = data;
  } catch (error) {}
};

const checkChefDetails = (data) => {
  console.log(data);

  router.push({
    name: "chef-detail",
    params: { id: data.chefId },
  });
};

onMounted(async () => {
  await loadAllChefs();
});
</script>

<template>
  <div class="cards-container">
    <ElCard v-for="item in chefList" :key="item.id" class="dis-card">
      <template #header>
        <div class="card-header">
          <span class="card-name">{{ item.name }} {{ item.lastName }}</span>
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
  </div>
</template>

<style scoped>
@import "@/assets/styles/components/cards.css";
</style>
