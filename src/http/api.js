import axios from "axios";
import { useAuthStore } from "@/store/auth";
import { useTodoStore } from "@/store/todos";

const api = axios.create({
    baseURL: 'http://localhost:8081/api',
    timeout: 3000,
    headers: {
        'Content-Type': 'application/json'
    }
})

api.interceptors.request.use((config) => {
    let token = localStorage.getItem('token')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    return config;
  }, (error) => {
    return Promise.reject(error)
});
  
api.interceptors.response.use(config => {
    return config
  }, error => {
    const auth = useAuthStore();
    const todos = useTodoStore()
    if (error.response.status === 401 && auth.isLoggedIn) {
      if (!!todos.showModalForm) {
        todos.showModal()
      }
      return auth.redirect()
    }

    return Promise.reject(error)
})

export default api