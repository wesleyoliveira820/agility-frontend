import axios from '../services/api';

interface IUserProps {
  id: string;
  name: string;
  email: string;
  initial_name: string;
  color_name: string;
}

interface IResponseApiProps {
  token: string;
  refresh_token: string;
}

export function isLogged() {
  const token = localStorage.getItem('@agility:token');
  return !!token;
}

export function setTokens(token: string, refresh_token: string) {
  localStorage.setItem('@agility:token', token);
  localStorage.setItem('@agility:refreshToken', refresh_token);
}

export function getToken() {
  const token = localStorage.getItem('@agility:token');

  if (!token) {
    return null;
  }

  return `Bearer ${token}`;
}

export function storeUser(userPayload: IUserProps) {
  const user = JSON.stringify(userPayload);

  localStorage.setItem('@agility:user', user);
}

export function getUser(): IUserProps | undefined {
  const user = localStorage.getItem('@agility:user');

  if (!user) return;

  return JSON.parse(user);
}

export async function refreshTokens(): Promise<IResponseApiProps| void> {
  const refresh_token = localStorage.getItem('@agility:refreshToken');
  const token = localStorage.getItem('@agility:token');

  if (!refresh_token || !token) return;

  const response = await axios.put('auth/refresh-token', {
    refresh_token,
  });

  return response.data;
}
