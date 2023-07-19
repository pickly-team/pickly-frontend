import { create } from 'zustand';

interface CategoryType {
  value: string | null;
  label: string;
}

interface BookmarkStore {
  categoryOptions: CategoryType[];
  setCategoryOptions: (options: CategoryType[]) => void;
  selectedCategoryId: number | null;
  setSelectedCategoryId: (id: number | null) => void;
  isReadMode: boolean;
  setIsReadMode: (isReadMode: boolean) => void;
  url: string;
  setUrl: (url: string) => void;
  title: string;
  setTitle: (title: string) => void;
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
  isReadMode: false,
  setIsReadMode: (isReadMode) => {
    set({ isReadMode });
  },
  url: '',
  setUrl: (url) => {
    set({ url });
  },
  title: '',
  setTitle: (title) => {
    set({ title });
  },
  fromPath: '',
  setFromPath: (path) => {
    set({ fromPath: path });
  },
}));

export default useBookmarkStore;
