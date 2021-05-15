import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';

import AuthProvider from './contexts/auth-context';
import EmailProvider from './contexts/email-context';
import Routes from './routes';
import lightTheme from './themes/light';

import GlobalStyle from './styles/global';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <ToastContainer style={{ zIndex: 3 }} />
        <AuthProvider>
          <EmailProvider>
            <Routes />
          </EmailProvider>
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
