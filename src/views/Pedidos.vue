<template>
  <div class="orders-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>
    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo da Página -->
    <div class="content">
      <div class="header-container">
        <h1>Pedidos</h1>
      </div>

      <!-- Tabela com pedidos -->
      <Table
        :items="orders"
        :columns="columns"
        @view-details="viewOrderDetails"
      />
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import Table from "./Table.vue";

export default {
  components: { Drawer, BarraSuperior, Table },
  data() {
    return {
      orders:[
    {
      id: "1",
      userId: "user1",
      actions: "Ver Detalhes",
      items: [
        { id: "item1", productId: "prod1", quantity: 2, price: 50.00 },
        { id: "item2", productId: "prod2", quantity: 1, price: 40.00 }
      ],
      totalAmount: 140.00,
      address: {
        street: "Rua A",
        number: "123",
        city: "São Paulo",
        state: "SP",
        zipCode: "12345-678"
      },
      orderStatus: "Processing",
      createdAt: 1678749200000, // Exemplo de timestamp
      updatedAt: null
    },
    {
      id: "2",
      userId: "user2",
      items: [
        { id: "item3", productId: "prod3", quantity: 1, price: 60.00 }
      ],
      totalAmount: 60.00,
      address: {
        street: "Rua B",
        number: "456",
        city: "Rio de Janeiro",
        state: "RJ",
        zipCode: "23456-789"
      },
      orderStatus: "Shipped",
      createdAt: 1678853200000,
      updatedAt: null,
      actions: "Ver Detalhes",
    },
    {
      id: "3",
      userId: "user3",
      items: [
        { id: "item4", productId: "prod4", quantity: 3, price: 33.33 }
      ],
      totalAmount: 100.00,
      address: {
        street: "Rua C",
        number: "789",
        city: "Belo Horizonte",
        state: "MG",
        zipCode: "34567-890"
      },
      orderStatus: "Delivered",
      createdAt: 1678957200000,
      updatedAt: null,
      actions: "Ver Detalhes",
    }
  ],

      columns: [
        { label: "ID", key: "id" },
        { label: "Status", key: "orderStatus" },
        {
          label: "Total",
          key: "totalAmount",
          format: (value) => `R$ ${value.toFixed(2)}`,
        },
        {
          label: "Data",
          key: "createdAt",
          format: (value) => new Date(value).toLocaleDateString("pt-BR"),
        },
        { label: "Ações", key: "actions" },
      ],
    };
  },
  methods: {
    viewOrderDetails(orderId) {
      console.log("ID do Pedido:", orderId);
      this.$router.push({ name: 'DetalhesPedido', params: { id: orderId } });
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
</style>
