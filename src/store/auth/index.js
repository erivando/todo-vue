import { defineStore } from 'pinia'
import api from '@/http/api';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
        user: {}
    }),
    getters: {
        isLoggedIn: (state) => !!state.token
    },
    actions: {
        async login (payload) {
            const {data} = await api.post('/login', payload);
            this.token = data.token
            localStorage.setItem('token', data.token)
            await this.profile()
        },
        async profile () {
            const {data} = await api.get('/user');
            this.user = data.user
        },
        async checkToken () {
            if (!localStorage.getItem('token')) {
                return Promise.reject(new Error('token inválido.'));    
            }
            
            this.token = localStorage.getItem('token');
    
            return await this.profile()        
        },
        async logout () {
            await api.post('/logout');
            this.clear()
        },
        clear() {
            this.token = ''
            this.user = {}
            localStorage.removeItem('token');
        },
        redirect() {
          this.clear()
          this.router.push('/login')
        }
    },
})