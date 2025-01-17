<template>
  <div class="alertas-estoque-baixo-page">
    <BarraSuperior></BarraSuperior>
    <Drawer></Drawer>
    <div class="content">
        <div class="header-container">
        <h1>Alertas de Estoque Baixo</h1>
        <BackButton :route="'/Estoque'"></BackButton>
      </div>

      <!-- Tabela de Alertas -->
      <div class="card mt-4">
        <div class="card-header bg-warning" style="color: #333333;">
          <h4>Produtos com Estoque Baixo</h4>
        </div>
        <div class="card-body">
          <!-- Usando o componente Table2 para mostrar os alertas -->
          <Table2 :items="produtosBaixos" :columns="columns" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import Table2 from './Table2.vue';
import BackButton from './BackButton.vue';

export default {
  components: { Drawer, BarraSuperior, Table2, BackButton },
   data() {
    return {
      produtosBaixos: [
        { id: 1, nome: 'Produto 1', estoqueAtual: 3, estoqueMinimo: 5 },
        { id: 2, nome: 'Produto 2', estoqueAtual: 2, estoqueMinimo: 4 },
      ],
      columns: [
        { label: 'Produto', key: 'nome' },
        { label: 'Estoque Atual', key: 'estoqueAtual' },
        { label: 'Quantidade Mínima', key: 'estoqueMinimo' },
        { label: 'Ação', key: 'acao', format: (value) => value ? 'Repor Estoque' : 'Ajustar' }, // Botão de ação
      ],
    };
  },
  
};
</script>

<style scoped>
.content {
  margin-top: 20px;
  margin-left: 240px;
  padding: 20px;
  overflow-y: auto;
  width: calc(100% - 240px);
}

.header-container {
  display: flex;
  justify-content: space-between;
}
</style>