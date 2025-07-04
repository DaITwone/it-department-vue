import { createRouter, createWebHistory } from 'vue-router'
// componentcomponent
import Main from '@/components/Main.vue' // THÊM DÒNG NÀY
// Views
import About from '../views/About.vue'
import News from '../views/News.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Staff from '@/views/Staff.vue'
import TeacherList from '@/views/TeacherList.vue'
import SearchPage from '@/views/SearchPage.vue'
import NewsDetail from '@/views/NewsDetail.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'
import Contact from '@/views/Contact.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: Main // TRANG CHỦ SỬ DỤNG Main.vue
  },
  {
    path: '/',
    redirect: '/about'
  },
  {
    path: '/about',
    name: 'about',
    component: About
  },
  {
    path: '/news',
    name: 'news',
    component: News
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: SignUp,
  },
  {
    path: '/contact',
    name: 'contact',
    component: Contact,
  },
  {
    path: '/staff',
    name: 'Staff',
    component: Staff,
  },
  {
    path: '/teacher-list',
    name: 'TeacherList',
    component: TeacherList
  },
  {
  path: '/search',
  name: 'search',
  component: SearchPage
  },
  {
    path: '/news/:id',
    name: 'NewsDetail',
    component: NewsDetail,
    props: true,
  },
  {
    path: '/forgot-password',
    name: 'ForgotPassword',
    component: ForgotPassword,
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
