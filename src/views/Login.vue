<template>
    <div class="login-page">
        <!--Barra superior-->
        <BarraSuperior></BarraSuperior>
       <!-- Conteúdo Principal-->
       <div class="container vh-100 d-flex align-items-center justify-content-center">
            <div class="row w-100">
                <!-- Imagem à esquerda-->
                <div class="col-md-6 d-none d-md-flex justify-content-center align-items-center">
                    <img src="/src/img_login.png" alt="Controle de Vendas" class="img-fluid" style="max-height: 800px;">
                </div>

                <!-- Formulário de Login -->
               <div class="col-md-6">
                    <h2 class="text-center mb-4">{{ tituloPagina }}</h2>
                    <form @submit.prevent="submitForm">
                        <!-- Email -->
                        <div class="mb-3" v-if="mode !== 'forgotPassword'">
                            <input type="email" class="form-control" v-model="email" placeholder="Digite seu email" required>
                        </div>

                        <!-- Nome (Somente para Cadastro) -->
                        <div class="mb-3" v-if="mode === 'register'">
                            <input type="text" class="form-control" v-model="name" placeholder="Digite seu nome" required>
                        </div>

                        <!-- Senha -->
                        <div class="mb-3" v-if="mode !== 'forgotPassword'">
                            <input type="password" class="form-control" v-model="password" placeholder="Digite sua senha" required>
                        </div>

                        <!-- Confirmar Senha (Somente para Cadastro) -->
                        <div class="mb-3" v-if="mode === 'register'">
                            <input type="password" class="form-control" v-model="confirmPassword" placeholder="Confirme sua senha" required>
                        </div>

                        <!-- Endereço (Somente para Cadastro) -->
                        <div v-if="mode === 'register'">
                            <h5 class="mt-4">Endereço</h5>
                            <div class="mb-3">
                                <input type="text" class="form-control" v-model="address.street" placeholder="Rua" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" v-model="address.city" placeholder="Cidade" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" v-model="address.state" placeholder="Estado" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" v-model="address.postalCode" placeholder="CEP" required>
                            </div>
                            <div class="mb-3">
                                <input type="text" class="form-control" v-model="address.country" placeholder="País" required>
                            </div>
                        </div>

                        <!-- Botão de ação -->
                        <div class="d-grid mb-4">
                            <button type="submit" class="btn btn-primary" style="background-color: #4796BD; color: white; border: none; border-radius: 16px;">
                                {{ textoBotao }}
                            </button>
                        </div>

                        <!-- Links alternativos -->
                        <div class="text-center">
                            <a href="#" class="d-block" v-if="mode === 'login'" @click="mode = 'forgotPassword'">Esqueceu a senha?</a>
                            <a href="#" class="d-block" v-if="mode === 'login'" @click="mode = 'register'">Novo usuário? Cadastre-se!</a>
                            <a href="#" class="d-block" v-if="mode !== 'login'" @click="mode = 'login'">Já tem uma conta? Faça login!</a>
                        </div>
                    </form>
                </div>



            </div>
       </div>
    </div>
</template>

<script>
import BarraSuperior from './BarraSuperior.vue';
import axios from "axios";

export default {
  components: { BarraSuperior },
  name: 'Login',
  data() {
    return {
      mode: 'login', // 'login', 'register' ou 'forgotPassword'
      email: '',
      password: '',
      confirmPassword: '', // Para validação no cadastro
      name: '',
      address: {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: '',
        userId: '',
        id: ''
      }
    };
  },
  computed: {
    tituloPagina() {
      return this.mode === 'login' ? "Login" :
             this.mode === 'register' ? 'Cadastrar' :
             "Recuperação de Senha";
    },
    textoBotao() {
      return this.mode === 'login' ? "Entrar" :
             this.mode === 'register' ? "Cadastrar" :
             "Resetar Senha";
    }
  },
  methods: {
    submitForm() {
      if (this.mode === 'login') {
        this.login();
      } else if (this.mode === 'register') {
        this.register();
      } else {
        this.forgotPassword();
      }
    },
    async login() {
      try{
        const response = await axios.post('http://localhost:8099/login', {
          email: this.email,
          password: this.password
        }, {
          withCredentials: true //Permite enviar e receber cookies junto com a requisição
        });

        if(response.status === 200){
          alert("Login bem-sucedido!");
          this.$router.push('/home');
        }else{
          alert("Erro no login");
        }

      }catch(error){
        console.error("Erro ao fazer login:", error);
        alert("Falha ao fazer login.");
      }
    },
    async register() {
      // Validação de senha
      if (this.password !== this.confirmPassword) {
        alert("As senhas não coincidem!");
        return;
      }

      // Enviar os dados para o backend
      const userData = {
        name: this.name,
        email: this.email,
        password: this.password, // O backend deve hashear antes de armazenar
        addresses: [this.address]
      };

      
      try{
        const response = await axios.post("http://localhost:8099/registerNewUser", userData, {
            headers: {
                "Content-Type": "application/json", 
            }
        });

        // Verificar se o cadastro foi bem-sucedido
    if (response.status === 201 || response.status === 200) {
      alert("Cadastro realizado com sucesso!");
      this.$router.push("/"); 
    } else {
      alert("Erro ao registrar administrador..");
    }

        

      }catch(error){
        console.error("Erro ao registrar novo administrador: ", error);
        alert("Falha ao registrar novo administrador..");
      }
    


    },
    forgotPassword() {
      alert("Função de recuperação de senha ainda não implementada.");
    }
  }
};
</script>