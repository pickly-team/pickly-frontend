import { ReactElement, ReactNode } from 'react';
import { render as defaultRender, RenderOptions } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/styles/theme';

const Renderer = (ui: ReactElement, options?: RenderOptions) => {
  const BaseWrapper = ({ children }: { children: ReactNode }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  };

  return defaultRender(ui, { wrapper: BaseWrapper, ...options });
};

export { Renderer as render };
