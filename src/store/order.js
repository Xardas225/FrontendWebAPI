import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useOrderStore = defineStore(
  "order",
  () => {
    const createOrder = async (request) => {
      try {
        await api.post("/orders", request);
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    return {
      createOrder,
    };
  },
  {
    persist: true,
  },
);
