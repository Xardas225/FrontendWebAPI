import { defineStore } from "pinia";
import api from "@/api/api";
import { ref } from "vue";

export const useOrderStore = defineStore(
  "order",
  () => {

    const orders = ref([]);

    const createOrder = async (request) => {
      try {
        await api.post("/orders", request);
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getAllOrders = async () => {
      try {
        const {data} = await api.get("/orders");

        orders.value = data
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    return {
      createOrder,
      getAllOrders,
      orders
    };
  },
  {
    persist: true,
  },
);
