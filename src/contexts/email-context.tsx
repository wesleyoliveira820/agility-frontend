import {
  createContext,
  useState,
  ReactNode,
  useContext,
} from 'react';

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

  function handleEmail(emailAddress: string) {
    setEmail(emailAddress);
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
