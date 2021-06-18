import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { getToken, refreshTokens, setTokens } from '../utils/auth-methods';

interface IMyRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const api = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? 'http://localhost:3333'
    : process.env.API_URL,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  config.headers = {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json',
  };

  return config;
});

api.interceptors.response.use((response) => response, async (error: AxiosError) => {
  if (!error.response?.status) {
    toast.error(`
      Desculpe, não foi possível enviar a requisição ao servidor.
      Verifique sua conexão com a internet.
    `);
  }

  if (error.response?.status === 500) {
    toast.error('Houve um erro interno no servidor, tente novamente mais tarde.');
  }

  const originalRequest: IMyRequestConfig = error.config;

  if (error.response?.status === 401 && originalRequest.url === 'auth/refresh-token') {
    return Promise.reject(error);
  }

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    const newToken = await refreshTokens();

    if (!newToken) return Promise.reject(error);

    setTokens(newToken.token, newToken.refresh_token);

    return api.request(originalRequest);
  }

  return Promise.reject(error);
});

export default api;
