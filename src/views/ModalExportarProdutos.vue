<template>
  <!-- Modal de Exportação -->
  <div v-if="mostrar" class="modal-backdrop">
    <div class="modal">
      <div class="modal-header">
        <h5>Exportar Dados</h5>
        <button
          type="button"
          class="btn-close"
          @click="fecharExportarModal"
        ></button>
      </div>
      <div class="modal-body">
        <p>Escolha o formato para exportar os dados:</p>
        <div class="d-flex gap-3">
          <button class="btn btn-outline-primary" @click="exportar('json')">
            Exportar como JSON
          </button>
          <button class="btn btn-outline-success" @click="exportar('csv')">
            Exportar como CSV
          </button>
          <button class="btn btn-outline-warning" @click="exportar('excel')">
            Exportar como Excel
          </button>
        </div>
      </div>
      <div class="modal-footer">
        <button class="btn btn-secondary" @click="fecharExportarModal">
          Cancelar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    props: {
        mostrar: {
            type: Boolean,
            required: true,
        },
    },
  data() {
    return {
      mostrarExportarModal: false,
    };
  },
  methods: {
    abrirExportarModal() {
      this.mostrarExportarModal = true;
    },
    fecharExportarModal() {
      this.mostrarExportarModal = false;
    },
    exportar(formato) {
      if (formato === "json") {
        this.exportarComoJSON();
      } else if (formato === "csv") {
        this.exportarComoCSV();
      } else if (formato === "excel") {
        this.exportarComoExcel();
      }
      this.fecharExportarModal();
    },
    exportarComoJSON() {
      const dados = [{ id: 1, nome: "Produto A", preco: 100 }];
      const jsonString = JSON.stringify(dados, null, 2);
      this.baixarArquivo(
        jsonString,
        "dados_exportados.json",
        "application/json"
      );
    },
    exportarComoCSV() {
      const dados = [{ id: 1, nome: "Produto A", preco: 100 }];
      const csv =
        "ID,Nome,Preço\n" +
        dados.map((d) => `${d.id},${d.nome},${d.preco}`).join("\n");
      this.baixarArquivo(csv, "dados_exportados.csv", "text/csv");
    },
    exportarComoExcel() {
      console.log("Exportação para Excel ainda não implementada.");
    },
    baixarArquivo(conteudo, nomeArquivo, tipo) {
      const blob = new Blob([conteudo], { type: tipo });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = nomeArquivo;
      link.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>


</style>
