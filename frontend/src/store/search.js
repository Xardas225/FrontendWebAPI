import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useSearchStore = defineStore(
    "search", 
    () => {

        const searchResult = ref([]);

        const search = async (searchData) => {
            try {
                const { data } = api.post("/search", searchData);

                return data;
            } catch (error) {
                throw { message: error.message, code: error?.code };
            }
        }


        return {

            search,


        }
    }, 
    
{
  persist: true,
});
