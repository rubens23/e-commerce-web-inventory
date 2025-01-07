<template>
    <div class="home-page">
        <!--Barra superior-->
        <BarraSuperior></BarraSuperior>
        <!-- Drawer -->
        <Drawer></Drawer>
      
    </div>

</template>


<script>
import Drawer from './Drawer.vue'
import BarraSuperior from './BarraSuperior.vue'


export default{
  components: { Drawer, BarraSuperior },
    name: 'Home',
    methods: {
        
    }
}
</script>





