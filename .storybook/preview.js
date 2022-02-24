import { ThemeProvider } from 'styled-components';
import { MemoryRouter } from 'react-router-dom';
import { DragDropContext } from 'react-beautiful-dnd';

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
          <DragDropContext>
            <Story />
          </DragDropContext>
        </MemoryRouter>
      </AuthProvider>
      <GlobalStyle />
    </ThemeProvider>
  )
]
