<template>
  <div class="ajustes-estoque-page">
    <BarraSuperior></BarraSuperior>
    <Drawer></Drawer>
    <div class="content">
      <div class="header-container">
        <h1>Ajuste Manual de Estoque</h1>
        <BackButton :route="'/Estoque'"></BackButton>
      </div>

      <!-- Formulário de Ajuste -->
      <div class="card mt-4">
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <!-- Seletor de Produto -->
            <div class="form-group">
              <label for="produto">Buscar Produto</label>
              <div v-if="!produto">
                <input
                  type="text"
                  v-model="busca"
                  class="form-control"
                  placeholder="Digite para buscar um produto"
                />
                <ul class="produto-lista mt-2" v-if="produtosFiltrados.length > 0">
                  <li
                    v-for="item in produtosFiltrados"
                    :key="item.id"
                    @click="selecionarProduto(item)"
                    class="produto-item"
                  >
                    {{ item.nome }}
                  </li>
                </ul>
              </div>
              <div v-else>
                <input
                  type="text"
                  :value="produto.nome"
                  class="form-control"
                  disabled
                />
                <button
                  type="button"
                  class="btn btn-link text-danger mt-2 p-0"
                  @click="limparProdutoSelecionado"
                >
                  Alterar Produto
                </button>
              </div>
            </div>

            <!-- Campo de Quantidade -->
            <div class="form-group mt-3">
              <label for="quantidade">Quantidade a Ajustar</label>
              <input v-model="quantidade" type="number" class="form-control" />
            </div>

            <!-- Tipo de Ajuste -->
            <div class="form-group mt-3">
              <label for="tipo">Tipo de Ajuste</label>
              <select v-model="tipo" class="form-control">
                <option value="entrada">Entrada</option>
                <option value="saida">Saída</option>
              </select>
            </div>

            <!-- Botão de Submissão -->
            <button type="submit" class="custom-button mt-3">
              Confirmar Ajuste
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import BackButton from "./BackButton.vue";

export default {
  components: { Drawer, BarraSuperior, BackButton },
  data() {
    return {
      busca: "",
      produto: null,
      quantidade: 0,
      tipo: "entrada",
      produtos: [
        { id: 1, nome: "Produto 1" },
        { id: 2, nome: "Produto 2" },
        { id: 3, nome: "Produto 3" },
        { id: 4, nome: "Produto 4" },
      ],
    };
  },
  computed: {
    produtosFiltrados() {
      if (!this.busca) return [];
      return this.produtos.filter((item) =>
        item.nome.toLowerCase().includes(this.busca.toLowerCase())
      );
    },
  },
  methods: {
    selecionarProduto(item) {
      this.produto = item; // Define o produto selecionado
      this.busca = ""; // Limpa o texto da busca
    },
    limparProdutoSelecionado() {
      this.produto = null; // Limpa o produto selecionado
    },
    handleSubmit() {
      if (!this.produto) {
        alert("Por favor, selecione um produto.");
        return;
      }
      if (this.quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida.");
        return;
      }
      console.log(
        `Ajustando estoque do ${this.produto.nome}, Quantidade: ${this.quantidade}, Tipo: ${this.tipo}`
      );
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

.custom-button {
  background-color: #4796bd;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 15px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-family: "Lato", sans-serif;
}

.custom-button:hover {
  background-color: rgb(255, 221, 27);
  transform: scale(1.05);
  color: #333333;
}

.produto-lista {
  list-style: none;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  max-height: 150px;
  overflow-y: auto;
}

.produto-item {
  padding: 10px;
  cursor: pointer;
}

.produto-item:hover {
  background-color: #f0f0f0;
}
</style>
