import { ThemeProvider } from '@emotion/react';
import IconLoader from '../src/common-ui/assets/IconLoader';
import { theme } from '../src/styles/theme';
import GlobalStyle from '../src/styles/GlobalStyle';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <IconLoader />
      <GlobalStyle />
      <Story />
    </ThemeProvider>
  ),
];
