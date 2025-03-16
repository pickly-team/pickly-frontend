import { create } from 'zustand';

export enum FriendType {
  Follower = 'Follower',
  Following = 'Following',
}

interface FriendStore {
  selectedType: FriendType;
  setSelectedType: (mode: FriendType) => void;
  friendId: number;
  setFriendId: (friendId: number) => void;
}

const useFriendStore = create<FriendStore>((set) => ({
  selectedType: FriendType.Follower,
  setSelectedType: (selectedType) => {
    set({ selectedType });
  },
  friendId: 0,
  setFriendId: (friendId) => {
    set({ friendId });
  },
}));

export default useFriendStore;
