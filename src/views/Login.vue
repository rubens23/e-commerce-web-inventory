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
                    <h2 class="text-center mb-4">Login</h2>
                    <form>
                        <div class="mb-3">
                            <input type="email" class="form-control" id="email" placeholder="Digite seu email">
                        </div>
                        <div class="mb-5">
                            <input type="senha" class="form-control" id="senha" placeholder="Digite sua senha">
                        </div>
                        <div class="d-grid mb-4">
                            <button type="submit" class="btn btn-primary" style="background-color: #4796BD; 
                            color: white;
                            border: none;
                            border-radius: 16px;"
                            v-on:click="submitLogin">Login</button>
                        </div>

                        <div class="text-center">
                            <a href="#" class="d-block mb-2">Esqueceu a senha?</a>
                            <a href="#" class="d-block">Novo usuário? Cadastre-se!</a>
                        </div>
                        
                    </form>
                </div>



            </div>
       </div>
    </div>
</template>

<script>
import BarraSuperior from './BarraSuperior.vue'
export default{
  components: { BarraSuperior },
    name: 'Login',
    methods: {
        submitLogin(){
            //direciona para a home
            this.$router.push('/home')
        }
    }
}
</script>