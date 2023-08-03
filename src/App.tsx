import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import IconLoader from './common-ui/assets/IconLoader';
import GlobalStyle from './styles/GlobalStyle';
import ToastList from './common-ui/Toast/ToastList';
import { Analytics } from '@vercel/analytics/react';
import ApiErrorBoundary from './common-ui/Error/ApiErrorBoundary';
import RNListener from './RNListener';
import { Stack } from './common-ui/stackflow';
import '@stackflow/plugin-basic-ui/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      suspense: false,
      useErrorBoundary: true,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <IconLoader />
        <ToastList />

        <RNListener />
        <ApiErrorBoundary>
          <Stack />
        </ApiErrorBoundary>

        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
