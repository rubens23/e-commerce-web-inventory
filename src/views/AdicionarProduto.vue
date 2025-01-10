<template>
  <div class="adicionar-produto-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>
    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo da página -->
    <div class="content">
   

      <div class="form-container">
        <!-- Divisão horizontal -->
        <div class="left-column">
          <p class="produto-text">Produto</p>
        </div>

        <div class="right-column">
          <!-- Inputs para adicionar o Produto -->
          <div class="form-group">
            <input
              type="text"
              id="productName"
              v-model="product.name"
              class="form-control"
              placeholder="Nome do produto"
            />
          </div>

          <div class="form-group">
            <input
              type="number"
              id="productStock"
              v-model="product.stock"
              class="form-control"
              placeholder="Quantidade em estoque"
            />
          </div>

          <div class="form-group">
            <input
              type="number"
              id="productPrice"
              v-model="product.price"
              class="form-control"
              placeholder="Preço do produto"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              id="productCategory"
              v-model="product.category"
              class="form-control"
              placeholder="Categoria do produto"
            />
          </div>

          <div class="form-group">
            <textarea
              id="productDescription"
              v-model="product.description"
              class="form-control"
              placeholder="Descrição do produto"
            ></textarea>
          </div>

          <!-- Botão de adicionar Produto -->
        <div class="container-submit-button">
          <button type="submit" class="btn btn-primary add-product-button">
            <i class="fas fa-plus"></i> Adicionar Produto
          </button>
        </div>
        </div>
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
      product: {
        name: "",
        stock: 0,
        price: 0,
        category: "",
        description: "",
      },
    };
  },
  methods: {
    adicionarProduto() {
      console.log("Produto adicionado", this.product);
    },
  },
};
</script>

<style scoped>
.content{
    margin-top: 20px;
    margin-left: 270px;
    padding: 20px;
    overflow-y: auto;
    width: calc(100% - 270px);

}



.form-container{
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
}

.left-column{
    flex: 1;
    padding: 10px;
}

.right-column{
    flex: 2;
    padding: 10px;
}

.form-group{
    margin-bottom: 15px;
}

.form-control{
    width: 60%;
    padding: 10px;
    margin-top: 5px;
    border-radius: 8px;
    background-color: #828282; 
    font-family: 'Lato', sans-serif;


}

.add-product-button{
      color: #4796BD;
      border-color: #4796BD;
      background-color: white;
      border-width: 2px;
      padding: 10px 20px;
        font-family: 'Lato', sans-serif;


}

.add-product-button:hover {
  background-color: #4796BD;
  color: white;
  border-color: #4796BD;
}

.produto-text {
  font-size: 24px;
  font-weight: bold;
  font-family: 'Lato', sans-serif;
  color: #495D69;
  display: flex;
  justify-content: flex-start;


}

.container-submit-button{
    width: 60%;
    display: flex;
    justify-content: center;
}



</style>
