import Layout from '@/common-ui/Layout';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter } from 'react-router-dom';
import RNListener from './RNListener';
import ApiErrorBoundary from './common-ui/Error/ApiErrorBoundary';
import ToastList from './common-ui/Toast/ToastList';
import IconLoader from './common-ui/assets/IconLoader';
import Routes from './pages/Routes';
import GlobalStyle from './styles/GlobalStyle';
import WithPostMessage from './utils/WithPostMessage';

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
      <Analytics />
    </ThemeProvider>
  );
};

export default App;
