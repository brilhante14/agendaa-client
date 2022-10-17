import axios from 'axios';

const api = axios.create({ 
   baseURL: 'http://35.175.151.163:5000/'
});

export default api;  