import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export interface UserInfo {
  id: number;
  name: string;
  nickname: string;
  profileEmoji: string;
  followersCount: number;
  followeesCount: number;
  bookmarksCount: number;
}

interface Auth {
  isLogin: boolean;
  token: string;
  memberId: number;
  userInfo: UserInfo;
  setUserInfo: (fn: (userInfo: UserInfo) => UserInfo) => void;
  login: ({ token, memberId }: { token: string; memberId: number }) => void;
}

const useAuthStore = create<Auth>()(
  devtools(
    (set) => ({
      isLogin: false,
      token: '',
      memberId: 0,
      userInfo: {
        id: 0,
        name: '',
        nickname: '',
        profileEmoji: '😃',
        followersCount: 0,
        followeesCount: 0,
        bookmarksCount: 0,
      },
      setUserInfo: (fn: (userInfo: UserInfo) => UserInfo) =>
        set((state) => ({ userInfo: fn(state.userInfo) })),
      login: ({ token, memberId }) => {
        set({ isLogin: true, token, memberId });
      },
    }),
    { name: 'auth' },
  ),
);

export default useAuthStore;
