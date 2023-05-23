import { create } from 'zustand';

export type ToastMessage =
  | '차단 되었습니다'
  | '차단이 해제 되었습니다'
  | '삭제 되었습니다'
  | '팔로잉 중인 친구의 알림만 받을 수 있습니다';

export type ToastMode = 'SUCCESS' | 'DELETE';

export interface Toast {
  id?: string;
  message: ToastMessage;
  mode?: ToastMode;
}

interface ToastStore {
  toasts: Toast[];
  duration: number;
  addToast: (toast: Toast) => void;
  removeToast: (id: string) => void;
  setDuration: (duration: number) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  duration: 2000,
  addToast: (toast: Toast) =>
    set((state) => ({ toasts: [...state.toasts, toast] })),
  removeToast: (id: string) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
  setDuration: (duration: number) => set({ duration }),
}));

export default useToastStore;
