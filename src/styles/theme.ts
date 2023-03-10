export const theme = {
  colors: {
    primary: '#76B100',
    lightPrimary: '#A7E100',
    darkPrimary: '#8EC520',
    lightGreen: '#BBFFB5',
    white: '#ffffff',
    black: '#161617',
    grey200: '#EEEEEE',
    grey400: '#BDBDBD',
    grey600: '#757575',
    grey800: '#424242',
    grey900: '#212121',
  },
} as const;

export type ColorType = keyof typeof theme.colors;
