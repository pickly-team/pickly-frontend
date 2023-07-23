import { create } from 'zustand';

export enum FriendType {
  Follower = 'Follower',
  Following = 'Following',
}

interface FriendStore {
  selectedType: FriendType;
  setSelectedType: (mode: FriendType) => void;
}

const useFriendStore = create<FriendStore>((set) => ({
  selectedType: FriendType.Follower,
  setSelectedType: (selectedType) => {
    set({ selectedType });
  },
}));

export default useFriendStore;
