import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    timeout: 3000
});

export default api;