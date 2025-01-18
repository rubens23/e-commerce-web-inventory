<template>
  <div class="usuarios-page">
    <BarraSuperior></BarraSuperior>
    <Drawer></Drawer>

    <div class="content container-fluid">
      <h1>Gerenciamento de Administradores</h1>

      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body">
          <h5 class="card-title">Administradores Cadastrados</h5>

          <!-- Usando o novo componente TableWithActions -->
          <TableWithActions :items="administradores" 
                           :columns="columns" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";
import TableWithActions from "./TableWithActions.vue"; // Importando o novo componente

export default {
  components: { Drawer, BarraSuperior, TableWithActions },
  name: "UsuariosPage",
  data() {
    return {
      administradores: [
        { id: 1, nome: "Admin 1", email: "admin1@exemplo.com", status: "Ativo" },
        { id: 2, nome: "Admin 2", email: "admin2@exemplo.com", status: "Inativo" }
      ],
      columns: [
        { label: "Nome", key: "nome" },
        { label: "E-mail", key: "email" },
        { label: "Status", key: "status" },
        {
          label: "Ações", key: "actions", actions: [
            {
              iconClass: "fas fa-info-circle",
              method: this.verDetalhes
            },
            {
              iconClass: "fas fa-edit",
              method: this.editarAdministrador
            },
            {
              iconClass: "fas fa-trash-alt",
              method: this.removerAdministrador
            }
          ]
        }
      ]
    };
  },
  methods: {
    verDetalhes(admin) {
      console.log("Ver detalhes do administrador", admin);
      this.$router.push({ name: "DetalhesUsuario", params: { id: admin.id } });

    },
    editarAdministrador(admin) {
      console.log("Editar administrador", admin);
       this.$router.push({ name: "EditarUsuario", params: { id: admin.id } });
    },
    removerAdministrador(admin) {
             this.$router.push({ name: "RemoverUsuario", params: { id: admin.id } });

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
</style>
