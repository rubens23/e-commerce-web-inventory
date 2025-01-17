<template>
    <button class="back-button" @click="goBack">Voltar</button>

</template>

<style scoped>
.back-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}
</style>

<script>
export default {
    props: {
        route: {
            type: String,
            default: null,
        }
    },
  methods: {
    goBack(route) {
      if (this.route) {
        this.$router.push(this.route); 
      } else {
        this.$router.go(-1); 
      }
    },
  },
};
</script>
