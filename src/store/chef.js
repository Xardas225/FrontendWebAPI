import {
    defineStore
} from "pinia";
import api from "@/api/api";


export const useChefStore = defineStore('chef', () => {

    const loadAllChefs = async () => {
        try {
            const {
                data
            } = await api.get(`/chefs`)

            return data
        } catch (error) {
            console.log(error.message)
            return {
                success: false,
                error: this.error
            }
        }
    }

    return {
        loadAllChefs
    }
})