<template>
  <div class="detalhes-administrador-page">
    <BarraSuperior></BarraSuperior>
    <Drawer></Drawer>

    <div class="content container-fluid">
        <div class="header-container">
        <h1>Detalhes do Administrador</h1>
        <BackButton :route="'/Usuarios'"></BackButton>
      </div>

      <div class="card shadow-sm border-0">
        <div class="card-body">
          <h5 class="card-title">Informações do Administrador</h5>
          <p><strong>Nome:</strong> {{ administrador.name }}</p>
          <p><strong>E-mail:</strong> {{ administrador.email }}</p>
          <p><strong>Status:</strong> {{ administrador.status ? 'Ativo' : 'Inativo' }}</p>
          <p><strong>Data de Criação:</strong> {{ administrador.creationDate }}</p>
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
      administrador: null
    };
  },
  created(){
    const adminId = this.$route.params.id;

    if(adminId){
      this.fetchAdminDetails(adminId);

    }else{
      console.error("ID do administrador não encontrado nos parâmetros da rota");

    }

  },
  methods: {
    voltar() {
      // Lógica para voltar à tela anterior
      this.$router.go(-1);
    },
    editarAdministrador(id) {
      // Navega para a tela de edição
      this.$router.push(`/administradores/${id}/editar`);
    },
    fechar() {
      // Lógica para fechar o modal ou sair da tela
      console.log("Fechar detalhes");
    },
    async fetchAdminDetails(adminId){
      try{
        const response = await api.get(
          `http://localhost:8099/getAdminById/${adminId}`
        );

        if(response.data){
          this.administrador = response.data;
          console.log("obtive o admin", this.administrador);
        }

      }catch(error){
        console.log("Erro ao buscar administrador: ", error);
      }
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