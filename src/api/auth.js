import api from './axiosCustomConfig';

export async function refreshAccessToken(){
    try{
        const response = await api.post("/refresh"); // O backend retorna o novo token no corpo
       return response.data.accessToken;
    }catch(error){
        console.error("Erro ao renovar o token", error);
        throw error;
        
    }
}