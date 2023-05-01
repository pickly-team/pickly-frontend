const navigatePath = {
  MAIN: '/',
  FRIEND: '/friend',
  ALARM: '/alarm',
  PROFILE: '/profile',
  BOOKMARK_DETAIL: '/bookmark/:id',
  USER: '/user/:id',
  USER_EDIT: '/user/:id/edit',
  CATEGORY_ADD: '/category/add',
  CATEGORY_EDIT: '/category/edit/:id',
  CATEGORY_LIST: '/category/list',
} as const;

type NavigatePath = (typeof navigatePath)[keyof typeof navigatePath];

export { navigatePath, NavigatePath };
