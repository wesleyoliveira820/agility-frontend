import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';

import GlobalStyle from '../src/styles/global';
import lightTheme from '../src/themes/light';

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
      <MemoryRouter>
        <Story />
      </MemoryRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
]
