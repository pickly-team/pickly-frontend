import { GlobalStyle, IconLoader, theme } from '@pickly/design-system';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter } from 'react-router-dom';
import RNListener from './RNListener';
import Routes from './pages/Routes';
import WithPostMessage from './shared/utils/WithPostMessage';
import ToastList from './shared/ui/Toast/ToastList';
import ApiErrorBoundary from './shared/ui/Error/ApiErrorBoundary';
import Layout from './shared/ui/Layout/Layout';

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
    // <CacheProvider value={cache}>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <IconLoader />
        <ToastList />
        <BrowserRouter>
          <WithPostMessage>
            {(postMessage) => (
              <ApiErrorBoundary postMessage={postMessage}>
                <RNListener />
                <Layout>
                  <Routes />
                </Layout>
              </ApiErrorBoundary>
            )}
          </WithPostMessage>
        </BrowserRouter>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ThemeProvider>
    // </CacheProvider>
  );
};

export default App;
