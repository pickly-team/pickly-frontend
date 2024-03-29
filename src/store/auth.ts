import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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
  showIntroduce: boolean;
  setShowIntroduce: (showIntroduce: boolean) => void;
  initializeUserInfo: () => void;
}

const useAuthStore = create<Auth>()(
  persist(
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
      showIntroduce: true,
      setShowIntroduce: (showIntroduce) => {
        set({ showIntroduce });
      },
      initializeUserInfo: () => {
        set({
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
        });
      },
    }),
    { name: 'auth' },
  ),
);

export default useAuthStore;
