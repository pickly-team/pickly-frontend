import { create } from 'zustand';

interface Bears {
  bears: number;
  increaseBear: () => void;
  decreaseBear: () => void;
}

const useBearStore = create<Bears>((set) => ({
  bears: 0,
  increaseBear: () => set((state) => ({ bears: state.bears + 1 })),
  decreaseBear: () => set((state) => ({ bears: state.bears - 1 })),
}));

export default useBearStore;
