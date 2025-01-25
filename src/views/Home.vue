<template>
  <div class="home-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>

    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo Principal -->
    <div class="content container-fluid">
      <h1>Dashboard</h1>

      <!-- Blocos de Métricas -->
      <div class="row mb-4">
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Total de Vendas</h5>
              <p class="card-text">{{ totalVendas }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Pedidos Pendentes</h5>
              <p class="card-text">{{ pedidosPendentes }} Pedidos</p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Produtos em Estoque</h5>
              <p class="card-text">{{ produtosEmEstoque }} Produtos</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="row">
        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Gráfico de Vendas</h5>
              <canvas id="salesChart"></canvas>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <h5 class="card-title">Gráfico de Pedidos</h5>
              <canvas id="ordersChart"></canvas>
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
import Chart from "chart.js/auto";
import axios from "axios";

export default {
  components: { Drawer, BarraSuperior },
  data() {
    return {
      totalVendas: "-",
      pedidosPendentes: "-",
      produtosEmEstoque: 150,
    };
  },
  mounted() {
    this.fetchTotalVendas();
    this.fetchPedidosPendentesQuantity();
    this.$nextTick(() => {
      this.renderSalesChart();
      this.renderOrdersChart();
    });
  },
  methods: {
    renderSalesChart() {
      const ctx = document.getElementById("salesChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
          datasets: [
            {
              label: "Vendas Mensais",
              data: [5000, 7000, 8000, 10000],
              borderColor: "#4796BD",
              backgroundColor: "rgba(71, 150, 189, 0.1)",
              borderWidth: 4,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { grid: { display: false } },
            x: { grid: { display: false } },
          },
          plugins: {
            legend: { display: true },
          },
        },
      });
    },
    renderOrdersChart() {
      const ctx = document.getElementById("ordersChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
          datasets: [
            {
              label: "Pedidos Realizados",
              data: [50, 60, 40, 80],
              backgroundColor: "#4796BD",
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: { grid: { display: false } },
            x: { grid: { display: false } },
          },
          plugins: {
            legend: { display: true },
          },
        },
      });
    },
    async fetchTotalVendas(){
      try{
        const response = await axios.get("http://localhost:8099/getSalesTotal");
        if(typeof response.data === "number"){
          this.totalVendas = response.data;
        }else{
          this.totalVendas = "-"
        }


      }catch(error){
        console.error("Erro ao buscar total de vendas:", error);
        this.totalVendas = "Erro ao carregar dados.";
      }
    },
    async fetchPedidosPendentesQuantity(){
      try{
        const response = await axios.get("http://localhost:8099/getPedidosPendentesQuantity");
        if(typeof response.data === "number"){
          this.pedidosPendentes = response.data;
        }else{
          this.pedidosPendentes = "-"


        }


      }catch(error){
        console.error("Erro ao buscar a quantidade de pedidos pendentes:", error);
        this.pedidosPendentes = "Erro ao carregar dados"
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
  width: calc(100% - 240px);
}

.card {
  border-radius: 10px;
}

.card-title {
  font-weight: bold;
}

.row {
  margin-bottom: 20px;
}
</style>
