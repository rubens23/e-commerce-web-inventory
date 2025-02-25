<template>
  <div class="sales-dashboard-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>
    <!-- Drawer -->
    <Drawer></Drawer>
    <!-- Conteúdo do Dashboard -->
    <div class="content">
      <!-- Resumo Geral -->
      <div class="summary-container">
        <div class="summary-card">
          <p class="summary-title">Total de Vendas</p>
          <p class="summary-value">
            {{ totalSales }}
          </p>
        </div>
        <div class="summary-card">
          <p class="summary-title">Total de Pedidos</p>
          <p class="summary-value">{{ totalOrders }}</p>
        </div>
        <div class="summary-card">
          <p class="summary-title">Receita Total</p>
          <p class="summary-value">
            R$ {{ totalAmount.toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="charts-container">
        <div class="chart">
          <!-- Gráfico de tendências -->
          <canvas id="salesChart"></canvas>
        </div>
        <!-- Filtro -->
        <div class="col-md-12 mt-4">
          <div class="card shadow-sm border-0">
            <div class="card-body">
              <ChartFilter   @filter-changed="updatesalesChartData"/>

            </div>

          </div>
        </div>
        <div class="chart">
          <!-- Gráfico de produtos mais vendidos -->
          <canvas id="bestSellingChart"></canvas>
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
import ChartFilter from "./ChartFilter.vue"

export default {
  components: { Drawer, BarraSuperior, ChartFilter },
  data() {
    return {
      totalAmount: 0,
      totalOrders: 0,
      totalSales: 0,
      bestSellingProducts: [],
      salesChartData: null,
      salesChartInstance: null,
        
      
    };
  },
  mounted() {
    //this.loadSalesReport();
    this.fetchTotalVendas();
    this.fetchTotalPedidos();
    this.fetchReceitaTotal();
    this.getNewsalesChartData();
    this.$nextTick(() => {
      this.renderBestSellingChart();
    });
  },
  methods: {
    async fetchTotalVendas(){
      try{
        const response = await axios.get("http://localhost:8099/getSalesTotal", {
          withCredentials: true
        });
        if(typeof response.data === "number"){
          this.totalSales = response.data;
        }else{
          this.totalSales = "-"

        }

      }catch(error){
        console.error("Erro ao buscar total de vendas: ", error);
        this.totalSales = "-"
      }
     

    },
    async fetchTotalPedidos(){
       try{
        const response = await axios.get("http://localhost:8099/getOrdersQuantity", {
          withCredentials: true
        });
        if(typeof response.data === "number"){
          this.totalOrders = response.data;
        }else{
          this.totalOrders = "-"

        }

      }catch(error){
        console.error("Erro ao buscar total de pedidos: ", error);
        this.totalOrders = "-"
      }

    },
    async getNewsalesChartData(filter = "last_quarter", startDateMillis = null, endDateMillis = null){
      if(startDateMillis == null && endDateMillis == null){
         const response = await axios.get(`http://localhost:8099/salesForChart?filter=${filter}`, {
          withCredentials: true
         });
         this.salesChartData = response.data;
         this.renderSalesChart();

      }else{
         const response = await axios.get(`http://localhost:8099/salesForChart?dataInicio=${startDateMillis}&dataFim=${endDateMillis}`, {
          withCredentials: true
         });
         this.salesChartData = response.data;
         this.renderSalesChart();

      }
     

      console.log("dados recebidos!", this.salesChartData);

    },
    async fetchReceitaTotal(){
       try{
        const response = await axios.get("http://localhost:8099/getSalesTotalAmount", {
          withCredentials: true
        });
        if(typeof response.data === "number"){
          this.totalAmount = response.data;
          console.log("peguei o totalamount, ", this.totalAmount);
        }else{
          this.totalAmount = "-"
          console.log("não peguei o totalamount, ", this.totalAmount);

        }

      }catch(error){
        console.error("Erro ao buscar total de vendas: ", error);
        this.totalAmount = "-"
      }

    },
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
    loadSalesReport() {
      // Simulação de dados
      this.salesReport = {
        totalAmount: 15000,
        totalOrders: 120,
        totalSales: 80,
        bestSellingProducts: [
          { productId: "1", totalQuantitySold: 40, totalRevenue: 2000 },
          { productId: "2", totalQuantitySold: 30, totalRevenue: 1500 },
        ],
      };
    },
    
    renderBestSellingChart() {
      const ctx = document.getElementById("bestSellingChart").getContext("2d");
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: this.salesReport.bestSellingProducts.map((p) => p.productId),
          datasets: [
            {
              label: "Produtos Mais Vendidos",
              data: this.salesReport.bestSellingProducts.map(
                (p) => p.totalQuantitySold
              ),
              backgroundColor: "#4796BD",
            },
          ],
        },
        options: {
          responsive: true,
              scales: {
            y: {
              grid: {
                display: false, // Remove as linhas horizontais
              },
            },
            x: {
              grid: {
                display: false, // Remove as linhas verticais
              },
            },
          },
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    },
  },
};
</script>

<style scoped>
.content {
  margin-top: 20px;
  margin-left: 270px;
  padding: 20px;
  width: calc(100% - 270px);
}

.summary-container {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.summary-card {
  flex: 1;
  margin: 10px;
  padding: 20px;
  background-color: #4796bd;
  border-radius: 8px;
  text-align: center;
  color: white;
  font-family: "Lato", sans-serif;
}

.summary-title {
  font-size: 16px;
  font-weight: bold;
}

.summary-value {
  font-size: 24px;
}

.charts-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.chart {
  flex: 1;
  margin: 10px;
  padding: 20px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
</style>
