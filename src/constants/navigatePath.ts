const navigatePath = {
  MAIN: '/',
  FRIEND: '/friend',
  FRIEND_SEARCH: '/friend/search',
  FRIEND_DETAIL: '/friend/:id',
  FRIEND_BOOKMARK: '/friend/:id/bookmark',
  BLOCK_USER: '/block',
  NOTIFICATION: '/notification',
  PROFILE: '/profile',
  BOOKMARK: '/bookmark',
  BOOKMARK_DETAIL: '/bookmark/:id',
  BOOKMARK_ADD: '/bookmark/add',
  BOOKMARK_EDIT: '/bookmark/edit/:id',
  FAQ: '/faq',
  USER: '/user/:id',
  USER_EDIT: '/user/:id/edit',
  CATEGORY_ADD: '/category/add',
  CATEGORY_EDIT: '/category/edit/:id',
  CATEGORY_LIST: '/category/list',
  COMMENT_REPORT: '/comment/:id/report',
  BOOKMARK_REPORT: '/bookmark/:id/report',
  MEMBER_REPORT: '/member/:id/report',
  COMMENT: '/comment',
  LIKE_PAGE: '/likes',
  INTRODUCE: '/introduce',
  CODE: '/code',
  SETTING: '/setting',
} as const;

type NavigatePath = (typeof navigatePath)[keyof typeof navigatePath];

export { navigatePath, NavigatePath };
