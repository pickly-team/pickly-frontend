import { READ_OPTION } from '@/bookmarks/service/hooks/home/useReadList';
import { create } from 'zustand';

interface OptionType {
  value: string | null;
  label: string;
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
  url: string;
  setUrl: (url: string) => void;
  title: string;
  setTitle: (title: string) => void;
  initializeUrlAndTitle: () => void;
  fromPath: string;
  setFromPath: (path: string) => void;
  selectedBookmarkId: number;
  setSelectedBookmarkId: (id: number) => void;
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
  url: '',
  setUrl: (url) => {
    set({ url });
  },
  title: '',
  setTitle: (title) => {
    set({ title });
  },
  initializeUrlAndTitle: () => {
    set({ url: '', title: '' });
  },
  fromPath: '',
  setFromPath: (path) => {
    set({ fromPath: path });
  },
  selectedBookmarkId: 0,
  setSelectedBookmarkId: (id) => {
    set({ selectedBookmarkId: id });
  },
}));

export default useBookmarkStore;
