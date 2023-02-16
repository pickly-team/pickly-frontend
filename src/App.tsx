import Bear from '@/components/Bear';
import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IconLoader from './common-ui/assets/IconLoader';
import GlobalStyle from './styles/GlobalStyle';

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <IconLoader />
          <GlobalStyle />
          <Routes>
            <Route path={'/'} element={<Bear />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
