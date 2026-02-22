import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useCartStore = defineStore(
  "cart",
  () => {
    const items = ref([]);
    const amount = ref(0);
    const sum = ref(0);

    const addItemToCart = async (data) => {
      try {
        await api.post("/cart", data);
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getCountCartItemsByUserId = async () => {
      try {
        const { data } = await api.get(`/cart/count`);

        amount.value = data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getItemsFromCart = async () => {
      try {
        const { data } = await api.get("/cart");

        items.value = data;
        amount.value = data.length; 

        sum.value = data.reduce((acc, item) => acc + item.dishPrice, 0);
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const deleteItemFromCart = async (itemId) => {
      try {
        await api.delete(`/cart/${itemId}`);

        amount.value -= 1;

        return {
          success: true
        }
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };
    
    return {
      addItemToCart,
      getCountCartItemsByUserId,
      getItemsFromCart,
      deleteItemFromCart,
      amount,
      items, 
      sum
    };
  },

  {
    persist: true,
  },
);
