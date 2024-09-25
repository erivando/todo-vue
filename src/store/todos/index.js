import api from '@/http/api'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', {
    state: () => ({
        todos: [],
        todo: {},
        showModalForm: false,
    }),
    getters: {
        isCompleted (state) {
            return state.todos ? state.todos?.filter(item => item.completed === 0) : [];
        },
        notCompleted: (state) => state.todos ? state.todos?.filter(item => item.completed === 1) : [],
        formModal: (state) => state.showModalForm,
    },
    actions: {
        async listTodos () {
            const { data } = await api.get('/todos')
            this.setTodos(data)
        },
        setTodos(payload) {
            this.todos = payload
        },
        async todoDetail (id) {
            const { data } = await api.get(`/todos/${id}`)
            this.setTodo(data.todo)
        },
        setTodo(payload) {
            this.todo = payload
        },
        showModal() {
            this.showModalForm = !this.showModalForm
        },
        async insereTodo(payload) {
            return await api.post('/todos', payload)
        },
        async updateTodo(id, payload) {
            return await api.put(`/todos/${id}`, payload)
        },
        async removeTodo(payload) {
            await api.delete(`/todos/${payload}`)
        }
    }
})