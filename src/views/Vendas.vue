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
            R$ {{ salesReport.totalAmount.toFixed(2) }}
          </p>
        </div>
        <div class="summary-card">
          <p class="summary-title">Total de Pedidos</p>
          <p class="summary-value">{{ salesReport.totalOrders }}</p>
        </div>
        <div class="summary-card">
          <p class="summary-title">Receita Total</p>
          <p class="summary-value">
            R$ {{ salesReport.totalSales.toFixed(2) }}
          </p>
        </div>
      </div>

      <!-- Gráficos -->
      <div class="charts-container">
        <div class="chart">
          <!-- Gráfico de tendências -->
          <canvas id="trendChart"></canvas>
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

export default {
  components: { Drawer, BarraSuperior },
  data() {
    return {
      salesReport: {
        totalAmount: 0,
        totalOrders: 0,
        totalSales: 0,
        bestSellingProducts: [],
      },
    };
  },
  mounted() {
    this.loadSalesReport();
    this.$nextTick(() => {
      this.renderTrendChart();
      this.renderBestSellingChart();
    });
  },
  methods: {
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
    renderTrendChart() {
      const ctx = document.getElementById("trendChart").getContext("2d");
      new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Janeiro", "Fevereiro", "Março", "Abril"],
          datasets: [
            {
              label: "Vendas ao Longo do Tempo",
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
