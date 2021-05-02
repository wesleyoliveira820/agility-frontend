import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';

import Routes from './routes';
import GlobalStyle from './styles/global';

import lightTheme from './themes/light';

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider theme={lightTheme}>
        <Routes />
        <GlobalStyle />
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
