<template>
  <div class="metricas-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>

    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo Principal -->
    <div class="content container-fluid">
      <h1>Métricas Financeiras</h1>

      <!-- Gráficos e Métricas -->
      <div class="row mb-4">
        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Total Recebido</h5>
              <p class="card-text">R$ {{ totalRecebido }}</p>
              <!-- Você pode adicionar gráficos aqui futuramente -->
            </div>
          </div>
        </div>

        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Total Pendente</h5>
              <p class="card-text">R$ {{ totalPendente }}</p>
              <!-- Gráfico de pendências -->
            </div>
          </div>
        </div>
      </div>

      <!-- Detalhes do Pagamento -->
      <div class="card shadow-sm border-0">
        <div class="card-header bg-light">
          <h5 class="mb-0">Detalhes de Pagamentos Pendentes</h5>
        </div>
        <div class="card-body">
          <p><strong>Total de Pendências:</strong> R$ {{ totalPendente }}</p>
          <!-- Mais detalhes sobre os pagamentos pendentes -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";

export default {
  components: { Drawer, BarraSuperior },
  name: "VisualizarMetricas",
  data() {
    return {
      totalRecebido: (Math.random() * 1000).toFixed(2),
      totalPendente: (Math.random() * 500).toFixed(2),
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

.card {
  border-radius: 10px;
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
}

.custom-button:hover {
  background-color: rgb(255, 221, 27);
  transform: scale(1.05);
  color: #333333;
}
</style>