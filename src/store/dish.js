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

    return {
        getAllDishes
    }

}, {
    persist: true
})