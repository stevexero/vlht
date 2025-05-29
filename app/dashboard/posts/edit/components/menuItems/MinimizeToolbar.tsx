'use client';

import { usePostsStore } from '@/app/store/store';
import { LiaWindowMinimize } from 'react-icons/lia';
import { Tooltip } from 'react-tooltip';

export default function MinimizeToolbar() {
  const { isMenuBarMinimized, setIsMenuBarMinimized } = usePostsStore();
  return (
    <>
      <Tooltip id='minimize-menu-bar' />
      <button
        onClick={() => setIsMenuBarMinimized(!isMenuBarMinimized)}
        className='block md:hidden p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Full screen'
        data-tooltip-id='full-screen'
        data-tooltip-content='Full Screen'
        data-tooltip-place='bottom'
      >
        <LiaWindowMinimize />
      </button>
    </>
  );
}
