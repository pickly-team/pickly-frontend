import { stackflow } from '@stackflow/react';
import { basicRendererPlugin } from '@stackflow/plugin-renderer-basic';
import { basicUIPlugin } from '@stackflow/plugin-basic-ui';
import IntroducePage from '@/pages/IntroducePage';
import MainPage from '@/pages/MainPage';
import BlockUserListPage from '@/pages/BlockUserListPage';
import BookMarkDetailPage from '@/pages/BookMarkDetailPage';
import CategoryListPage from '@/pages/CategoryListPage';
import CategoryManagePage from '@/pages/CategoryManagePage';
import CommentPage from '@/pages/CommentPage';
import FaqPage from '@/pages/FaqPage';
import FriendBookmarkPage from '@/pages/FriendBookmarkPage';
import FriendPage from '@/pages/FriendPage';
import FriendSearchPage from '@/pages/FriendSearchPage';
import LikePage from '@/pages/LikePage';
import NotificationPage from '@/pages/NotificationPage';
import ProfilePage from '@/pages/ProfilePage';
import ReportPage from '@/pages/ReportPage';
import UserInfoPage from '@/pages/UserInfoPage';
import { historySyncPlugin } from '@stackflow/plugin-history-sync';
import { navigatePath } from '@/constants/navigatePath';
import NetworkError from './Error/NetworkError';
import { preloadPlugin } from '@stackflow/plugin-preload';
import { theme } from '@/styles/theme';
import BookmarkAddPage from '@/pages/BookmarkAddPage';

export const { Stack, activities, useFlow, useStepFlow } = stackflow({
  transitionDuration: 350,
  activities: {
    IntroducePage,
    MainPage,
    BlockUserListPage,
    BookMarkDetailPage,
    CategoryListPage,
    CategoryManagePage,
    CommentPage,
    FaqPage,
    FriendBookmarkPage,
    FriendPage,
    FriendSearchPage,
    LikePage,
    NotificationPage,
    ProfilePage,
    ReportPage,
    UserInfoPage,
    NetworkError,
    BookmarkAddPage,
  },
  plugins: [
    basicRendererPlugin(),
    basicUIPlugin({
      theme: 'cupertino',
      backgroundColor: theme.colors.black,
    }),
    historySyncPlugin({
      routes: {
        ...navigatePath,
      },
      fallbackActivity: () => 'NetworkError',
    }),
    preloadPlugin({
      loaders: {
        BookMarkDetailPage: () => import('@/pages/BookMarkDetailPage'),
      },
    }),
  ],
});

export type TypeActivities = typeof activities;
