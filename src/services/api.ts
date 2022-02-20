import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';

import appConfig from '../config/app.config';

import { getRefreshToken, getToken, storeTokens } from '../utils/auth-methods';

interface QueueProps {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError | null) => void;
}

let isRefreshing = false;
let failedRequestsQueue: QueueProps[] = [];

const api = axios.create({
  baseURL: appConfig.api_url,
});

function processQueue(error: AxiosError | null, token: string | null) {
  if (token) {
    failedRequestsQueue.forEach(({ onSuccess }) => onSuccess(token));
  } else {
    failedRequestsQueue.forEach(({ onFailure }) => onFailure(error));
  }

  failedRequestsQueue = [];
}

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

api.interceptors.response.use(
  (response) => response,
  (serverError: AxiosError) => {
    if (serverError.response?.status === 500) {
      toast.error(
        'Ops...Um erro ocorreu em nossos servidores. Não foi possível realizar a requisição.',
      );
    }

    const originalRequest: AxiosRequestConfig = serverError.config;

    const statusError = serverError.response?.status;

    if (statusError === 401) {
      if (serverError.response?.data.error.name === 'InvalidJwtToken') {
        const refreshToken = getRefreshToken();

        if (!isRefreshing) {
          isRefreshing = true;

          api
            .put('auth/refresh-token', {
              refresh_token: refreshToken,
            })
            .then((response) => {
              const { token, refresh_token } = response.data;

              storeTokens(token, refresh_token);

              api.defaults.headers.Authorization = `Bearer ${token}`;

              processQueue(null, token);
            })
            .catch((error) => {
              processQueue(error, null);
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestsQueue.push({
            onSuccess: (token: string) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalRequest));
            },
            onFailure: (failure: AxiosError | null) => {
              reject(failure);
            },
          });
        });
      }
    }

    return Promise.reject(serverError);
  },
);

export default api;
