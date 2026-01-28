import {
    defineStore
} from "pinia";
import api from "@/api/api";


export const useUserStore = defineStore('user', () => {
    const loadUserData = async (id) => {
        try {
            const {
                data
            } = await api.get(`/users/${id}`)

            return {
                ...data
            }
        } catch (error) {
            console.log(error.message)
            return {
                success: false,
                error: this.error
            }
        }
    }

    const updateUserData = async (data) => {
        try {
            await api.put(`/users/${data.id}`, data)
            await loadUserData(data.id)

            return {
                success: true
            }
        } catch (error) {
            console.log(error.message)
            return {
                success: false,
                error: this.error
            }
        }
    }

    const loadAllUsers = async () => {
        try {
            const {
                data
            } = await api.get(`/users`)

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
        loadUserData,
        updateUserData,
        loadAllUsers
    }
})