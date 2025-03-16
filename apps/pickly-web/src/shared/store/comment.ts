import { create } from 'zustand';

export interface Comment {
  id?: number;
  content: string;
}

interface CommentStore {
  mode: 'EDIT' | 'CREATE';
  comment: Comment;
  setComment: (content: string) => void;
  editComment: (comment: Comment) => void;
  initComment: () => void;
  setCommentId: (id: number) => void;
  commentCount: number;
  setCommentCount: (count: number) => void;
}

const useCommentStore = create<CommentStore>((set) => ({
  mode: 'CREATE',
  comment: {
    id: 0,
    content: '',
  },
  setComment: (content) => {
    set({ comment: { ...useCommentStore.getState().comment, content } });
  },
  editComment: (comment) => {
    set({ mode: 'EDIT', comment });
  },
  initComment: () => {
    set({ mode: 'CREATE', comment: { id: 0, content: '' } });
  },
  setCommentId: (id) => {
    set((state) => ({ comment: { ...state.comment, id } }));
  },
  commentCount: 0,
  setCommentCount: (count) => {
    set({ commentCount: count });
  },
}));

export default useCommentStore;
