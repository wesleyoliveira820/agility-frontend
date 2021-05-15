import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import axios from '../services/api';

import {
  setTokens,
  storeUser,
  getUser,
} from '../utils/auth-methods';

interface IAuthProps {
  email: string;
  password: string;
}

interface IUserProps {
  id: string;
  name: string;
  email: string;
  initial_name: string;
  color_name: string;
}

type ResultLogin = { message?: string } | undefined;

interface IContextProps {
  user: IUserProps;
  login: (userPayload: IAuthProps) => Promise<ResultLogin>;
}

interface IResponseApiProps {
  token: string;
  refresh_token: string;
  user: IUserProps;
}

interface IContext {
  children: ReactNode;
}

type LoginAxiosResponse = AxiosResponse<IResponseApiProps>;

const AuthContext = createContext({} as IContextProps);

function AuthProvider({ children }: IContext) {
  const [user, setUser] = useState(() => getUser() || {} as IUserProps);

  const login = useCallback(async (userPayload: IAuthProps): Promise<ResultLogin> => {
    try {
      const response: LoginAxiosResponse = await axios.post('auth/login', userPayload);

      const { user: profile, token, refresh_token } = response.data;

      setUser(profile);

      setTokens(token, refresh_token);

      storeUser(profile);

      return;
    } catch (_error) {
      const { response }: AxiosError<{ message?: string }> = _error;
      if (response?.status === 401) {
        return { message: 'Email ou senha estão incorretos.' };
      }

      if (response?.data.message) return response?.data;
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
