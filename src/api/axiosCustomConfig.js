import axios from 'axios';
import {setupInterceptors} from './interceptors';

const api = axios.create({
    baseURL: 'http://localhost:8099',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, //Permite que os cookies HTTP-only sejam enviados automaticamente

});

setupInterceptors(api);

export default api;