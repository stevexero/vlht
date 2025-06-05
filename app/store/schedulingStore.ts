import { create } from 'zustand';

interface SchedulingStoreProps {
  selectedInterval: number;
  setSelectedInterval: (selectedInterval: number) => void;
}

export const useSchedulingStore = create<SchedulingStoreProps>((set) => ({
  selectedInterval: 60,
  setSelectedInterval: (selectedInterval) => set({ selectedInterval }),
}));
