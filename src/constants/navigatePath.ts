const navigatePath = {
  MAIN: '/',
  FRIEND: '/friend',
  ALARM: '/alarm',
  PROFILE: '/profile',
  BOOKMARK_DETAIL: '/bookmark/:id',
  LIKE_PAGE: '/likes',
} as const;

type NavigatePath = (typeof navigatePath)[keyof typeof navigatePath];

export { navigatePath, NavigatePath };
