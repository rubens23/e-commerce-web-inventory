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

        <!-- Filtro -->
        <div class="col-md-12 mt-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <ChartFilter   @filter-changed="updatesalesChartData"/>

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

        <!-- Filtro -->
        <div class="col-md-12 mt-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <ChartFilter   @filter-changed="updateOrdersChartData"/>

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
import ChartFilter from "./ChartFilter.vue"; 

import api from "../api/axiosCustomConfig";

export default {
  components: { Drawer, BarraSuperior, ChartFilter },
  data() {
    return {
      totalVendas: "-",
      pedidosPendentes: 0,
      produtosEmEstoque: 0,
      salesChartData: null,
      salesChartInstance: null,
      ordersChartData: null,
      ordersChartInstance: null
    };
  },
  mounted() {
    this.fetchTotalVendas();
    this.fetchPedidosPendentesQuantity();
    this.fetchStockTotalQuantity();
    this.getNewsalesChartData();
    this.getNewOrdersChartData();
    this.$nextTick(() => {
    });
  },
  methods: {
    renderSalesChart() {
      if(this.salesChartInstance){
        this.salesChartInstance.destroy();
      }

      if(!this.salesChartData || this.salesChartData.length === 0){
        console.log("não tem dados de vendas");
        return;
      }
      const ctx = document.getElementById("salesChart").getContext("2d");

      // Extrai os meses e as quantidades de vendas do salesChartData
      const labels = this.salesChartData.map(item => item.mes);
      const salesData = this.salesChartData.map(item => item.totalSales);

      // pega o tipo do gráfico
      const label = this.salesChartData.length > 0 ? this.salesChartData[0].label : "Vendas";

      console.log("o label que vai ser printado no grafico de vendas é: ", label)

      this.salesChartInstance = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: salesData,//quantidade de vendas
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
       if(this.ordersChartInstance){
        this.ordersChartInstance.destroy();
      }

      if(!this.ordersChartData || this.ordersChartData.length === 0){
        console.log("não tem dados de pedidos");
        return;
      }

      const ctx = document.getElementById("ordersChart").getContext("2d");

       // Extrai os meses e as quantidades de vendas do salesChartData
      const labels = this.ordersChartData.map(item => item.mes);
      const ordersData = this.ordersChartData.map(item => item.totalOrders);

      // pega o tipo do gráfico
      const label = this.ordersChartData.length > 0 ? this.ordersChartData[0].label : "Pedidos Realizados";

      this.ordersChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: label,
              data: ordersData,
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
        const response = await api.get("/getSalesTotal");
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
        const response = await api.get("http://localhost:8099/getPedidosPendentesQuantity");
        if(typeof response.data === "number"){
          this.pedidosPendentes = response.data;
        }else{
          this.pedidosPendentes = 0


        }


      }catch(error){
        console.error("Erro ao buscar a quantidade de pedidos pendentes:", error);
        this.pedidosPendentes = "Erro ao carregar dados"
      }
    },
    async fetchStockTotalQuantity(){
      try{
        const response = await api.get("http://localhost:8099/getQuantidadeProdutosEmEstoque");
        if(typeof response.data === "number"){
          this.produtosEmEstoque = response.data;
        }else{
          this.produtosEmEstoque = 0;
        }

      }catch(error){
        console.error("Erro ao buscar a quantidade total de produtos em estoque", error);
        this.produtosEmEstoque = 0;
      }
    },
    updatesalesChartData(filtroSelecionado, startDateMillis, endDateMillis){
      console.log('Filtro recebido: ', filtroSelecionado)
      try{
         if (filtroSelecionado === 'personalizado') {
      this.getNewsalesChartData(filtroSelecionado, startDateMillis, endDateMillis);
    } else {
      this.getNewsalesChartData(filtroSelecionado);
    }
      
      }catch(error){
        console.error("Erro ao buscar dados do gráfico:", error);

      }
    },
    updateOrdersChartData(filtroSelecionado, startDateMillis, endDateMillis){
      console.log('Filtro recebido: ', filtroSelecionado)
      try{
         if (filtroSelecionado === 'personalizado') {
      this.getNewOrdersChartData(filtroSelecionado, startDateMillis, endDateMillis);
    } else {
      this.getNewOrdersChartData(filtroSelecionado);
    }
      
      }catch(error){
        console.error("Erro ao buscar dados do gráfico:", error);

      }
    },
    async getNewsalesChartData(filter = "last_quarter", startDateMillis = null, endDateMillis = null){
      if(startDateMillis == null && endDateMillis == null){
         const response = await api.get(`http://localhost:8099/salesForChart?filter=${filter}`);
         this.salesChartData = response.data;
         this.renderSalesChart();

      }else{
         const response = await api.get(`http://localhost:8099/salesForChart?dataInicio=${startDateMillis}&dataFim=${endDateMillis}`);
         this.salesChartData = response.data;
         this.renderSalesChart();

      }
     

      console.log("dados recebidos!", this.salesChartData);

    },
    async getNewOrdersChartData(filter = "last_quarter", startDateMillis = null, endDateMillis = null){
      if(startDateMillis == null && endDateMillis == null){
         const response = await api.get(`http://localhost:8099/ordersForChart?filter=${filter}`);
         this.ordersChartData = response.data;
         this.renderOrdersChart();

      }else{
         const response = await api.get(`http://localhost:8099/ordersForChart?dataInicio=${startDateMillis}&dataFim=${endDateMillis}`);
         this.ordersChartData = response.data;
         this.renderOrdersChart();


      }
     

      console.log("dados de pedidos recebidos!", this.ordersChartData);

    },
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
