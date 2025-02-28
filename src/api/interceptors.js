import {refreshAccessToken} from './auth';

export function setupInterceptors(api){
    api.interceptors.response.use(
        (response) => {console.log("obtive uma resposta valida")
        return response}, 
        async (error) =>{
            console.log("to aqui pois a resposta foi 401")
            const originalRequest = error.config;



            //log do if
            console.log("error.response", error.response);
            console.log("error.response.status", error.response.status);
            console.log("originalRequest._retry", originalRequest._retry);
            




            // Se for erro 401 e a requisição ainda não foi re-tentada,
            // tenta renovar o token
            if(error.response && error.response.status === 401 && !originalRequest._retry){
                originalRequest._retry = true; // Evita loop infinito
                console.log("to aqui onde era para evitar o loop infinito")


                try{
                    const newAccessToken = await refreshAccessToken();
                    originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                    return api(originalRequest); // Refaz a requisição original com o novo token
                }catch(refreshError){
                    console.error("Erro ao renovar o token", refreshError);
                    window.location.href = "/"; //Redireciona para o login se o refresh falhar
                    return Promise.reject(refreshError);

                }
            
            }else{
                console.log("caí no else")

            }

            return Promise.reject(error);


        }
    );
}

