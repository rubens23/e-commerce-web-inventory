<template>
  <div class="table-container">
    <table class="table">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIndex) in items" :key="rowIndex">
          <!-- Colunas dinâmicas -->
          <td v-for="(column, colIndex) in columns" :key="colIndex">
    
            <span>
              {{ formatData(item[column.key], column) }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "Table2",
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
   
  },
};
</script>

<style scoped>
.table {
  margin-top: 20px;
    font-family: "Lato", sans-serif;

}

.table th {
  font-weight: 700;
  font-family: "Lato", sans-serif;

}
</style>