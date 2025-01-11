import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Produtos from '../views/Produtos.vue'
import Drawer from '../views/Drawer.vue'
import BarraSuperior from '../views/BarraSuperior.vue'
import Table from '../views/Table.vue'
import AdicionarProduto from '../views/AdicionarProduto.vue'
import Vendas from '../views/Vendas.vue'
import Pedidos from '../views/Pedidos.vue'
import DetalhesPedido from '../views/DetalhesPedido.vue'


const routes = [
  {path: '/', component: Login},

  {path: '/home', component: Home, name: 'Home'},
  {path: '/produtos', component: Produtos, name: 'Produtos'},
  {path: '/adicionar-produto', component: AdicionarProduto, name: 'AdicionarProduto'},
  {path: '/vendas', component: Vendas, name: 'Vendas'},
  {path: '/pedidos', component: Pedidos, name: 'Pedidos'},
  {path: '/detalhesPedido/:id', component: DetalhesPedido, name: 'DetalhesPedido'}

]


const router = createRouter({
  history: createWebHistory(),
  routes,

})

export default router
