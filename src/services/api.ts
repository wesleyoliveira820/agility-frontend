import axios, { AxiosRequestConfig } from 'axios';
import appConfig from '../config/app.config';

import { getToken } from '../utils/auth-methods';

const api = axios.create({
  baseURL: appConfig.api_url,
});

api.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = getToken();

  config.headers = {
    Accept: 'application/json',
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
