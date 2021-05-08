import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';

import Routes from './routes';
import GlobalStyle from './styles/global';
import AuthProvider from './contexts/auth-context';
import EmailProvider from './contexts/email-context';

import lightTheme from './themes/light';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
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
