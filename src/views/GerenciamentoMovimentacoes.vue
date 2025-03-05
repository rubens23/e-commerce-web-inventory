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
                    <option v-for="produto in produtos" :key="produto.id" :value="produto.id">{{ produto.name }}</option>
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
import api from '../api/axiosCustomConfig';


export default {
  components: { Drawer, BarraSuperior, Table2, BackButton },
   data() {
    return {
      movimentacao: {
        produto: '', // aqui é armazenado o id do produto
        quantidade: '',
        tipo: 'entrada',
      },
      produtos: null,
      movimentacoes: null,
      columns: [
        { label: 'Produto', key: 'nomeProduto' },
        { label: 'Quantidade', key: 'quantidade' },
        { label: 'Tipo', key: 'tipo' },
        { label: 'Data', key: 'data' },
        { label: 'Responsável', key: 'nomeResponsavel'},
      ],
    };
  },
  mounted(){
    this.fetchProdutos();
    this.fetchMovimentacoes();
  },
  methods: {
    async handleSubmit() {
      const produtoEncontrado = this.produtos.find(produto => produto.id === this.movimentacao.produto);

      if(!produtoEncontrado){
        console.error("Produto não encontrado");
        return;
      }

     

      // atualizando o estoque no backend
      try{
        await api.put(`http://localhost:8099/updateBookStock/${produtoEncontrado.id}`,{
          tipo: this.movimentacao.tipo,
          quantidade: Number(this.movimentacao.quantidade),
        });

        console.log("Estoque atualizado com sucesso!");

         // criando a movimentação localmente
        // Criando a movimentação localmente
    const novaMovimentacao = {
      id: "",
      nomeResponsavel: "",
      nomeProduto: produtoEncontrado.name,
      productId: produtoEncontrado.id,  // Enviar o ID do produto
      tipo: this.movimentacao.tipo,
      quantidade: Number(this.movimentacao.quantidade),
      data: new Date().toLocaleDateString(),  // Data no formato "dd/MM/yyyy"
      hora: new Date().toLocaleTimeString('pt-BR', { hour12: false }),  // Hora no formato "HH:mm:ss"
      responsavel: null
    };

    console.log("Objeto novaMovimentacao sendo enviado: ", novaMovimentacao);

      this.movimentacoes.push(novaMovimentacao);

      


      // Salvar a movimentação no backend
      await api.post('http://localhost:8099/saveStockMovement', novaMovimentacao);
      console.log("Movimentação registrada com sucesso!");

      }catch(error){
        console.error("Erro ao atualizar estoque: ", error);

      }


      // Resetando o formulário
      this.movimentacao.produto = '';
      this.movimentacao.quantidade = '';
      this.movimentacao.tipo = 'entrada';
    },
    async fetchProdutos(){
      try{
        const response = await api.get("http://localhost:8099/getBooks");
        this.produtos = response.data;
        console.log("Produtos adquiridos com sucesso: ", this.produtos);

      }catch(error){
        console.log("Erro ao buscar produtos: ", error);
      }
    },
    async fetchMovimentacoes(){
      try{
        const response = await api.get("http://localhost:8099//getAllBookStockMovements");
        this.movimentacoes = response.data;
        console.log("Movimentações adquiridas com sucesso: ", this.movimentacoes);


      }catch(error){
        console.log("Erro ao buscar movimentações: ", error);
      }
    }
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