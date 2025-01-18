<template>
  <div class="pagamentos-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>

    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo Principal -->
    <div class="content container-fluid">
      <h1>Gerenciamento de Pagamentos</h1>

      <!-- Filtros e Ações Rápidas -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Status de Pagamentos</h5>
              <p class="card-text text-muted">
                Filtre os pagamentos por status para gerenciar facilmente as transações.
              </p>
              <select class="form-select" v-model="statusFiltro" @change="filtrarPagamentos">
                <option value="todos">Todos</option>
                <option value="aprovado">Aprovado</option>
                <option value="pendente">Pendente</option>
                <option value="recusado">Recusado</option>
              </select>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Resolução de Problemas</h5>
              <p class="card-text text-muted">
                Resolva problemas com pagamentos de forma rápida e eficiente.
              </p>
              <button class="custom-button w-100" @click="resolverProblemas">Resolver Problemas</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Relatórios e Métricas -->
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Relatório de Pagamentos</h5>
              <p class="card-text text-muted">
                Geração de relatórios financeiros com base no status dos pagamentos.
              </p>
              <button class="custom-button w-100" @click="gerarRelatorioPagamentos">Gerar Relatório</button>
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Métricas Financeiras</h5>
              <p class="card-text text-muted">
                Visualize as métricas financeiras, como total recebido e pendências.
              </p>
              <button class="custom-button w-100" @click="visualizarMetricas">Ver Métricas</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Histórico de Pagamentos -->
      <div class="row mt-4">
        <div class="col-12">
          <div class="card shadow-sm border-0">
            <div class="card-header bg-light">
              <h5 class="mb-0">Histórico de Pagamentos</h5>
            </div>
            <div class="card-body">
              <Table2
                :items="pagamentos"
                :columns="columns"
                @view-details="verDetalhesPagamento"
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
import BarraSuperior from "./BarraSuperior.vue";
import Table2 from "./Table2.vue";

export default {
  components: { Drawer, BarraSuperior, Table2 },
  name: "Pagamentos",
  data() {
    return {
      statusFiltro: "todos",
      pagamentos: [
        { id: 1, data: "2025-01-14", valor: 100, status: "aprovado", cliente: "Cliente A" },
        { id: 2, data: "2025-01-13", valor: 50, status: "pendente", cliente: "Cliente B" },
        { id: 3, data: "2025-01-12", valor: 200, status: "recusado", cliente: "Cliente C" },
      ],
      columns: [
        { label: "Data", key: "data" },
        { label: "Cliente", key: "cliente" },
        { label: "Valor", key: "valor" },
        { label: "Status", key: "status" },
      ],
    };
  },
  methods: {
    filtrarPagamentos() {
      // Função para filtrar os pagamentos conforme o status selecionado
      // Exemplo de implementação
      if (this.statusFiltro === "todos") {
        return;
      }
      this.pagamentos = this.pagamentos.filter(pagamento => pagamento.status === this.statusFiltro);
    },
    resolverProblemas() {
      // Função para resolver problemas de pagamentos (como devoluções)
      this.$router.push({ name: "ResolucaoProblemas" });
    },
    gerarRelatorioPagamentos() {
      console.log("Gerar Relatório de Pagamentos");
        this.$router.push({ name: "GerarRelatorio" });

    },
    visualizarMetricas() {
      console.log("Visualizar Métricas Financeiras");
        this.$router.push({ name: "VisualizarMetricas" });

    },
    verDetalhesPagamento(pagamento) {
      console.log("Ver detalhes do pagamento: ", pagamento);
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
