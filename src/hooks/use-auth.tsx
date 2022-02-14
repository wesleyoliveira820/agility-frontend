import { useContext } from 'react';
import Cookies from 'js-cookie';

import { AuthContext } from '../contexts/auth-context';
import appConfig from '../config/app.config';

export function useAuth() {
  const context = useContext(AuthContext);

  function isLogged() {
    return !!Cookies.get(appConfig.cookies.token.name);
  }

  return {
    isLogged,
    ...context,
  };
}
