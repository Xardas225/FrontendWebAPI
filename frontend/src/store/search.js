import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useSearchStore = defineStore(
  "search",
  () => {
    const searchResult = ref([]);

    const search = async (searchData) => {
      try {
        const { data } = await api.post("/search", searchData);

        searchResult.value = data?.items;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const clearSearch = () => {
      searchResult.value = [];
    };

    return {
      search,
      searchResult,
      clearSearch,
    };
  },

  {
    persist: true,
  },
);
