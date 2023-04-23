const navigatePath = {
  MAIN: '/',
  FRIEND: '/friend',
  NOTIFICATION: '/notification',
  PROFILE: '/profile',
  BOOKMARK_DETAIL: '/bookmark/:id',
  USER: '/user/:id',
  USER_EDIT: '/user/:id/edit',
  CATEGORY_ADD: '/category/add',
} as const;

type NavigatePath = (typeof navigatePath)[keyof typeof navigatePath];

export { navigatePath, NavigatePath };
