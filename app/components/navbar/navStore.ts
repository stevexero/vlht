// zustand store for the nav

import { create } from 'zustand';

interface NavStore {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;

  isMobileOpen: boolean;
  setIsMobileOpen: (isMobileOpen: boolean) => void;
}

export const useNavStore = create<NavStore>((set) => ({
  isOpen: true,
  setIsOpen: (isOpen) => set({ isOpen }),

  isMobileOpen: false,
  setIsMobileOpen: (isMobileOpen) => set({ isMobileOpen }),
}));
