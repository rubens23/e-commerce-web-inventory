<template>
  <div class="gerenciamento-movimentacoes-page">
    <BarraSuperior></BarraSuperior>
    <Drawer></Drawer>
    <div class="content">
      <div class="header-container">
        <h1>Gerenciamento de Movimentações</h1>
        <BackButton :route="'/Estoque'"></BackButton>
      </div>

      <!-- Conteúdo específico da tela -->
      <!-- Formulário de Movimentação -->
      <div class="card mt-4">
        <div class="card-header bg-primary text-white">
          <h4>Nova Movimentação</h4>
        </div>
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                  <label for="produto">Produto</label>
                  <select v-model="movimentacao.produto" class="form-control" required>
                    <option disabled value="">Selecione um produto</option>
                    <option v-for="produto in produtos" :key="produto.id" :value="produto.id">{{ produto.nome }}</option>
                  </select>
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="quantidade">Quantidade</label>
                  <input v-model="movimentacao.quantidade" type="number" class="form-control" required />
                </div>
              </div>
              <div class="col-md-3">
                <div class="form-group">
                  <label for="tipo">Tipo de Movimentação</label>
                  <select v-model="movimentacao.tipo" class="form-control" required>
                    <option value="entrada">Entrada</option>
                    <option value="saida">Saída</option>
                  </select>
                </div>
              </div>
            </div>
            <button type="submit" class="custom-button mt-3">Registrar Movimentação</button>
          </form>
        </div>
      </div>

      <!-- Histórico de Movimentações -->
      <div class="card mt-4">
        <div class="card-header bg-warning" style="color: #333333;">
          <h4>Histórico de Movimentações</h4>
        </div>
        <div class="card-body">
          <!-- Usando o componente Table2 para mostrar o histórico -->
          <Table2 :items="movimentacoes" :columns="columns" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import Table2 from './Table2.vue';
import BackButton from "./BackButton.vue";


export default {
  components: { Drawer, BarraSuperior, Table2, BackButton },
   data() {
    return {
      movimentacao: {
        produto: '',
        quantidade: '',
        tipo: 'entrada',
      },
      produtos: [
        { id: 1, nome: 'Produto 1' },
        { id: 2, nome: 'Produto 2' },
        { id: 3, nome: 'Produto 3' },
      ],
      movimentacoes: [
        { id: 1, produtoNome: 'Produto 1', quantidade: 10, tipo: 'entrada', data: '2025-01-10' },
        { id: 2, produtoNome: 'Produto 2', quantidade: 5, tipo: 'saida', data: '2025-01-11' },
      ],
      columns: [
        { label: 'Produto', key: 'produtoNome' },
        { label: 'Quantidade', key: 'quantidade' },
        { label: 'Tipo', key: 'tipo' },
        { label: 'Data', key: 'data' },
      ],
    };
  },
  methods: {
    handleSubmit() {
      const novaMovimentacao = {
        id: this.movimentacoes.length + 1,
        produtoNome: this.produtos.find(produto => produto.id === this.movimentacao.produto).nome,
        ...this.movimentacao,
        data: new Date().toLocaleDateString(),
      };
      this.movimentacoes.push(novaMovimentacao);
      this.movimentacao.produto = '';
      this.movimentacao.quantidade = '';
      this.movimentacao.tipo = 'entrada';
    },
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
  align-items: center;
}

.custom-button {
  background-color: #4796bd;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Lato", sans-serif;
}

.custom-button:hover {
  background-color: rgb(255, 221, 27);
  transform: scale(1.05);
  color: #333333;
}
</style>