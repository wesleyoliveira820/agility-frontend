import pallete from './pallete';

export default {
  colors: {
    brand: {
      primary: pallete.blue[300],
      secondary: pallete.blue[700],
    },
    base: {
      primary: pallete.gray[50],
      secondary: pallete.white,
      tertiary: pallete.gray[75],
    },
    text: {
      primary: pallete.gray[500],
      secondary: pallete.gray[400],
      banner: pallete.white,
    },
    divider: {
      primary: pallete.gray[300],
      secondary: pallete.gray[200],
      tertiary: pallete.gray[100],
    },
    helpers: {
      success: pallete.green[400],
      warning: pallete.yellow[500],
      error: pallete.red[500],
    },
    overlay: pallete.black,
  },
};
