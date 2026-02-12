import {
    defineStore
} from "pinia";
import api from "@/api/api";


export const useDishStore = defineStore('dish', () => {

    const getAllDishes = async () => {
        try {
            const {
                data
            } = await api.get('/dishes')

            return data
        } catch (error) {
            console.log(error)
        }
    }


    const createNewDish = async (data) => {
        try {
            await api.post('/dishes', data);

            return data
        } catch (error) {
            console.log(error)
        }
    }


    const getAllIngredients = async () => {
        try {
            const data = await api.get('/ingredients');

            return data
        } catch (error) {
            console.log(error)
        }
    }

    return {
        getAllDishes,
        createNewDish,
        getAllIngredients
    }

}, {
    persist: true
})