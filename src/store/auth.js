import {
    defineStore
} from 'pinia'
import api from '@/api/api'
import {
    computed,
    ref
} from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref({});
    const token = ref(null);

    const isAuthenticated = computed(() => !!token.value)

    // Восстановление состояния из localStorage при создании store
    const initialize = () => {
        const savedToken = localStorage.getItem('token')
        const savedUserId = localStorage.getItem('userId')

        if (savedToken) {
            token.value = savedToken
        }
    }

    const login = async (credentials) => {
        try {
            const {
                data
            } = await api.post('/auth/login', credentials)

            user.value = data;
            token.value = data.token;

            localStorage.setItem('token', data.token)
            localStorage.setItem('userId', data.id)

            return {
                success: true
            }
        } catch (error) {
            console.error('Login error:', error)
            return {
                success: false,
                error: error.response.data.message || error.message
            }
        }
    }

    const register = async (credentials) => {
        try {
            const {
                data
            } = await api.post('/auth/register', credentials)

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

    const logout = async () => {
        try {
            const credentials = {
                id: user.value.id,
                email: user.value.email
            }
            await api.post('/auth/logout', credentials)

            clearAuthData()

            return {
                success: true
            }

        } catch (error) {
            console.error('Logout error:', error)
            return {
                success: false,
                error: error.response.data.message || error.message
            }
        }
    }


    const clearAuthData = () => {
        user.value = {}
        token.value = null

        localStorage.removeItem('token')
        localStorage.removeItem('userId')
    }

    initialize()

    return {
        user,
        login,
        register,
        logout,
        isAuthenticated,
        initialize
    }

})