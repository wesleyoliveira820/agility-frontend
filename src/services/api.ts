import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getToken } from '../utils/auth-methods';

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : process.env.API_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  config.headers = {
    Authorization: token,
    Accept: 'application/json',
  };

  return config;
});

api.interceptors.response.use((response) => response, (error: AxiosError) => {
  if (!error.response?.status) {
    toast.error(`
      Desculpe, não foi possível enviar a requisição ao servidor.
      Verifique sua conexão com a internet.
    `);
  }

  if (error.response?.status === 500) {
    toast.error('Houve um erro interno no servidor, tente novamente mais tarde.');
  }

  return Promise.reject(error);
});

export default api;
