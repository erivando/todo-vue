import { createApp, markRaw } from 'vue'
import App from './App.vue'
import router from './router'
import Antd from 'ant-design-vue'
import { createPinia } from 'pinia'

import 'ant-design-vue/dist/reset.css';

const app = createApp(App)
const pinia = createPinia()

pinia.use(({ store }) => {
  store.router = markRaw(router)
})

app.use(router)
app.use(Antd)
app.use(pinia)

app.mount('#app')
