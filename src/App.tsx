import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { QueryClientProvider } from 'react-query';

import AuthProvider from './contexts/auth-context';
import Routes from './routes';
import lightTheme from './themes/light';

import GlobalStyle from './styles/global';
import { queryClient } from './services/query-client';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <ToastContainer style={{ zIndex: 3 }} />
        <AuthProvider>
          <QueryClientProvider client={queryClient}>
            <Routes />
          </QueryClientProvider>
        </AuthProvider>
        <GlobalStyle />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
