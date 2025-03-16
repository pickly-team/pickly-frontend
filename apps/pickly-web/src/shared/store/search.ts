import { create } from 'zustand';

interface SearchStore {
  keyword: string;
  setKeyword: (keyword: string) => void;
  selectedMemberId: number;
  setSelectedMemberId: (memberId: number) => void;
}

const useSearchStore = create<SearchStore>((set) => ({
  keyword: '',
  setKeyword: (keyword) => {
    set({ keyword });
  },
  selectedMemberId: 0,
  setSelectedMemberId: (memberId) => {
    set({ selectedMemberId: memberId });
  },
}));

export default useSearchStore;
