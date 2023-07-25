import { create } from 'zustand';

export type ToastMessage =
  | '차단 되었습니다'
  | '차단이 해제 되었습니다'
  | '삭제 되었습니다'
  | '팔로잉 중인 친구의 알림만 받을 수 있습니다'
  | '앗! 추가할 수 없는 북마크에요'
  | '앗! 유효하지 않은 주소에요'
  | '신고 되었습니다'
  | '이미 신고한 북마크에요'
  | '앗! 알림 설정 기준일은 1일 이상이어야 해요'
  | '차단된 사용자는 팔로우 할 수 없어요';

export type ToastMode = 'SUCCESS' | 'DELETE' | 'ERROR';

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
