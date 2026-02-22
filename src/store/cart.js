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

        amount.value = data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getItemsFromCart = async () => {
      try {
        const { data } = await api.get("/cart");

        console.log(data);

        return data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    return {
      addItemToCart,
      getCountCartItemsByUserId,
      getItemsFromCart,
      amount,
    };
  },

  {
    persist: true,
  },
);
