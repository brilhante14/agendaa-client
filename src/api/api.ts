import axios from 'axios';

const api = axios.create({
   baseURL: 'http://3.84.92.144:5000/'
});

export default api;