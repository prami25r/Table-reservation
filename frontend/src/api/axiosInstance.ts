import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL || 'http://192.168.29.7:3000',
  timeout: 10000
});

export default api;
