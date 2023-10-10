import { theme } from '@/styles/theme';
import { ThemeProvider } from '@emotion/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import IconLoader from './common-ui/assets/IconLoader';
import MainPage from './pages/MainPage';
import LikePage from './pages/LikePage';
import GlobalStyle from './styles/GlobalStyle';
import { navigatePath } from '@/constants/navigatePath';
import BookMarkDetailPage from '@/pages/BookMarkDetailPage';
import Layout from '@/common-ui/Layout';
import FaqPage from '@/pages/FaqPage';
import UserCreatePage from './pages/UserInfoPage';
import CategoryAddPage from './pages/CategoryManagePage';
import ReportPage from './pages/ReportPage';
import CommentPage from './pages/CommentPage';
import ProfilePage from '@/pages/ProfilePage';
import CategoryListPage from './pages/CategoryListPage';
import ToastList from './common-ui/Toast/ToastList';
import NotificationPage from '@/pages/NotificationPage';
import { Analytics } from '@vercel/analytics/react';
import FriendPage from '@/pages/FriendPage';
import FriendBookmarkPage from './pages/FriendBookmarkPage';
import ApiErrorBoundary from './common-ui/Error/ApiErrorBoundary';
import FriendSearchPage from './pages/FriendSearchPage';
import RNListener from './RNListener';
import BlockUserListPage from './pages/BlockUserListPage';
import IntroducePage from './pages/IntroducePage';
import WithPostMessage from './utils/WithPostMessage';
import BookmarkAddPage from './pages/BookmarkAddPage';
import BookmarkEditPage from './pages/BookmarkEditPage';
import AuthenticationCodePage from './pages/AuthenticationCodePage';
import SettingPage from './pages/SettingPage';

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
                  <Routes>
                    <Route
                      path={navigatePath.INTRODUCE}
                      element={<IntroducePage />}
                    />
                    <Route path={navigatePath.MAIN} element={<MainPage />} />
                    <Route
                      path={navigatePath.BOOKMARK_DETAIL}
                      element={<BookMarkDetailPage />}
                    />
                    <Route
                      path={navigatePath.BOOKMARK_ADD}
                      element={<BookmarkAddPage />}
                    />
                    <Route
                      path={navigatePath.BOOKMARK_EDIT}
                      element={<BookmarkEditPage />}
                    />
                    <Route path={navigatePath.FAQ} element={<FaqPage />} />
                    <Route
                      path={navigatePath.COMMENT_REPORT}
                      element={<ReportPage mode="COMMENT" />}
                    />
                    <Route
                      path={navigatePath.BOOKMARK_REPORT}
                      element={<ReportPage mode="BOOKMARK" />}
                    />
                    <Route
                      path={navigatePath.MEMBER_REPORT}
                      element={<ReportPage mode="MEMBER" />}
                    />
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
                    <Route
                      path={navigatePath.COMMENT}
                      element={<CommentPage />}
                    />
                    <Route
                      path={navigatePath.PROFILE}
                      element={<ProfilePage />}
                    />
                    <Route
                      path={navigatePath.LIKE_PAGE}
                      element={<LikePage />}
                    />
                    <Route
                      path={navigatePath.FRIEND}
                      element={<FriendPage />}
                    />
                    <Route
                      path={navigatePath.FRIEND_SEARCH}
                      element={<FriendSearchPage />}
                    />
                    <Route
                      path={navigatePath.FRIEND_BOOKMARK}
                      element={<FriendBookmarkPage />}
                    />
                    <Route
                      path={navigatePath.BLOCK_USER}
                      element={<BlockUserListPage />}
                    />
                    <Route
                      path={navigatePath.CODE}
                      element={<AuthenticationCodePage />}
                    />
                    <Route
                      path={navigatePath.SETTING}
                      element={<SettingPage />}
                    />
                  </Routes>
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
