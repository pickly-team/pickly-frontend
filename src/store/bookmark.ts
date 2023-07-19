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
}));

export default useBookmarkStore;
