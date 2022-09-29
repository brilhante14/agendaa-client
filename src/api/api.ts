import axios from 'axios';

const api = axios.create({
   baseURL: 'http://18.212.4.185:5000/'
});

export default api;  