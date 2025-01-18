<template>
  <div class="resolucao-page">
    <!-- Barra Superior -->
    <BarraSuperior></BarraSuperior>

    <!-- Drawer -->
    <Drawer></Drawer>

    <!-- Conteúdo Principal -->
    <div class="content container-fluid">
      <h1>Resolução de Problemas</h1>

      <!-- Filtro de Data -->
      <div class="row mb-4">
        <div class="col-md-4">
          <label for="data-inicial" class="form-label">Data Inicial</label>
          <input type="date" id="data-inicial" v-model="filtroData.inicial" class="form-control" />
        </div>
        <div class="col-md-4">
          <label for="data-final" class="form-label">Data Final</label>
          <input type="date" id="data-final" v-model="filtroData.final" class="form-control" />
        </div>
        <div class="col-md-4">
          <button @click="aplicarFiltro" class="custom-button w-100 mt-4">Aplicar Filtro</button>
        </div>
      </div>

      <!-- Formulário para Resolver Problemas -->
      <div class="card shadow-sm border-0 mb-4">
        <div class="card-body">
          <h5 class="card-title">Detalhes do Problema</h5>
          <form @submit.prevent="resolverProblema">
            <div class="mb-3">
              <label for="problema" class="form-label">Descrição do Problema</label>
              <textarea class="form-control" id="problema" v-model="problemaDescricao" rows="4" placeholder="Descreva o problema do pagamento"></textarea>
            </div>

            <div class="mb-3">
              <label for="solucao" class="form-label">Solução Proposta</label>
              <textarea class="form-control" id="solucao" v-model="solucaoDescricao" rows="4" placeholder="Descreva a solução proposta"></textarea>
            </div>

            <button type="submit" class="custom-button">Resolver Pagamento</button>
          </form>
        </div>
      </div>

      <!-- Lista de Problemas Registrados -->
      <div v-if="problemas.length > 0">
        <ul class="list-group">
          <li v-for="problema in problemas" :key="problema.id" class="list-group-item">
            <strong>Problema:</strong> {{ problema.descricao }} <br />
            <strong>Status:</strong> {{ problema.status }} <br />
            <strong>Solução:</strong> {{ problema.solucao || "Não resolvido" }} <br />
            <strong>Data:</strong> {{ problema.data }}
          </li>
        </ul>
      </div>

      <!-- Carregamento Dinâmico -->
      <div v-if="loading" class="text-center mt-4">
        <span>Carregando...</span>
      </div>

      <!-- Sem problemas -->
      <div v-else-if="!loading && problemas.length === 0" class="text-center mt-4">
        <span>Nenhum problema encontrado.</span>
      </div>

      <!-- Botão Carregar Mais -->
      <div v-if="!loading && problemas.length > 0" class="mt-4">
        <button v-if="hasMoreData" @click="carregarMaisProblemas" class="custom-button w-100">Carregar Mais</button>
      </div>
    </div>
  </div>
</template>

<script>
import Drawer from "./Drawer.vue";
import BarraSuperior from "./BarraSuperior.vue";

export default {
  components: { Drawer, BarraSuperior },
  name: "ResolucaoProblema",
  data() {
    return {
      problemaDescricao: "",
      solucaoDescricao: "",
      filtroData: {
        inicial: "",
        final: "",
      },
      problemas: [],
      loading: false,
      hasMoreData: true,
      pagina: 1,
      problemasPorPagina: 10,
    };
  },
  methods: {
    aplicarFiltro() {
      this.pagina = 1; // Resetar a página ao aplicar o filtro
      this.carregarProblemas();
    },
    async carregarProblemas() {
      this.loading = true;
      const params = {
        dataInicial: this.filtroData.inicial,
        dataFinal: this.filtroData.final,
        pagina: this.pagina,
        limite: this.problemasPorPagina,
      };

      try {
        // Simulando chamada de API
        const response = await this.fetchProblemas(params);

        if (this.pagina === 1) {
          this.problemas = response.problemas;
        } else {
          this.problemas = [...this.problemas, ...response.problemas];
        }

        this.hasMoreData = response.problemas.length === this.problemasPorPagina;
        this.pagina += 1;
      } catch (error) {
        console.error("Erro ao carregar problemas:", error);
      } finally {
        this.loading = false;
      }
    },
    fetchProblemas(params) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const problemas = this.mockProblemas();
          resolve({
            problemas: problemas.slice(
              (params.pagina - 1) * params.limite,
              params.pagina * params.limite
            ),
          });
        }, 1000);
      });
    },
    mockProblemas() {
      return Array.from({ length: 100 }, (_, i) => ({
        id: i + 1,
        descricao: `Problema ${i + 1}`,
        status: i % 2 === 0 ? "Aprovado" : "Pendente",
        solucao: i % 3 === 0 ? "Resolvido" : null,
        data: `2025-01-${i + 1}`,
      }));
    },
    resolverProblema() {
      console.log("Problema resolvido com a solução: ", this.solucaoDescricao);
      // Aqui você pode integrar com a API para atualizar o pagamento
    },
    carregarMaisProblemas() {
      this.carregarProblemas();
    },
  },
  mounted() {
    this.carregarProblemas();
  },
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
}

.custom-button:hover {
  background-color: rgb(255, 221, 27);
  transform: scale(1.05);
  color: #333333;
}

.list-group-item {
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 10px;
}

.text-center {
  text-align: center;
}
</style>
