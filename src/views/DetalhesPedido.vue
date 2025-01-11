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
        <button class="back-button" @click="goBack">Voltar</button>
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

export default {
  components: { Drawer, BarraSuperior },
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
    goBack() {
      this.$router.push("/Pedidos");
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString("pt-BR");
    },
    async fetchOrderDetails(orderId) {
      // Mock de pedidos
      const mockOrders = [
        {
          id: "1",
          userId: "user1",
          items: [
            { id: "item1", productId: "prod1", quantity: 2, price: 50.0 },
            { id: "item2", productId: "prod2", quantity: 1, price: 40.0 },
          ],
          totalAmount: 140.0,
          address: {
            street: "Rua A",
            number: "123",
            city: "São Paulo",
            state: "SP",
            zipCode: "12345-678",
          },
          orderStatus: "Processing",
          createdAt: 1678749200000, // Exemplo de timestamp
          updatedAt: null,
        },
        {
          id: "2",
          userId: "user2",
          items: [
            { id: "item3", productId: "prod3", quantity: 1, price: 60.0 },
          ],
          totalAmount: 60.0,
          address: {
            street: "Rua B",
            number: "456",
            city: "Rio de Janeiro",
            state: "RJ",
            zipCode: "23456-789",
          },
          orderStatus: "Shipped",
          createdAt: 1678853200000,
          updatedAt: null,
        },
        {
          id: "3",
          userId: "user3",
          items: [
            { id: "item4", productId: "prod4", quantity: 3, price: 33.33 },
          ],
          totalAmount: 100.0,
          address: {
            street: "Rua C",
            number: "789",
            city: "Belo Horizonte",
            state: "MG",
            zipCode: "34567-890",
          },
          orderStatus: "Delivered",
          createdAt: 1678957200000,
          updatedAt: null,
        },
      ];

      const order = mockOrders.find((order) => order.id === orderId);

      if (order) {
        this.order = order;
        console.log("order obtido", this.order);

        this.$nextTick(() => {
          console.log("Vue atualizou o Dom");
        });
      } else {
        console.error(`Pedido com ID ${orderId} não encontrado`);
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

.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
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
