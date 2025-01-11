<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="(column, index) in columns" :key="index">
          {{ column.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
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

/*
.table th, .table td{
    padding: 10px;
    text-align: left;
    
}
*/

.table td {
  /*
    border-top: 2px solid rgb(167, 166, 165);
    */
}

/* Estiliza o cabeçalho */
.table thead th {
  background-color: #e6f7ff;
  color: #495d69;
  border-bottom: 2px solid rgb(255, 221, 27);
  font-family: "Lato", sans-serif;
  font-size: 20px;
}
</style>
