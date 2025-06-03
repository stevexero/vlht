'use client';

import { HiHashtag } from 'react-icons/hi';
import { Tooltip } from 'react-tooltip';
import { usePostsStore } from '@/app/store/postsStore';

export default function Tags() {
  const { setShowTagsModal } = usePostsStore();

  const openTagsModal = () => {
    setShowTagsModal(true);
  };

  return (
    <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
      <Tooltip id='tags' />
      <button
        onClick={openTagsModal}
        className={`p-2 rounded hover:bg-gray-700 hover:text-white cursor-pointer`}
        aria-label='Tags'
        data-tooltip-id='tags'
        data-tooltip-content='Tags'
        data-tooltip-place='bottom'
      >
        <HiHashtag />
      </button>
    </div>
  );
}
