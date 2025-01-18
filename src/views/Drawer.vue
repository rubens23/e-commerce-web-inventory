  <template>
    
  
  
  <nav class="drawer">
            <ul class="list-unstyled p-3">
                <li class="drawer-item" 
                  :class="{ active: selectedItem === 'Home' }"
                v-on:click="navigateTo('Home')">
                    <i class="bi bi-house-door-fill me-2"></i>
                    <span class="drawer-text">Home</span>
                </li>
                 <li class="drawer-item"
                  :class="{ active: selectedItem === 'Produtos' }"
                  v-on:click="navigateTo('Produtos')">
                    <i class="bi bi-box-fill me-2"></i>
                    <span class="drawer-text">Produtos</span>
                </li>
                 <li class="drawer-item"
                 :class="{ active: selectedItem === 'Pedidos' }"
                  v-on:click="navigateTo('Pedidos')">
                    <i class="bi bi-file-earmark-check-fill me-2"></i>
                    <span class="drawer-text">Pedidos</span>
                </li>
                 <li class="drawer-item"
                 :class="{ active: selectedItem === 'Vendas' }"
                  v-on:click="navigateTo('Vendas')">
                    <i class="bi bi-graph-up me-2"></i>
                    <span class="drawer-text">Vendas</span>
                </li>
                <li class="drawer-item"
                  :class="{ active: selectedItem === 'Estoque' }"
                 v-on:click="navigateTo('Estoque')">
                    <i class="bi bi-grid me-2"></i>
                    <span class="drawer-text">Estoque</span>
                </li>
                <li class="drawer-item"
                  :class="{ active: selectedItem === 'Pagamentos' }"
                 v-on:click="navigateTo('Pagamentos')">
                    <i class="bi bi-cash-stack me-2"></i>
                    <span class="drawer-text">Pagamentos</span>
                </li>
                <li class="drawer-item"
                  :class="{ active: selectedItem === 'Usuarios' }"
                 v-on:click="navigateTo('Usuarios')">
                    <i class="bi bi-person me-2"></i>
                    <span class="drawer-text">Usuários</span>
                </li>
            </ul>
        </nav>

        </template>

<script>
export default{
    name: 'Drawer',
    data(){
        return {
            selectedItem: "",
        };

    },
    methods: {
        navigateTo(routeName){
            console.log('Eu tenho que selecionar o item da drawer: ', routeName, 'selected item === routeName? ', this.selectedItem === routeName)
            this.selectedItem = routeName;
            this.$router.push({name: routeName})
        }
        
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

.drawer-item.active {
  background-color: rgb(255, 221, 27);
  color: #333333;
}

.drawer-item.active i {
  color: #333333;
}

.drawer-text{
    margin-left: 3px;
    transition: color 0.3s ease;

}

</style>
