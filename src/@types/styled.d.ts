import 'styled-components';

interface IColors {
  brand: {
    primary: string;
    secondary: string;
  }
  base: {
    primary: string;
    secondary: string;
  }
  text: {
    primary: string;
    secondary: string;
    banner: string;
  }
  divider: {
    primary: string;
    secondary: string;
    tertiary: string;
  }
  helpers: {
    success: string;
    warning: string;
    error: string;
  }
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: IColors
  }
}
