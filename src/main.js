import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "@/assets/fonts/iconfont.css"
import "@/style/commons.less"
import App from './App.vue'
import router from '@/router/index.js'
const app = createApp(App)
app.use(createPinia())
app.use(router)

app.mount('#app')