const navigatePath = {
  MainPage: '/',
  FriendPage: '/friend/',
  FriendSearchPage: '/friend/search',
  FriendBookmarkPage: '/friend/:id/bookmark',
  BlockUserListPage: '/block',
  NotificationPage: '/notification',
  ProfilePage: '/profile/',
  BookMarkDetailPage: '/bookmark/:bookmarkId/',
  FaqPage: '/faq',
  UserInfoPage: '/user/:id',
  CategoryManagePage: [
    '/category/add/',
    '/category/edit/:id',
    '/category/list',
  ],
  CategoryListPage: '/category/list',
  ReportPage: ['/bookmark/:id/report', '/comment/:id/report'],
  CommentPage: '/comment',
  LikePage: '/likes',
  IntroducePage: '/introduce',
  NetworkError: '/error',
  BookmarkAddPage: '/bookmark/add',
};

type NavigatePath = (typeof navigatePath)[keyof typeof navigatePath];
type NavigatePathKey = keyof typeof navigatePath;

export { navigatePath, NavigatePathKey, NavigatePath };
