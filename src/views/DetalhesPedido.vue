<template>
  <div class="order-details-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>
    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo da Página -->
    <div class="content">
      <div class="header-container">
        <h1>Detalhes do Pedido</h1>
        <BackButton :route="'/Pedidos'"></BackButton>
      </div>

      <!-- Informações do Pedido -->
      <div class="order-info" v-if="order">
        <h2>Informações Gerais</h2>
        <div class="info-grid">
          <div>
            <strong>ID do Pedido:</strong>
            <span>{{ order.id }}</span>
          </div>
          <div>
            <strong>Status:</strong>
            <span>{{ order.orderStatus }}</span>
          </div>
          <div>
            <strong>Valor Total:</strong>
            <span>R$ {{ order.totalAmount.toFixed(2) }}</span>
          </div>
          <div>
            <strong>Data do Pedido:</strong>
            <span>{{ formatDate(order.createdAt) }}</span>
          </div>
        </div>
      </div>

      <!-- Endereço -->
      <div class="address-section" v-if="order?.address">
        <h2>Endereço</h2>
        <p>{{ order?.address?.street }}, {{ order?.address?.number }}</p>
        <p>{{ order?.address?.city }} - {{ order?.address?.state }}</p>
        <p>{{ order?.address?.zipCode }}</p>
      </div>

      <!-- Itens do Pedido -->
      <div class="items-section" v-if="order?.items">
        <h2>Itens do Pedido</h2>
        <table>
          <thead>
            <tr>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in order.items" :key="item.id">
              <td>{{ item.productId }}</td>
              <td>{{ item.quantity }}</td>
              <td>R$ {{ item.price.toFixed(2) }}</td>
              <td>R$ {{ (item.quantity * item.price).toFixed(2) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import BackButton from "./BackButton.vue";
import api from "../api/axiosCustomConfig";

export default {
  components: { Drawer, BarraSuperior, BackButton },
  data() {
    return {
      order: null,
    };
  },
  created() {
    const orderId = this.$route.params.id;

    if (orderId) {
      this.fetchOrderDetails(orderId);
    } else {
      console.error("ID do pedido não encontrado nos parâmetros da rota");
    }
  },
  methods: {
   
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString("pt-BR");
    },
    async fetchOrderDetails(orderId) {
      try{
        const response = await api.get(
          `http://localhost:8099/getOrderById/${orderId}`
        );

        if(response.data){
          this.order = response.data;
          console.log("obtive o pedido", this.order);

        }

      }catch(error){
        console.log("Erro ao buscar pedido: ", error);
      }
      
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


.order-info,
.address-section,
.items-section {
  margin-top: 20px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
    font-family: "Lato", sans-serif;

}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-top: 10px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

table th,
table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
    font-family: "Lato", sans-serif;

}

table th {
  background-color: #f2f2f2;
  
}

h2 {
  margin-bottom: 10px;
}
</style>
