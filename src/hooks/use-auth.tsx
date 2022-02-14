import { useContext } from 'react';

import { AuthContext } from '../contexts/auth-context';
import { isLogged } from '../utils/auth-methods';

export function useAuth() {
  const context = useContext(AuthContext);

  return {
    isLogged,
    ...context,
  };
}
