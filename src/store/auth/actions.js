import api from "@/http/api"
import { useAuthStore } from ".";

export default {
    login: async (payload) => {
        const {data} = await api.post('/login', payload);
        const store = useAuthStore();
        store.token = data.token
        localStorage.setItem('token', data.token)
    },
    profile: async () => {
        const store = useAuthStore();
        const {data} = await api.get('/user');
        store.user = data.user
    },
    checkToken: async () => {
        if (!localStorage.getItem('token')) {
            // throw new Error('token inválido.')
            return Promise.reject(new Error('token inválido.'));    
        }

        const store = useAuthStore();
        
        store.token = localStorage.getItem('token');

        return await store.profile()        
    },
    logout: async () => {
        await api.post('/logout');
        const store = useAuthStore();
        store.token = ''
        store.user = {}
	    localStorage.removeItem('token');
    }
}