<template>
  <table class="table">
    <thead>
      <tr>
        <th></th>
        <th v-for="(column, index) in columns" :key="index">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      
      <tr v-for="(item, index) in items" :key="index">
         <!-- Coluna de ícones -->
        <td>
          <span @click="handleEdit(item)" style="cursor: pointer; margin-right: 20px;">
            <i class="fas fa-edit"></i> 
          </span>
          <span @click="handleDelete(item)" style="cursor: pointer;">
            <i class="fas fa-trash-alt"></i> 
          </span>
        </td>
        <td v-for="(column, index) in columns" :key="index">
          <!-- Verifica se a coluna é "actions" e o valor de actions é "Ver Detalhes" -->
          <span v-if="column.key === 'actions' && item.actions === 'Ver Detalhes'" 
                @click="handleViewDetails(item.id)" 
                class="text-primary" 
                style="cursor: pointer;">
            Ver Detalhes
          </span>
          <!-- Caso contrário, exibe o valor normal -->
          <span v-else>
            {{ formatData(item[column.key], column) }}
          </span>

        </td>
      
      </tr>
    </tbody>
  </table>
</template>

<script>

import axios from "axios";

export default {
  name: "Table",
  props: {
    items: Array,
    columns: Array,
  },
  methods: {
    formatData(value, column) {
      if (column.format) {
        return column.format(value);
      }
      return value;
    },
    handleViewDetails(orderId) {
      console.log("cliquei em ver detalhes", orderId);
      this.$router.push({name: "DetalhesPedido", params: {id: orderId}});
    },
     handleEdit(item) {
      console.log("cliquei em editar produto");
      this.$emit("editar-item", item);
      
    },
    async handleDelete(item) {
      const confirmacao = window.confirm(`Tem certeza que deseja excluir o produto "${item.name}"?`);

      if(!confirmacao){
        return;
      }

      try{
        await axios.delete(`http://localhost:8099/deleteBook/${item.id}`);
        this.$emit("item-excluido", item.id);
        console.log(`Produto "${item.name}" excluído com sucesso.`);
        alert("Produto excluído com sucesso!")

      }catch(error){
        console.error("Erro ao excluir o produto:", error);
        alert("Erro ao excluir o produto. Tente novamente.");
      }
    },
  },
};
</script>

<style scoped>
.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;

  border: 2px solid rgb(255, 221, 27);

  border-radius: 10px;
  overflow: hidden;
}

.table tbody td {
  border-bottom: 1px solid rgb(206, 206, 206);
  font-family: "Lato", sans-serif;
  font-size: 22px;
  color: #333333;
}




/* Estiliza o cabeçalho */
.table thead th {
  background-color: #e6f7ff;
  color: #495d69;
  border-bottom: 2px solid rgb(255, 221, 27);
  font-family: "Lato", sans-serif;
  font-size: 20px;
}

.table td{
  padding: 10px;
}

.fas{
  color: black;
}

</style>
