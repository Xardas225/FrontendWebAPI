import { defineStore } from "pinia";
import api from "@/api/api";

export const useDishStore = defineStore(
  "dish",
  () => {
    const getAllDishes = async (filters, sort) => {
      try {
        console.log({
          ...filters,
          ...(sort && { sort: sort }),
        });

        const { data } = await api.get(`/dishes`, {
          params: {
            ...filters,
            ...(sort ? { sort: sort } : {}),
          },
        });

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const createNewDish = async (data) => {
      try {
        await api.post("/dishes", data);

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAllIngredients = async () => {
      try {
        const data = await api.get("/ingredients");

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAllKitchens = async () => {
      try {
        const data = await api.get("/kitchens");

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    const getAllCategories = async () => {
      try {
        const data = await api.get("/categories");

        return data;
      } catch (error) {
        console.log(error);
      }
    };

    return {
      getAllDishes,
      createNewDish,
      getAllIngredients,
      getAllKitchens,
      getAllCategories,
    };
  },
  {
    persist: true,
  },
);
