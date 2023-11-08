import { create } from 'zustand';

export type ToastMessage =
  | '차단 되었습니다'
  | '차단이 해제 되었습니다'
  | '삭제 되었습니다'
  | '앗! 추가할 수 없는 북마크에요'
  | '앗! 제목을 받아올 수 없는 북마크에요'
  | '앗! 유효하지 않은 주소에요'
  | '신고 되었습니다'
  | '이미 신고한 북마크에요'
  | '이미 신고한 유저에요'
  | '이미 신고한 댓글이에요'
  | '앗! 알림 설정 기준일은 1일 이상이어야 해요'
  | '차단된 사용자는 팔로우 할 수 없어요'
  | '준비 중인 기능이에요'
  | '앗! 알림 설정이 꺼져 있어요'
  | '앗! URL을 입력해주세요'
  | '앗! 카테고리를 선택해주세요'
  | '앗! 제목을 입력해주세요'
  | '앗! 중복된 닉네임이에요'
  | '앗! 에러가 발생했어요'
  | 'URL이 복사되었어요'
  | '앗! 카테고리는 최대 20개까지만 만들 수 있어요'
  | '앗! 카테고리 추가에 실패했어요'
  | '앗! 카테고리 이름이 비어있어요'
  | '삭제 되었습니다'
  | '추가 되었습니다'
  | '수정 되었습니다'
  | '차단된 사용자 입니다'
  | '앗! 삭제할 카테고리가 없어요'
  | '앗! 아직 카테고리가 없어요'
  | '앗! 아직 알림이 없어요'
  | '앗! 이미 모든 알림을 읽었어요'
  | '앗! 닉네임에는 특수문자를 사용할 수 없어요';

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
