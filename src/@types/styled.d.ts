import 'styled-components';
import themeStyles from '../themes/light';

declare module 'styled-components' {
  type ThemeType = typeof themeStyles;

  export interface DefaultTheme extends ThemeType {}
}
