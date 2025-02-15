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
              placeholder="Quantidade"
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

          <div class="form-group">
            <input
              type="text"
              id="productAuthor"
              v-model="product.author"
              class="form-control"
              placeholder="Autor"
            />
          </div>

          <div class="form-group">
            <input
              type="text"
              id="productPublisher"
              v-model="product.publisher"
              class="form-control"
              placeholder="Editora"
            />
          </div>

          <div class="form-group">
            <input
              type="number"
              id="productPages"
              v-model="product.pages"
              class="form-control"
              placeholder="Número de páginas"
            />
          </div>

          <div class="form-group">
            <label for="bookCover">Capa do Livro</label>
            <input
              type="file"
              id="bookCover"
              class="form-control"
              accept="image/*"
              @change="handleFileUpload"
            />
          </div>

          <!-- Exibir pré-visualização da imagem -->
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Pré-visualização da capa do livro" class="img-thumbnail"/>
          </div>

          <!-- Botão de adicionar Produto -->
          <div class="container-submit-button">
            <button type="submit" class="btn btn-primary add-product-button"
            @click="adicionarProduto">
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
import axios from "axios";

export default {
  components: { Drawer, BarraSuperior },
  data() {
    return {
      product: {
        name: "",
        stock: "",
        price: "",
        category: "",
        description: "",
        author: "",
        publisher: "",
        pages: "",
        bookCover: null, 
      },
      previewImage: null, // Para armazenar a URL da pré-visualização
    };
  },
  methods: {
    async adicionarProduto(){
      try{
        const formData = new FormData();

        // Adiciona a imagem ao formData, se houver
        if(this.product.bookCover){
          formData.append("file", this.product.bookCover);
        }

        // Tenta fazer o upload da imagem
        const response = await axios.post('http://localhost:8099/makeProductImageUrl', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });

        console.log("Tentando gerar o url da imagem:", response);


        // Se a imagem foi enviada com sucesso, a URL será retornada
        const imageUrl = response.data.imageUrl;

        // Cria o novo produto com a URL da imagem
        const newProduct = {
          ...this.product,
          bookCover: imageUrl,
          id: "",
          createdAt: Date.now()
        };

        console.log("Vou salvar o seguinte produto:", newProduct);


        // Agora envia o produto para o backend
        await axios.post('http://localhost:8099/saveNewBook', newProduct);

        alert("Produto adicionado com sucesso");

      }catch(error){
        console.error("Erro ao adicionar produto:", error);
        alert("Falha ao adicionar o produto. Tente novamente.");

      }
    },
    handleFileUpload(event){
      const file = event.target.files[0];

      if(file){
        this.product.bookCover = file;

        // Criar uma URL temporária para a imagem
        this.previewImage = URL.createObjectURL(file);
      }
    }
  },
};
</script>

<style scoped>
.content {
  margin-top: 20px;
  margin-left: 270px;
  padding: 20px;
  overflow-y: auto;
  width: calc(100% - 270px);
}

.form-container {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.left-column {
  flex: 1;
  padding: 10px;
}

.right-column {
  flex: 2;
  padding: 10px;
}

.form-group {
  margin-bottom: 15px;
}

.form-control {
  width: 60%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 8px;
  font-family: "Lato", sans-serif;
}

.add-product-button {
  color: #4796bd;
  border-color: #4796bd;
  background-color: white;
  border-width: 2px;
  padding: 10px 20px;
  font-family: "Lato", sans-serif;
}

.add-product-button:hover {
  background-color: #4796bd;
  color: white;
  border-color: #4796bd;
}

.produto-text {
  font-size: 24px;
  font-weight: bold;
  font-family: "Lato", sans-serif;
  color: #495d69;
  display: flex;
  justify-content: flex-start;
}

.container-submit-button {
  width: 60%;
  display: flex;
  justify-content: center;
}

.image-preview img{
  max-width: 200px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
