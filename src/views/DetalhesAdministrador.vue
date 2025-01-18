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
          <p><strong>Nome:</strong> {{ administrador.nome }}</p>
          <p><strong>E-mail:</strong> {{ administrador.email }}</p>
          <p><strong>Status:</strong> {{ administrador.status }}</p>
          <p><strong>Data de Criação:</strong> {{ administrador.dataCriacao }}</p>
          <p><strong>Permissões:</strong> {{ administrador.permissoes.join(", ") }}</p>

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
        status: "Ativo",
        dataCriacao: "2024-01-01",
        permissoes: ["Gerenciar Usuários", "Visualizar Relatórios"]
      }
    };
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