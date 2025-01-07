<template>
    <table class="table">
        <thead>
            <tr>
                <th>Nome</th>
                <th>Quantidade</th>
                <th>Preço</th>
                <th v-if="isBook">Autor</th>
                <th v-if="isBook">Páginas</th>
                <th v-if="isBook">Categoria</th>
                <th v-if="isBook">Editora</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in items" :key="index">
                <td>{{item.name}}</td>
                <td>{{item.stock}}</td>
                <td>{{item.price}}</td>
                <td v-if="isBook">{{ item.author }}</td>
                <td v-if="isBook">{{ item.pages }}</td>
                <td>{{ item.category }}</td>
                <td v-if="isBook">{{ item.publisher }}</td>

            </tr>
        </tbody>
    </table>
    
</template>

<script>
export default {
    name: 'Table',
    props: {
        items: Array,
        isBook: Boolean,
        isProduct: Boolean,
    }//se precisar da para adicionar um parametro filtro para iterar
    //e alterar sobre os itens antes de passar para view
    
}
</script>


<style scoped>
.table{
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
    
    border: 2px solid rgb(255, 221, 27); 
    
    
    
    border-radius: 10px;
    overflow: hidden;
   
}

.table tbody td{
    border-bottom: 1px solid rgb(206, 206, 206);
    font-family: 'Lato', sans-serif;
    font-size: 22px;
    color: #333333;



}

/*
.table th, .table td{
    padding: 10px;
    text-align: left;
    
}
*/




.table td{
    /*
    border-top: 2px solid rgb(167, 166, 165);
    */
    
    
    
}

/* Estiliza o cabeçalho */
.table thead th {
    background-color: #e6f7ff; 
    color: #495D69; 
    border-bottom: 2px solid rgb(255, 221, 27);
    font-family: 'Lato', sans-serif;
        font-size: 20px;

}






</style>