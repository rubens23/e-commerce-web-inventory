<template>
    <div class="home-page">
        <!--Barra superior-->
        <nav class="navbar" style="background-color: #4796BD;">
            <div class="container-fluid">
                <img src="/src/logo.png" alt="Logo" class="logo" style=" height: 40px; width: 80px;">
            </div>
        </nav>
        <!-- Drawer -->
        <nav class="drawer">
            <ul class="list-unstyled p-3">
                <li class="drawer-item">
                    <i class="bi bi-house-door-fill me-2"></i>
                    <span class="drawer-text">Home</span>
                </li>
                 <li class="drawer-item">
                    <i class="bi bi-box-fill me-2"></i>
                    <span class="drawer-text">Produtos</span>
                </li>
                 <li class="drawer-item">
                    <i class="bi bi-file-earmark-check-fill me-2"></i>
                    <span class="drawer-text">Pedidos</span>
                </li>
                 <li class="drawer-item">
                    <i class="bi bi-graph-up me-2"></i>
                    <span class="drawer-text">Vendas</span>
                </li>
            </ul>
        </nav>
    </div>

</template>


<script>
export default{
    name: 'Home',
    methods: {
        
    }
}
</script>

<style scoped>
.navbar{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1050;
}


.drawer{
    position: fixed;
    top: 56px;
    left: 0;
    height: calc(100vh - 56px);
    width: 240px;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
    z-index: 1000;


}

.drawer-item{
    display: flex;
    align-items: center;
    padding: 10px;
    font-size: 24px;
    cursor: pointer;

}

.drawer-item i{
    font-size: 24px;
    color: #4796BD;

}

.drawer-item:hover{
    background-color: rgba(0,0,0, 0.1);
}

.drawer-text{
    margin-left: 3px;
    transition: color 0.3s ease;

}

</style>




