import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Products from '../views/Products.vue'
import Home from '../views/Home.vue'
import Produtos from '../views/Produtos.vue'
import Drawer from '../views/Drawer.vue'
import BarraSuperior from '../views/BarraSuperior.vue'
import Table from '../views/Table.vue'


const routes = [
  {path: '/', component: Login},

  {path: '/products', component: Products, name: 'Products'},
  {path: '/home', component: Home, name: 'Home'},
  {path: '/produtos', component: Produtos, name: 'Produtos'}
]


const router = createRouter({
  history: createWebHistory(),
  routes,

})

export default router
