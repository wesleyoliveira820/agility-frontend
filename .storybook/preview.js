import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import GlobalStyle from '../src/styles/global';
import lightTheme from '../src/themes/light';
import AuthProvider from '../src/contexts/auth-context';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={lightTheme}>
      <AuthProvider>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
]
