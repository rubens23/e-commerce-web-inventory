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
        @item-excluido="removerPedido"
        @editar-item="editarPedido"
      />
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import Table from "./Table.vue";
import api from "../api/axiosCustomConfig";

export default {
  components: { Drawer, BarraSuperior, Table },
  data() {
    return {
      orders:[
    
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
  mounted(){
    this.fetchOrders();
  },
  methods: {
    viewOrderDetails(orderId) {
      console.log("ID do Pedido:", orderId);
      this.$router.push({ name: 'DetalhesPedido', params: { id: orderId } });
    },
    async removerPedido(item){
     const confirmacao = window.confirm(`Tem certeza que deseja excluir o pedido ${item.id}?`);

      if(!confirmacao){
        return;
      }

      try{
        await api.delete(`http://localhost:8099/deleteOrder/${item.id}`);
        console.log(`Pedido "${item.name}" excluído com sucesso.`);
        alert("Pedido excluído com sucesso!")
        this.orders = this.orders.filter(order => order.id !== item.id)


      }catch(error){
        console.error("Erro ao excluir o pedido:", error);
        alert("Erro ao excluir o pedido. Tente novamente.");
      }
  },
  async fetchOrders(){
    try{
      const response = await api.get("http://localhost:8099/getOrders");
      this.orders = response.data.map(order => ({
        ...order,
        actions: "Ver Detalhes"
      }));
      console.log("Pedidos adquiridos com sucesso: ", this.items);

    }catch(error){
      console.log("Erro ao buscar pedidos: ", error);
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
</style>
