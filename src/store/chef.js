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


    const getChefByUserId = async (id) => {
        try {
            const {
                data
            } = await api.get(`/chefs/${id}`)

            return data
        } catch (error) {
            console.log(error)
            return {
                success: false,
                error: this.error
            }
        }
    }

    const updateChefByUserId = async (requestData) => {
        try {
            console.log(requestData);

            const {
                data
            } = await api.patch(`/chefs/${requestData.userId}`, requestData)

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
        loadAllChefs,
        getChefByUserId,
        updateChefByUserId
    }
}, {
    persist: true
})