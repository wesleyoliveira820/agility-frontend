import {
  createContext,
  useState,
  ReactNode,
  useContext,
} from 'react';

import { useHistory } from 'react-router-dom';

interface IContextProps {
  email: string;
  handleEmail: (emailAddress: string) => void;
  clearEmail: () => void;
}

interface IContext {
  children: ReactNode;
}

const EmailContext = createContext({} as IContextProps);

function EmailProvider({ children }: IContext) {
  const [email, setEmail] = useState('');
  const history = useHistory();

  function handleEmail(emailAddress: string) {
    setEmail(emailAddress);

    history.push('/register');
  }

  function clearEmail() {
    setEmail('');
  }

  return (
    <EmailContext.Provider value={{ email, handleEmail, clearEmail }}>
      { children }
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  return context;
}

export default EmailProvider;
