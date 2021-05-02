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

  return (
    <EmailContext.Provider value={{ email, handleEmail }}>
      { children }
    </EmailContext.Provider>
  );
}

export function useEmail() {
  const context = useContext(EmailContext);
  return context;
}

export default EmailProvider;
