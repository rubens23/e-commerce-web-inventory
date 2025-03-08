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
          <p>Tem certeza que deseja remover o administrador?</p>

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
import api from "../api/axiosCustomConfig";



export default {
  components: { Drawer, BarraSuperior, BackButton },
  data() {
    return {
      adminId: "",
      senha: ""
    };
  },
  created(){
     const adminId = this.$route.params.id;

    if(adminId){
      this.adminId = adminId;

    }else{
      console.error("ID do administrador não encontrado nos parâmetros da rota");

    }
  },
  methods: {
    async confirmarRemocao() {
      if (!this.senha) {
        alert("Por favor, digite sua senha para confirmar.");
        return;
      }
      try {
        // Chamar a rota de remoção de administrador
        const response = await api.delete(`/removeAdmin/${this.adminId}`, {
          data: {
            senha: this.senha
          }
        });

        if (response.status === 200) {
          alert('Administrador removido com sucesso!');
          this.$router.push('/Usuarios'); // Redireciona para a página de usuários
        } else {
          alert('Erro ao remover administrador');
          console.log('Erro ao remover administrador: ' + response.data.message);
        }
      } catch (error) {
        console.error(error);
        alert('Erro ao remover administrador: ' + error.response?.data?.message || 'Erro inesperado');
      }
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