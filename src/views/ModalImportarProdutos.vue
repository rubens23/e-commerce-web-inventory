<template>
    <!-- Modal de Importação -->
    <div v-if="mostrar"
      class="modal-backdrop"
    >
    <div class="modal">
        <div class="modal-header">
            <h5>Importar Dados</h5>
            <button type="button" class="btn-close" @click="fecharImportarModal"></button>
        </div>
        <div class="modal-body">
            <p>Escolha um arquivo para importar:</p>
            <input type="file" @change="processarArquivo" accept=".json, .csv, .xlsx"/>
        </div>
        <div class="modal-footer">
            <button class="btn btn-secondary" @click="fecharImportarModal">Cancelar</button>
            <button class="btn btn-primary" @click="confirmarImportacao">Importar</button>
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
    data(){
        return {
            mostrarImportarModal: false,
            arquivoSelecionado: null,
        };
    },
    methods: {
        abrirImportarModal(){
            this.mostrarImportarModal = true;

        },
        fecharImportarModal(){
            this.mostrarImportarModal = false;
            this.arquivoSelecionado = null;

        },
        processarArquivo(event){
            this.arquivoSelecionado = event.target.files[0];
        },
        confirmarImportacao(){
            if(!this.arquivoSelecionado){
                alert('Por favor, selecione um arquivo antes de importar.');
                return;
            }

            console.log('Arquivo selecionado:', this.arquivoSelecionado)
            this.fecharImportarModal();
        }
    }
}
</script>


<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fundo semi-transparente */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1040; /* Certifique-se de que está acima dos outros elementos */
}

.modal {
  background-color: #fff; /* Cor de fundo do modal */
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  width: 90%;
  z-index: 1050; /* Deve estar acima do backdrop */
}

.modal-header, .modal-body, .modal-footer {
  padding: 16px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ddd;
}

.modal-body {
  padding-top: 8px;
  padding-bottom: 8px;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
  border-top: 1px solid #ddd;
}

.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
}

.d-flex.gap-3 button {
  margin: 0;
}




</style>
