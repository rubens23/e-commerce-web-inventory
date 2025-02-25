<template>
  <div class="produtos-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>
    <!-- Drawer -->
    <Drawer></Drawer>
    <!-- conteúdo da página -->
    <div class="content">
      <!-- container com titulo e botão alinhado à direita -->
      <div class="header-container">
        <h1>Produtos</h1>
        <!-- Botão de adicionar Produto -->
        <div class="mb-4" id="botoes-produto">
          <button
            type="submit"
            id="add-product-button"
            class="btn btn-primary"
            v-on:click="adicionarProduto"
          >
            Adicionar Produto
          </button>

          <!-- Botões de Importar e Exportar -->
          <!-- Botão de Importar -->
          <button
            type="button"
            id="import-button"
            class="btn btn-light"
            @click="abrirImportarModal"
          >
            <i class="bi bi-file-earmark-arrow-down-fill me-2"></i>
            Importar
          </button>

          <!-- Botão de Exportar -->
          <button
            type="button"
            id="export-button"
            class="btn btn-light"
            @click="abrirExportarModal"
          >
            <i class="bi bi-file-earmark-arrow-up-fill me-2"></i>
            Exportar
          </button>
        </div>
      </div>

      <!-- Tabela com produtos --->
      <Table :items="items" :columns="columns" @item-excluido="removerProdutoLocalmente"
      @editar-item="editarProduto"/>

      <div>
      <ModalImportarProdutos :mostrar="mostrarImportarModal" @close="mostrarImportarModal = false" />
      <ModalExportarProdutos :mostrar="mostrarExportarModal" @close="mostrarExportarModal = false" />
    </div>

       <div>
     
    </div>
    </div>
  </div>

  
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import Table from "./Table.vue";
import ModalImportarProdutos from "./ModalImportarProdutos.vue";
import ModalExportarProdutos from "./ModalExportarProdutos.vue";
import axios from "axios";

export default {
  components: { Drawer, BarraSuperior, Table,ModalImportarProdutos, ModalExportarProdutos },
  name: "Produtos",
  data() {
    return {
      items: null,
      columns: [
        { label: "Nome", key: "name" },
        { label: "Quantidade", key: "stock" },
        {
          label: "Preço",
          key: "price",
          format: (value) => `R$ ${value.toFixed(2)}`,
        },
        { label: "Autor", key: "author" },
        { label: "Páginas", key: "pages" },
        { label: "Categoria", key: "category" },
        { label: "Editora", key: "publisher" },
      ],

      mostrarImportarModal: false,
      mostrarExportarModal: false
    };
  },
  mounted(){
    this.fetchProdutos();
  },
  methods: {
    adicionarProduto() {
      this.$router.push({ name: "AdicionarProduto" });
    },
    editarProduto(item){
      console.log('estou aqui no metodo do clique de editar');
      console.log('aqui está o item que vai ser editado: ', item);
      this.$router.push({name: "EditarProduto", params: {id: item.id}});

    },
    abrirImportarModal() {
    console.log("estou no abrir importar modal")
    this.mostrarImportarModal = true; 
  },
  abrirExportarModal() {
    console.log("estou no abrir exportar modal")
    this.mostrarExportarModal = true; // Controle de exibição do modal
  },
  async removerProdutoLocalmente(item){
     const confirmacao = window.confirm(`Tem certeza que deseja excluir o produto "${item.name}"?`);

      if(!confirmacao){
        return;
      }

      try{
        await axios.delete(`http://localhost:8099/deleteBook/${item.id}`, {
          withCredentials: true
        });
        console.log(`Produto "${item.name}" excluído com sucesso.`);
        alert("Produto excluído com sucesso!")
        this.items = this.items.filter(item => item.id !== item.id)


      }catch(error){
        console.error("Erro ao excluir o produto:", error);
        alert("Erro ao excluir o produto. Tente novamente.");
      }
  },
  async fetchProdutos(){
    try{
      const response = await axios.get("http://localhost:8099/getBooks", {
          withCredentials: true
        });
      this.items = response.data;
      console.log("Produtos adquiridos com sucesso: ", this.items);


    }catch(error){
      console.log("Erro ao buscar produtos: ", error);
    }
  }
},
}
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
}

#botoes-produto {
  display: flex;
  flex-direction: row;
  gap: 10px;
  font-family: "Lato", sans-serif;
}

#add-product-button {
  background-color: #4796bd;
  color: white;
  border: none;
  font-size: 20px;
  border-radius: 20px;
  transition: background-color 0.3s, transform 0.3s ease;
}

#add-product-button:hover {
  background-color: rgb(255, 221, 27);
  transform: scale(1.05);
  color: #333333;
}

#import-button,
#export-button {
  background-color: #f8f9fa;
  color: #333;
  border: 1px solid #ccc;
  border-radius: 30px;
  font-size: 16px;
  padding: 10px 20px;
  transition: background-color 0.3s, transform 0.2s ease;
}

#import-button:hover,
#export-button:hover {
  background-color: #e2e6ea;
}

#import-button:active,
#export-button:active {
  transform: scale(0.98);
}
</style>


