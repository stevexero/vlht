'use client';

import { usePostsStore } from '@/app/store/store';
import { LuMaximize } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';

export default function FullScreen() {
  const { isFullScreen, setIsFullScreen } = usePostsStore();

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <>
      <Tooltip id='full-screen' />
      <button
        onClick={toggleFullScreen}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Full screen'
        data-tooltip-id='full-screen'
        data-tooltip-content='Full Screen'
        data-tooltip-place='bottom'
      >
        <LuMaximize />
      </button>
    </>
  );
}
