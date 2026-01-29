import {
    defineStore
} from 'pinia'
import api from '@/api/api'
import {
    ref
} from 'vue';

export const useAuthStore = defineStore('auth', () => {
    const user = ref({});
    const isAuthenticated = ref(false);

    const login = async (credentials) => {
        try {
            const {
                data
            } = await api.post('/auth/login', credentials)

            user.value = data;
            isAuthenticated.value = true;

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
            console.log(credentials);
            await api.post('/auth/logout', credentials)

            isAuthenticated.value = false;
            user.value = {};

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

    return {
        user,
        login,
        register,
        logout,
        isAuthenticated
    }

})