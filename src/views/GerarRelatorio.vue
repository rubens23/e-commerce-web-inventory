<template>
  <div class="relatorio-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>

    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo Principal -->
    <div class="content container-fluid">
      <h1>Gerar Relatório de Pagamentos</h1>

      <!-- Formulário para gerar relatório -->
      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body">
          <h5 class="card-title">Filtro de Relatório</h5>
          <form @submit.prevent="gerarRelatorio">
            <div class="mb-3">
              <label for="dataInicial" class="form-label">Data Inicial</label>
              <input type="date" class="form-control" id="dataInicial" v-model="dataInicial" required />
            </div>

            <div class="mb-3">
              <label for="dataFinal" class="form-label">Data Final</label>
              <input type="date" class="form-control" id="dataFinal" v-model="dataFinal" required />
            </div>

            <button type="submit" class="custom-button">Gerar Relatório</button>
          </form>
        </div>
      </div>

      <!-- Relatório Gerado -->
      <div v-if="relatorioGerado" class="card shadow-sm border-0">
        <div class="card-body">
          <h5 class="card-title">Relatório Gerado</h5>
          <p><strong>Data Inicial:</strong> {{ dataInicial }}</p>
          <p><strong>Data Final:</strong> {{ dataFinal }}</p>
          <p><strong>Total Recebido:</strong> R$ {{ totalRecebido }}</p>
          <p><strong>Total Pendente:</strong> R$ {{ totalPendente }}</p>
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
  name: "GerarRelatorio",
  data() {
    return {
      dataInicial: "",
      dataFinal: "",
      relatorioGerado: false,
      totalRecebido: 0,
      totalPendente: 0,
    };
  },
  methods: {
    gerarRelatorio() {
      // Gerar relatório fictício (você pode integrar com a API)
      this.totalRecebido = (Math.random() * 1000).toFixed(2);
      this.totalPendente = (Math.random() * 500).toFixed(2);
      this.relatorioGerado = true;
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