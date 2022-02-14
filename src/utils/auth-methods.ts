import Cookies from 'js-cookie';
import appConfig from '../config/app.config';
import axios from '../services/api';

const { cookies: cookieConfig } = appConfig;

Cookies.withAttributes({
  path: cookieConfig.path,
  sameSite: cookieConfig.sameSite,
});

export function storeTokens(token: string, refresh_token: string) {
  Cookies.set(cookieConfig.token.name, token, {
    expires: cookieConfig.token.expires,
  });

  Cookies.set(cookieConfig.refresh_token.name, refresh_token, {
    expires: cookieConfig.refresh_token.expires,
  });
}

export function getToken() {
  const token = Cookies.get(cookieConfig.token.name);
  if (!token) return null;
  return token;
}

export function getRefreshToken() {
  return Cookies.get(cookieConfig.refresh_token.name);
}

export async function userLogout() {
  await axios.delete('logout');

  Cookies.remove(cookieConfig.token.name);
  Cookies.remove(cookieConfig.refresh_token.name);
}

export function isLogged() {
  const token = Cookies.get(cookieConfig.token.name);

  const refreshToken = Cookies.get(cookieConfig.refresh_token.name);

  if (!token && refreshToken) return true;

  return !!token;
}
