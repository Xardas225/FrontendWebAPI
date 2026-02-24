import axios from 'axios'
import router from '@/router';
import { useAuthStore } from '@/store/auth';




const api = axios.create({
  baseURL: 'https://localhost:7076/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*'
  }
})


api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)


api.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {

    const authApi = useAuthStore();

    if (error.response.status === 401) {
      await authApi.logout();
      router.push({
        name: "login"
      })
    }
  }
)



export default api