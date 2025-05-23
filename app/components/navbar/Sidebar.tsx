'use client';

import { useState } from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { useNavStore } from './navStore';
import { IoMenu } from 'react-icons/io5';
import SidebarList from './SidebarList';
import { usePostsStore } from '@/app/dashboard/posts/add/postsStore';

export default function SideNav() {
  const { isOpen, setIsOpen } = useNavStore();
  const { isFullScreen } = usePostsStore();

  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      {isFullScreen ? null : (
        <div className='md:hidden absolute z-50 top-8 left-0 w-full bg-white border-b border-gray-400'>
          <div className='flex items-center justify-end p-2'>
            {isMobileOpen ? (
              <FaTimes
                className='text-2xl cursor-pointer'
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              />
            ) : (
              <IoMenu
                className='text-2xl cursor-pointer'
                onClick={() => setIsMobileOpen(!isMobileOpen)}
              />
            )}
          </div>
          {isMobileOpen && (
            <div className='absolute top-[41px] left-0 w-full h-[50vh] bg-white border-b border-gray-400'>
              <SidebarList />
            </div>
          )}
        </div>
      )}
      {/* Desktop */}
      <div
        className={`hidden absolute top-0 left-0 h-full border-r border-gray-400 bg-white text-gray-500 text-sm px-1 md:flex flex-col justify-between ${
          isOpen ? 'min-w-48' : ''
        }`}
      >
        <SidebarList />
        <div
          className='pl-1 py-1 mb-4 flex items-center gap-1 rounded hover:bg-gray-100 hover:text-gray-600 cursor-pointer focus:bg-gray-100 focus:text-gray-600 focus:outline-none'
          onClick={() => setIsOpen(!isOpen)}
        >
          <BiFoodMenu
            className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-[2px]'}`}
          />
          {isOpen ? 'Close Sidebar' : ''}
        </div>
      </div>
    </>
  );
}
