import { create } from 'zustand';

interface PostsStore {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
}

export const usePostsStore = create<PostsStore>((set) => ({
  isFullScreen: false,
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),
}));
