import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

//npm install @fortawesome/fontawesome-free
import '@fortawesome/fontawesome-free/css/all.min.css'

const app = createApp(App)
app.use(router)
app.mount('#app')

//Vue Router thư viện định tuyến chính thức cho vue.js 
    //Điều hướng giữa các trang mà không reload lại trang web.
    //Tạo ra nhiều route tương ứng với các component khác nhau.

