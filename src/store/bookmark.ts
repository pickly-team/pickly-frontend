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
  readOption: READ_OPTION | null;
  setReadOption: (option: READ_OPTION) => void;
  url: string;
  setUrl: (url: string) => void;
  title: string;
  setTitle: (title: string) => void;
  initializeUrlAndTitle: () => void;
  fromPath: string;
  setFromPath: (path: string) => void;
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
  readOption: null,
  setReadOption: (option) => {
    set({ readOption: option });
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
}));

export default useBookmarkStore;
