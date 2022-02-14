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
  userLogout,
  storeTokens,
  isLogged,
} from '../utils/auth-methods';

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
  logout: () => Promise<void>;
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

  useEffect(() => {
    if (isLogged()) getAuthenticatedUser();
  }, []);

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

  async function logout() {
    await userLogout();
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
