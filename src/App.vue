<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>

    <h1>Hello App!</h1>
  <p>
    <strong>Current route path:</strong> {{ $route.fullPath }}
  </p>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Go to Login</RouterLink> 
        <RouterLink to="/login">Login</RouterLink>        <RouterLink to="/register">Register</RouterLink> <!-- Adicionei a rota de Register -->
      </nav>
    </div>
  </header>

  <RouterView /> 
</template>

