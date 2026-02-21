import { defineStore } from "pinia";
import api from "@/api/api";

export const useCartStore = defineStore(
  "cart",
  () => {
    const addItemToCart = async (data) => {
      try {
        await api.post("/cart", data);
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    return {
      addItemToCart,
    };
  },

  {
    persist: true,
  },
);
