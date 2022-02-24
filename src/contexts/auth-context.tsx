import {
  createContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';

import type { AxiosError, AxiosResponse } from 'axios';

import axios from '../services/api';

import {
  storeTokens,
  isLogged,
  clearTokens,
} from '../utils/auth-methods';

import logoutEvent from '../utils/logout-event';

interface AuthCredentialsProps {
  email: string;
  password: string;
}

interface UserProps {
  id: string;
  name: string;
  email: string;
  initial_name: string;
  color_name: string;
}

type ResultLogin = { message?: string } | undefined;

interface ContextProps {
  user: UserProps;
  login: (userPayload: AuthCredentialsProps) => Promise<ResultLogin>;
  logout: () => void;
}

interface ResponseApiProps {
  token: string;
  refresh_token: string;
  user: UserProps;
}

interface ProviderProps {
  children: ReactNode;
}

type LoginAxiosResponse = AxiosResponse<ResponseApiProps>;

export const AuthContext = createContext({} as ContextProps);

function AuthProvider({ children }: ProviderProps) {
  const [user, setUser] = useState({} as UserProps);

  async function getAuthenticatedUser() {
    const response = await axios.get<UserProps>('me');
    setUser(response.data);
  }

  const login = useCallback(async (userPayload: AuthCredentialsProps): Promise<ResultLogin> => {
    try {
      const response: LoginAxiosResponse = await axios.post('auth/login', userPayload);

      const { user: profile, token, refresh_token } = response.data;

      setUser(profile);
      storeTokens(token, refresh_token);
    } catch (_error: any) {
      const { response }: AxiosError<{ message?: string }> = _error;

      if (response?.status === 401) {
        return { message: 'Email ou senha estão incorretos.' };
      }

      if (response?.data.message) return response?.data;
    }
  }, []);

  function logout() {
    clearTokens();
    window.location.href = '/login';
  }

  useEffect(() => {
    logoutEvent.subscribe(logout);

    if (isLogged()) {
      getAuthenticatedUser();
    }

    return () => {
      logoutEvent.unsubscribe(logout);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
