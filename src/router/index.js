import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import Home from '../views/Home.vue'

const routes = [
  {path: '/', component: Login},

  {path: '/products', component: Products, name: 'Products'},
  {path: '/home', component: Home, name: 'Home'},
]


const router = createRouter({
  history: createWebHistory(),
  routes,

})

export default router
