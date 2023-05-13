import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IconLoader from './common-ui/assets/IconLoader';
import MainPage from './pages/MainPage';
import GlobalStyle from './styles/GlobalStyle';
import { navigatePath } from '@/constants/navigatePath';
import BookMarkDetailPage from '@/pages/BookMarkDetailPage';
import Layout from '@/common-ui/Layout';
import RNListener from '@/RNListener';
import UserCreatePage from './pages/UserInfoPage';
import CategoryAddPage from './pages/CategoryAddPage';
import ProfilePage from '@/pages/ProfilePage';
import ToastList from './common-ui/Toast/ToastList';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <IconLoader />
          <GlobalStyle />
          <ToastList />
          <RNListener />
          <Layout>
            <Routes>
              <Route path={navigatePath.MAIN} element={<MainPage />} />
              <Route
                path={navigatePath.BOOKMARK_DETAIL}
                element={<BookMarkDetailPage />}
              />
              <Route
                path={navigatePath.USER}
                element={<UserCreatePage mode="CREATE" />}
              />
              <Route
                path={navigatePath.USER_EDIT}
                element={<UserCreatePage mode="EDIT" />}
              />
              <Route
                path={navigatePath.CATEGORY_ADD}
                element={<CategoryAddPage />}
              />
              <Route path={navigatePath.PROFILE} element={<ProfilePage />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
