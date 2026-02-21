import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const amount = ref(0);

    const addItemToCart = async (data) => {
      try {
        await api.post("/cart", data);
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getCountCartItemsByUserId = async (userId) => {
      try {
        const { data } = await api.get(`/cart/count/${userId}`);

        console.log(data);
        

        amount.value = data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    return {
      addItemToCart,
      getCountCartItemsByUserId,
      amount
    };
  },

  {
    persist: true,
  },
);
