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
import FaqPage from '@/pages/FaqPage';
import RNListener from '@/RNListener';
import UserCreatePage from './pages/UserInfoPage';
import CategoryAddPage from './pages/CategoryManagePage';
import ReportPage from './pages/ReportPage';
import ProfilePage from '@/pages/ProfilePage';
import CategoryListPage from './pages/CategoryListPage';
import ToastList from './common-ui/Toast/ToastList';
import NotificationPage from '@/pages/NotificationPage';

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
          <ToastList />
          <Layout>
            <Routes>
              <Route path={navigatePath.MAIN} element={<MainPage />} />
              <Route
                path={navigatePath.BOOKMARK_DETAIL}
                element={<BookMarkDetailPage />}
              />
              <Route path={navigatePath.FAQ} element={<FaqPage />} />
              <Route path={navigatePath.REPORT} element={<ReportPage />} />
              <Route
                path={navigatePath.USER}
                element={<UserCreatePage mode="CREATE" />}
              />
              <Route
                path={navigatePath.NOTIFICATION}
                element={<NotificationPage />}
              />
              <Route
                path={navigatePath.USER_EDIT}
                element={<UserCreatePage mode="EDIT" />}
              />
              <Route
                path={navigatePath.CATEGORY_LIST}
                element={<CategoryListPage />}
              />
              <Route
                path={navigatePath.CATEGORY_ADD}
                element={<CategoryAddPage mode="ADD" />}
              />
              <Route
                path={navigatePath.CATEGORY_EDIT}
                element={<CategoryAddPage mode="EDIT" />}
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
