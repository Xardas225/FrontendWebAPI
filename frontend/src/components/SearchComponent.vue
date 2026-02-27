<script setup>
import { ElButton, ElCard, ElIcon, ElInput } from "element-plus";
import { useSearchStore } from "@/store/search";
import { onClickOutside, useDebounceFn } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const searchQuery = ref("");
const seacrhApi = useSearchStore();
const searchResult = computed(() => seacrhApi.searchResult);
const searched = ref(false);
const searchContainer = ref();

const debouncedHandleSearch = useDebounceFn(async () => {
  if (!searchQuery.value.trim()) return;

  searched.value = true;
  await seacrhApi.search({ query: searchQuery.value });
}, 300);

const clearSearch = () => {
  searched.value = false;
  searchQuery.value = "";
  seacrhApi.clearSearch();
};

onClickOutside(searchContainer, () => {
  searched.value = false;
});

const routeToDish = (id) => {
  searched.value = false;
  router.push({
    name: "dishes-detail",
    params: {
      id,
    },
  });
};

watch(searchQuery, () => {
  debouncedHandleSearch();
});
</script>

<template>
  <div ref="searchContainer" class="search-container">
    <ElInput
      class="input-search"
      v-model="searchQuery"
      placeholder="Поиск..."
      @focus="searched = true"
    >
      <template #prefix>
        <ElIcon><Search /></ElIcon>
      </template>
      <template #suffix>
        <ElIcon v-if="searchQuery" class="clear-icon" @click="clearSearch">
          <Close />
        </ElIcon>
      </template>
      <template #append>
        <ElButton @click="handleSearch">Найти</ElButton>
      </template>
    </ElInput>

    <div
      v-if="searched && searchResult && searchResult.length > 0"
      class="search-results"
    >
      <ElCard
        v-for="item in searchResult"
        :key="item.id"
        class="result-item"
        shadow="hover"
      >
        <template v-if="item.type == `dish`">
          <div @click="routeToDish(item.dishId)" class="result-content">
            <h4>{{ item.name }}</h4>
            <p>{{ item.description }}</p>
          </div>
        </template>
      </ElCard>
    </div>
    <div v-else-if="searched && searchResult.length === 0" class="no-results">
      Ничего не найдено
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  z-index: 9999999;
}

.search-results {
  margin-top: 12px;
  max-height: 400px;
  overflow-y: auto;
  border-radius: 8px;
  background: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  z-index: 9999999;
}

.result-item {
  margin-bottom: 8px;
  border: none;
  border-radius: 8px;
}

.result-item:last-child {
  margin-bottom: 0;
}

.result-content {
  padding: 8px 12px;
  cursor: pointer;
}

.result-content h4 {
  margin: 0 0 4px;
  font-size: 16px;
  font-weight: 600;
}

.result-content p {
  margin: 0;
  color: #666;
  font-size: 14px;
}

.no-results {
  margin-top: 12px;
  padding: 16px;
  text-align: center;
  color: #999;
  background: white;
  border-radius: 8px;
}

.input-search {
  margin-top: 5%;
}

.clear-icon {
  cursor: pointer;
}
</style>
