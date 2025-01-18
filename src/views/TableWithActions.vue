<template>
  <div class="table-container">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th v-for="(column, index) in columns" :key="index">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, rowIndex) in items" :key="rowIndex">
          <!-- Colunas Dinâmicas -->
          <td v-for="(column, colIndex) in columns" :key="colIndex">
            <span v-if="!column.actions">
              {{ formatData(item[column.key], column) }}
            </span>
            <div v-else>
              <!-- Renderiza os ícones de ação -->
              <span
                v-for="(action, index) in column.actions"
                :key="index"
                @click="action.method(item)"
                style="cursor: pointer; margin-right: 20px"
              >
                <i :class="action.iconClass"></i>
              </span>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "TableWithActions",
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
.table th,
.table td {
  text-align: center;
}

.table-container {
  margin-top: 20px;
  font-family: "Lato", sans-serif;
}

.table th {
  font-weight: 700;
}

.btn {
  margin-right: 5px;
}
</style>
