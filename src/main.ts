import { createApp } from 'vue'
import App from './views/layout/App.vue'
import router from './router'
import { createMetaManager } from 'vue-meta'
import { useAuth } from "@/plugins/auth"

const app = createApp(App)
const auth = useAuth()

app.provide('auth', auth)
app.use(router)
app.use(createMetaManager())
app.mount('#app')
