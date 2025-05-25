import { create } from 'zustand';

interface PostsStore {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;

  isMenuBarMinimized: boolean;
  setIsMenuBarMinimized: (isMenuBarMinimized: boolean) => void;

  showPreview: boolean;
  setShowPreview: (showPreview: boolean) => void;
}

export const usePostsStore = create<PostsStore>((set) => ({
  isFullScreen: false,
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),

  isMenuBarMinimized: false,
  setIsMenuBarMinimized: (isMenuBarMinimized) => set({ isMenuBarMinimized }),

  showPreview: false,
  setShowPreview: (showPreview) => set({ showPreview }),
}));
