import axios from 'axios';

const api = axios.create({
   baseURL: 'http://3.94.201.196:5000/'
});

export default api;  