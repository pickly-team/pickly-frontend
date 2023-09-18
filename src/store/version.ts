import { create } from 'zustand';

export const CURRENT_VERSION = '1.0.2';

interface VersionStore {
  version: string;
  setVersion: (version: string) => void;
  buildNumber: string;
  setBuildNumber: (buildNumber: string) => void;
  platform: 'iOS' | 'Android';
  setPlatform: (platform: 'iOS' | 'Android') => void;
}

const useVersionStore = create<VersionStore>((set) => ({
  version: '',
  setVersion: (version) => {
    set({ version });
  },
  buildNumber: '',
  setBuildNumber: (buildNumber) => {
    set({ buildNumber });
  },
  platform: 'iOS',
  setPlatform: (platform) => {
    set({ platform });
  },
}));

export default useVersionStore;
