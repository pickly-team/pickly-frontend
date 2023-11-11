import { READ_OPTION } from '@/bookmarks/service/hooks/home/useReadList';
import { create } from 'zustand';

export const MAX_CATEGORY_COUNT = 20 as const;

interface OptionType {
  value: string | null;
  label: string;
}

interface BookmarkInfo {
  title: string;
  url: string;
  thumbnail: string;
}

interface BookmarkStore {
  categoryOptions: OptionType[];
  setCategoryOptions: (options: OptionType[]) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  friendCategoryId: number | null;
  setFriendCategoryId: (id: number | null) => void;
  readOption: READ_OPTION;
  setReadOption: (option: READ_OPTION) => void;
  friendReadOption: READ_OPTION;
  setFriendReadOption: (option: READ_OPTION) => void;
  bookmarkInfo: BookmarkInfo;
  setBookmarkInfo: (fn: (info: BookmarkInfo) => BookmarkInfo) => void;
  initializeBookmarkInfo: () => void;
  fromPath: string;
  setFromPath: (path: string) => void;
  selectedBookmarkId: number;
  setSelectedBookmarkId: (id: number) => void;
  isBookmarkError: boolean;
  setIsBookmarkError: (isBookmarkError: boolean) => void;
}

const useBookmarkStore = create<BookmarkStore>((set) => ({
  categoryOptions: [],
  setCategoryOptions: (options) => {
    set({ categoryOptions: options });
  },
  selectedCategoryId: null,
  setSelectedCategoryId: (id) => {
    set({ selectedCategoryId: id });
  },
  friendCategoryId: null,
  setFriendCategoryId: (id) => {
    set({ friendCategoryId: id });
  },
  readOption: '📖 전체',
  setReadOption: (option) => {
    set({ readOption: option });
  },
  friendReadOption: '📖 전체',
  setFriendReadOption: (option) => {
    set({ friendReadOption: option });
  },
  bookmarkInfo: {
    title: '',
    url: '',
    thumbnail: '',
  },
  setBookmarkInfo: (fn) => {
    set((state) => ({ bookmarkInfo: fn(state.bookmarkInfo) }));
  },
  initializeBookmarkInfo: () => {
    set({
      bookmarkInfo: {
        title: '',
        url: '',
        thumbnail: '',
      },
    });
  },
  fromPath: '',
  setFromPath: (path) => {
    set({ fromPath: path });
  },
  selectedBookmarkId: 0,
  setSelectedBookmarkId: (id) => {
    set({ selectedBookmarkId: id });
  },
  isBookmarkError: false,
  setIsBookmarkError: (isBookmarkError) => {
    set({ isBookmarkError });
  },
}));

export default useBookmarkStore;
