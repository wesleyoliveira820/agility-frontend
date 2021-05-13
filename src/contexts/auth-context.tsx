import {
  createContext,
  useState,
  ReactNode,
  useContext,
  useCallback,
} from 'react';

import { AxiosError, AxiosResponse } from 'axios';

import axios from '../services/api';
import { setToken, storeUser, getUser } from '../utils/auth-methods';

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

type ResponseLogin = { error: string } | undefined;

interface IContextProps {
  user: IUserProps;
  login: (userPayload: IAuthProps) => Promise<ResponseLogin>;
}

interface IResponseApiProps {
  token: string;
  user: IUserProps;
}

interface IContext {
  children: ReactNode;
}

interface IErrorStatus {
  [key: number]: string;
}

const AuthContext = createContext({} as IContextProps);

function AuthProvider({ children }: IContext) {
  const [user, setUser] = useState(() => getUser() || {} as IUserProps);

  const login = useCallback(async (userPayload: IAuthProps): Promise<ResponseLogin> => {
    try {
      const response: AxiosResponse<IResponseApiProps> = await axios.post('auth/login', userPayload);

      setUser(response.data.user);

      setToken(response.data.token);

      storeUser(response.data.user);

      return;
    } catch (_error) {
      const { response }: AxiosError = _error;

      const errors: IErrorStatus = {
        401: 'Email ou senha estão incorretos.',
        403: 'Verifique sua conta para fazer login.',
        500: 'Desculpe, houve um erro interno no servidor.',
      };

      return {
        error: errors[response?.status || 500],
      };
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
