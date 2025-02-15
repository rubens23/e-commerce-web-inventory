<template>
  <div class="d-flex align-items-center gap-2 chart-filter">
    <!-- Dropdown de filtros -->
    <div class="dropdown">
      <button
        class="btn btn-primary dropdown-toggle"
        type="button"
        @click="toggleDropdown"
      >
        {{ selectedFilterText }}
      </button>
      <ul class="dropdown-menu" :style="dropdownStyle">
        <li>
          <a
            class="dropdown-item"
            href="#"
            @click.prevent="applyFilter('last_quarter')"
            >Último Trimestre</a
          >
        </li>
        <li>
          <a
            class="dropdown-item"
            href="#"
            @click.prevent="applyFilter('last_year')"
            >Último ano</a
          >
        </li>
        <li>
          <a
            class="dropdown-item"
            href="#"
            @click.prevent="showDateInputs"
            >Personalizado</a
          >
        </li>
      </ul>
    </div>

    <!-- Inputs para datas personalizadas -->
    <div v-if="showCustomDates" class="d-flex gap-2">
        <input type="date" v-model="startDate" class="form-control">
        <input type="date" v-model="endDate" class="form-control">
        <button class="btn btn-success" @click="applyFilter('personalizado')">Aplicar</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFilterText: "Selecionar Período",
      dropdownVisible: false,
      showCustomDates: false,
      startDate: "",
      endDate: "",
    };
  },
  computed: {
    // Computed property para controlar o estilo do dropdown
    dropdownStyle() {
      return this.dropdownVisible
        ? { display: "block", position: "absolute", zIndex: 9999 }
        : { display: "none" };
    },
  },
  methods: {
    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
      console.log("cliquei no filtro. dropdown visible?", this.dropdownVisible)
    },
    applyFilter(filter) {
      switch (filter) {
        case 'last_quarter':
          this.selectedFilterText = "Último Trimestre";
          this.showCustomDates = false;
          this.$emit('filter-changed', 'last_quarter');
          

          break;
        case 'last_year':
          this.selectedFilterText = "Último ano";
          this.showCustomDates = false;
          this.$emit('filter-changed', 'last_year');

          break;
        case 'personalizado':
          if(this.startDate !== "" && this.endDate !== ""){
            console.log("data de inicio: ", this.startDate, "data de fim:  ", this.endDate);
            const startDateMillis = new Date(this.startDate).getTime();
            const endDateMillis = new Date(this.endDate).getTime();

            this.$emit('filter-changed', 'personalizado', startDateMillis, endDateMillis);

          }
          break;
      }
      this.dropdownVisible = false;
      //this.$emit("filter-changed", { filter });
    },
    showDateInputs() {
      this.showCustomDates = true;
      this.selectedFilterText = "Personalizado";
      this.dropdownVisible = false;
    },
    applyCustomFilter() {
      if (this.startDate && this.endDate) {
        this.$emit("filter-changed", { startDate: this.startDate, endDate: this.endDate });
        this.showCustomDates = false;
      } else {
        alert("Por favor, selecione ambas as datas.");
      }
    },
  },
};
</script>

<style scoped>
.chart-filter {
  height: 50px;
  background-color: #f8f9fa; /* Cor mais suave para o fundo */
}

.btn {
  z-index: 10;
}
</style>
