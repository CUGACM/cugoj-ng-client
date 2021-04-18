import { createApp } from 'vue'
import ElementPlus from 'element-plus';

import 'bootstrap/dist/css/bootstrap-grid.css'
import 'bootstrap/dist/css/bootstrap-reboot.css'
import 'bootstrap/dist/css/bootstrap-utilities.css'
import 'element-plus/lib/theme-chalk/index.css';

import router from './router'

createApp({})
    .use(router)
    .use(ElementPlus)
    .mount('#app');