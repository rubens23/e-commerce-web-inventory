<template>
  <div class="editar-administrador-page">
    <BarraSuperior></BarraSuperior>
    <Drawer></Drawer>

    <div class="content container-fluid">
        <div class="header-container">
        <h1>Editar Administrador</h1>
        <BackButton :route="'/Usuarios'"></BackButton>
      </div>

      <div class="card shadow-sm border-0">
        <div class="card-body">
          <form @submit.prevent="salvarAlteracoes">
            <div class="mb-3">
              <label for="nome" class="form-label">Nome</label>
              <input
                type="text"
                id="nome"
                v-model="administrador.nome"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="email" class="form-label">E-mail</label>
              <input
                type="email"
                id="email"
                v-model="administrador.email"
                class="form-control"
              />
            </div>
            <div class="mb-3">
              <label for="status" class="form-label">Status</label>
              <select id="status" v-model="administrador.status" class="form-control">
                <option value="Ativo">Ativo</option>
                <option value="Inativo">Inativo</option>
              </select>
            </div>

            <div class="mt-3">
              <button type="submit" class="custom-button me-2">Salvar Alterações</button>
            </div>
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
      administrador: {
        id: 1,
        nome: "Admin 1",
        email: "admin1@exemplo.com",
        status: "Ativo"
      }
    };
  },
  methods: {
    salvarAlteracoes() {
      // Lógica para salvar alterações
      console.log("Alterações salvas:", this.administrador);
    },
    voltar() {
      // Lógica para voltar à tela anterior
      this.$router.go(-1);
    }
  }
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

.card {
  border-radius: 10px;
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

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>