<template>
  <div class="remover-administrador-page">
    <BarraSuperior></BarraSuperior>
    <Drawer></Drawer>

    <div class="content container-fluid">
        <div class="header-container">
        <h1>Remover Administrador</h1>
        <BackButton :route="'/Usuarios'"></BackButton>
      </div>

      <div class="card shadow-sm border-0">
        <div class="card-body text-center">
          <p>Tem certeza que deseja remover <strong>{{ administrador.nome }}</strong>?</p>

          <div class="mb-3">
            <label for="senha" class="form-label">Digite sua senha para confirmar</label>
            <input
              type="password"
              id="senha"
              v-model="senha"
              class="form-control"
            />
          </div>

          <div class="mt-3">
            <button class="btn btn-danger me-2" @click="confirmarRemocao">Confirmar Remoção</button>
            <button class="btn btn-secondary" @click="voltar">Cancelar</button>
          </div>
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
        nome: "Admin 1"
      },
      senha: ""
    };
  },
  methods: {
    confirmarRemocao() {
      if (!this.senha) {
        alert("Por favor, digite sua senha para confirmar.");
        return;
      }
      console.log("Administrador removido:", this.administrador.id);
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

.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>