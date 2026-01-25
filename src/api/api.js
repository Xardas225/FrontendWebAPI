import axios from 'axios'

const api = axios.create({
  baseURL: 'https://localhost:7076/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin' : '*'
  }
})

export default api