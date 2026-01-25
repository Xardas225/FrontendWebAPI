import {
    defineStore
} from 'pinia'
import api from '@/api/api'


export const useAuthStore = defineStore('auth', {
    state: () => ({
        userId: null,
    }),

    actions: {
        async register(userData) {
            try {
                const {
                    data
                } = await api.post('/auth/register', userData)

                this.userId = data.userId

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
        },
        async loadUserData(userId) {
            try {
                const {
                    data
                } = await api.get(`/users/${userId || this.userId}`)

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
        },
        async updateUserData(data) {
            try {
                await api.put(`/users/${this.userId}`, data)
                await this.loadUserData()

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
        },
        async loadAllUsers(data) {
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
    }


})