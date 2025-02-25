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
            <img
              :src="previewImage"
              alt="Pré-visualização da capa do livro"
              class="img-thumbnail"
            />
          </div>

          <!-- Botão de adicionar Produto -->
          <div class="container-submit-button">
            <button
              type="submit"
              class="btn btn-primary add-product-button"
              @click="isEditing ? salvarAlteracoes() : adicionarProduto()"
            >
              <i class="fa" :class="isEditing ? 'fa-save' : 'fa-plus'"></i>
              {{ isEditing ? "Salvar Alterações" : "Adicionar Produto" }}
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
      isEditing: false,
    };
  },
  created() {
    const productId = this.$route.params.id;

    if (productId) {
      this.isEditing = true;
      this.fetchProduto(productId);
    } else {
      this.isEditing = false;
      console.error("ID do produto não encontrado nos parâmetros da rota");
    }
  },

  methods: {
    async adicionarProduto() {
      try {
        const formData = new FormData();

        // Adiciona a imagem ao formData, se houver
        if (this.product.bookCover) {
          formData.append("file", this.product.bookCover);
        }

        // Tenta fazer o upload da imagem
        const response = await axios.post(
          "http://localhost:8099/makeProductImageUrl", {
          withCredentials: true
        },
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log("Tentando gerar o url da imagem:", response);

        // Se a imagem foi enviada com sucesso, a URL será retornada
        const imageUrl = response.data.imageUrl;

        // Cria o novo produto com a URL da imagem
        const newProduct = {
          ...this.product,
          bookCover: imageUrl,
          id: "",
          createdAt: Date.now(),
        };

        console.log("Vou salvar o seguinte produto:", newProduct);

        // Agora envia o produto para o backend
        await axios.post("http://localhost:8099/saveNewBook", newProduct, {
          withCredentials: true
        });

        alert("Produto adicionado com sucesso");
      } catch (error) {
        console.error("Erro ao adicionar produto:", error);
        alert("Falha ao adicionar o produto. Tente novamente.");
      }
    },
    async salvarAlteracoes() {
      try {
        let imageUrl = this.product.bookCover;

        // Se o usuário selecionou uma nova imagem, faz o upload
        if (this.product.bookCover instanceof File) {
          const formData = new FormData();
          formData.append("file", this.product.bookCover);

          const imageResponse = await axios.post(
            "http://localhost:8099/makeProductImageUrl",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("Nova imagem enviada:", imageResponse);
          imageUrl = imageResponse.data.imageUrl;
        }

        // Cria o objeto atualizado do produto/livro
        const updatedBook = {
          id: this.product.id,
          name: this.product.name,
          description: this.product.description,
          price: this.product.price,
          stock: this.product.stock,
          category: this.product.category,
          author: this.product.author,
          publisher: this.product.publisher,
          pages: this.product.pages,
          bookCover: imageUrl, // Atualiza a imagem se necessário
          createdAt: this.product.createdAt, // Mantém a data de criação original
        };

        console.log("Enviando livro atualizado: ", updatedBook);

        await axios.put(`http://localhost:8099/updateBook/${this.product.id}`, updatedBook,  {
          withCredentials: true
        });

        alert("Livro atualizado com sucesso!");


      } catch (error) {
        console.error("Erro ao salvar alterações: ", error);
        alert("Falha ao atualizar o livro. Tente novamente.");
      }
    },
    async fetchProduto(productId) {
      try {
        const response = await axios.get(
          `http://localhost:8099/getBookById/${productId}`, {
          withCredentials: true
        }
        );

        if (response.data) {
          this.product = response.data;
          this.previewImage = this.product.bookCover;
          console.log("obtive a resposta", this.product);
        }
      } catch (error) {
        console.log("Erro ao buscar produto: ", error);
      }
    },
    handleFileUpload(event) {
      const file = event.target.files[0];

      if (file) {
        this.product.bookCover = file;

        // Criar uma URL temporária para a imagem
        this.previewImage = URL.createObjectURL(file);
      }
    },
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

.image-preview img {
  max-width: 200px;
  margin-top: 10px;
  border-radius: 5px;
}
</style>
