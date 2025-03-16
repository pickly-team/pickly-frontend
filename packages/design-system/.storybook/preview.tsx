import IconLoader from '../src/shared/assets/IconLoader';
import GlobalStyle from '../src/shared/styles/GlobalStyle';
import type {Preview} from '@storybook/react';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    Story => (
      <>
        <GlobalStyle />
        <IconLoader />
        <Story />
      </>
    ),
  ],
};

export default preview;
