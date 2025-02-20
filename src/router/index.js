import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Produtos from '../views/Produtos.vue'
import AdicionarProduto from '../views/AdicionarProduto.vue'
import Vendas from '../views/Vendas.vue'
import Pedidos from '../views/Pedidos.vue'
import DetalhesPedido from '../views/DetalhesPedido.vue'
import ModalExportarProdutos from '../views/ModalExportarProdutos.vue'
import ModalImportarProdutos from '../views/ModalImportarProdutos.vue'
import Estoque from '../views/Estoque.vue'
import GerenciamentoMovimentacoes from '../views/GerenciamentoMovimentacoes.vue'
import VisualizacaoAlertas from '../views/VisualizacaoAlertas.vue'
import AjusteEstoque from '../views/AjusteEstoque.vue'
import Pagamentos from '../views/Pagamentos.vue'
import GerarRelatorio from '../views/GerarRelatorio.vue'
import ResolucaoProblemas from '../views/ResolucaoProblemas.vue'
import VisualizarMetricas from '../views/VisualizarMetricas.vue'
import Usuarios from '../views/Usuarios.vue'
import DetalhesUsuario from '../views/DetalhesAdministrador.vue'
import EditarUsuario from '../views/EditarUsuario.vue'
import RemoverUsuario from '../views/RemoverAdministrador.vue'


const routes = [
  {path: '/', component: Login},

  {path: '/home', component: Home, name: 'Home'},
  {path: '/produtos', component: Produtos, name: 'Produtos'},
  {path: '/adicionar-produto', component: AdicionarProduto, name: 'AdicionarProduto'},
  {path: '/editar-produto/:id', component: AdicionarProduto, name: 'EditarProduto'},
  {path: '/vendas', component: Vendas, name: 'Vendas'},
  {path: '/pedidos', component: Pedidos, name: 'Pedidos'},
  {path: '/detalhesPedido/:id', component: DetalhesPedido, name: 'DetalhesPedido'},
  { path: '/importar-produtos', component: ModalImportarProdutos, name: 'ImportarProdutos' },
  { path: '/exportar-produtos', component: ModalExportarProdutos, name: 'ExportarProdutos' },
  { path: '/estoque', component: Estoque, name: 'Estoque' },
  {path: "/movimentacoes",name: "GestaoMovimentacoes",component: GerenciamentoMovimentacoes,},
  { path: "/alertas",name: "VisualizacaoAlertas",component: VisualizacaoAlertas,},
  { path: "/ajuste-estoque", name: "AjusteEstoque", component: AjusteEstoque,},
  { path: "/pagamentos", name: "Pagamentos", component: Pagamentos,},
  { path: "/gerar-relatorio", name: "GerarRelatorio", component: GerarRelatorio,},
  { path: "/resolucao-problemas", name: "ResolucaoProblemas", component: ResolucaoProblemas,},
  { path: "/visualizar-metricas", name: "VisualizarMetricas", component: VisualizarMetricas,},
  { path: "/usuarios", name: "Usuarios", component: Usuarios,},
  { path: "/usuarios/detalhes/:id", name: "DetalhesUsuario", component: DetalhesUsuario,},
  { path: "/usuarios/editar/:id", name: "EditarUsuario", component: EditarUsuario,},
  { path: "/usuarios/remover/:id", name: "RemoverUsuario", component: RemoverUsuario,},


]


const router = createRouter({
  history: createWebHistory(),
  routes,

})

export default router
