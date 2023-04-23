import { create } from 'zustand';

interface Auth {
  isLogin: boolean;
  userToken: string;
  login: (userToken: string) => void;
}

const useAuthStore = create<Auth>((set) => ({
  isLogin: false,
  userToken: '',
  login: (userToken: string) =>
    set(() => ({ isLogin: true, userToken: userToken })),
}));

export default useAuthStore;
