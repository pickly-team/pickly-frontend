export const theme = {
  colors: {
    primary: '#76B100',
    lightPrimary: '#A7E100',
    darkPrimary: '#8EC520',
    lightGreen: '#BBFFB5',
    buttonGreen: '#10AB10',
    white: '#ffffff',
    black: '#161617',
    grey200: '#EEEEEE',
    grey400: '#BDBDBD',
    grey600: '#757575',
    grey700: '#616161',
    grey800: '#424242',
    grey850: '#303030',
    grey900: '#212121',
    darkBlack: '#161514',
    darkGrey: '#2A2A2A',
    red: '#D53C22',
    lightRed: '#CD6F5C',
    lightYellow: '#FFF8B5',
  },
} as const;

export type ColorType = keyof typeof theme.colors;
