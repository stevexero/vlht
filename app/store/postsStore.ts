import { create } from 'zustand';

interface PostsStore {
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;

  isMenuBarMinimized: boolean;
  setIsMenuBarMinimized: (isMenuBarMinimized: boolean) => void;

  showPreview: boolean;
  setShowPreview: (showPreview: boolean) => void;

  showTagsModal: boolean;
  setShowTagsModal: (showTagsModal: boolean) => void;

  tempTagsList: string[];
  setTempTagsList: (tempTagsList: string[]) => void;

  selectedTag: string;
  setSelectedTag: (selectedTag: string) => void;

  layout: 'grid' | 'list';
  setLayout: (layout: 'grid' | 'list') => void;
}

export const usePostsStore = create<PostsStore>((set) => ({
  isFullScreen: false,
  setIsFullScreen: (isFullScreen) => set({ isFullScreen }),

  isMenuBarMinimized: false,
  setIsMenuBarMinimized: (isMenuBarMinimized) => set({ isMenuBarMinimized }),

  showPreview: false,
  setShowPreview: (showPreview) => set({ showPreview }),

  showTagsModal: false,
  setShowTagsModal: (showTagsModal) => set({ showTagsModal }),

  tempTagsList: [],
  setTempTagsList: (tempTagsList) => set({ tempTagsList }),

  selectedTag: '',
  setSelectedTag: (selectedTag) => set({ selectedTag }),

  layout: 'list',
  setLayout: (layout) => set({ layout }),
}));
