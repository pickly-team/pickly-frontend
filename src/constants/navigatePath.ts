const navigatePath = {
  MAIN: '/',
  FRIEND: '/friend',
  NOTIFICATION: '/notification',
  PROFILE: '/profile',
  BOOKMARK_DETAIL: '/bookmark/:id',
  FAQ: '/faq',
  USER: '/user/:id',
  USER_EDIT: '/user/:id/edit',
  CATEGORY_ADD: '/category/add',
  CATEGORY_EDIT: '/category/edit/:id',
  CATEGORY_LIST: '/category/list',
  REPORT: '/bookmark/:id/report',
  LIKE_PAGE: '/likes',
} as const;

type NavigatePath = (typeof navigatePath)[keyof typeof navigatePath];

export { navigatePath, NavigatePath };
