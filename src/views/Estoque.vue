<template>
  <div class="estoque-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>
    <!-- Drawer -->
    <Drawer></Drawer>
    <div class="content container-fluid">
      <h1>Gerenciamento de Estoque</h1>

      <!-- Controles e Alertas -->
      <div class="row">
        <div class="col-md-4">
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-body">
              <h5 class="card-title">Movimentação de Estoque</h5>
              <p class="card-text text-muted">
                Controle as entradas e saídas do estoque com facilidade.
              </p>
              <button
               class="custom-button w-100"
               @click="gerenciarMovimentacoes"
               >
                Gerenciar Movimentações
              </button>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card shadow-sm border-0 mb-4">
            <div class="card-body">
              <h5 class="card-title">Estoque Baixo</h5>
              <p class="card-text text-muted">
                Visualize itens com estoque crítico e receba alertas.
              </p>
              <button 
              class="custom-button w-100"
              @click="visualizarAlertas"
              >Visualizar Alertas</button>
            </div>
          </div>
        </div>

      </div>

      <!-- Histórico de Alterações -->
      <div class="row">
        <div class="col-12">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-light">
              <h5 class="mb-0">Histórico de Alterações</h5>
            </div>
            <div class="card-body">
              <Table2
                :items="movimentacoes"
                :columns="columns"
                @edit-item="editarItem"
                @delete-item="removerItem"
                @view-details="verDetalhes"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import Table2 from "./Table2.vue";
import BarraSuperior from "./BarraSuperior.vue";
import api from '../api/axiosCustomConfig';


export default {
  components: { Drawer, BarraSuperior, Table2 },
  name: "Estoque",
    data() {
    return {
      movimentacoes: null,
      columns: [
        { label: "Data", key: "data" },
        { label: "Produto", key: "nomeProduto" },
        { label: "Tipo", key: "tipo" },
        { label: "Quantidade", key: "quantidade" },
        { label: "Responsável", key: "nomeResponsavel" },
      ],
    };
  },
  mounted(){
    this.fetchMovimentacoes();
  },
  methods: {
    gerenciarMovimentacoes(){
      this.$router.push({name: "GestaoMovimentacoes"});
    },
    visualizarAlertas(){
      this.$router.push({name: "VisualizacaoAlertas"});
    },
    ajustarEstoque(){
      this.$router.push({name: "AjusteEstoque"});
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
  }
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

.card {
  border-radius: 10px;
}

.card-title {
  font-weight: bold;
  font-family: "Lato", sans-serif;
}

.table {
  margin-top: 20px;
  font-family: "Lato", sans-serif;
}

.table th {
  font-weight: 700;
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
