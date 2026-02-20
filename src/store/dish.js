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
        throw { message: error.message, code: error?.code };
      }
    };

    const getDishById = async (id) => {
      try {
        const data = await api.get(`/dishes/${id}`);
        return data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const createNewDish = async (data) => {
      try {
        const response = await api.post("/dishes", data);
        return response;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getAllIngredients = async () => {
      try {
        const data = await api.get("/ingredients");

        return data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getAllKitchens = async () => {
      try {
        const data = await api.get("/kitchens");

        return data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    const getAllCategories = async () => {
      try {
        const data = await api.get("/categories");

        return data;
      } catch (error) {
        throw { message: error.message, code: error?.code };
      }
    };

    return {
      getAllDishes,
      createNewDish,
      getAllIngredients,
      getAllKitchens,
      getAllCategories,
      getDishById
    };
  },
  {
    persist: true,
  },
);
