import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8089/api',
    timeout: 10000,
});

export default api;