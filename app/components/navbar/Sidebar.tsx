'use client';

import { useState } from 'react';
import { BiFoodMenu } from 'react-icons/bi';
import { FaTimes } from 'react-icons/fa';
import { useNavStore } from './navStore';
import ListItemLink from '@/app/ui/links/ListItemLink';
import { IoMdSettings } from 'react-icons/io';
import { MdDashboard } from 'react-icons/md';
import { IoMenu } from 'react-icons/io5';

export default function SideNav() {
  const { isOpen, setIsOpen } = useNavStore();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile */}
      <div className='md:hidden absolute top-8 left-0 w-full bg-white border-b border-gray-400'>
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
            <ul className='flex flex-col mt-0 md:mt-8 ml-8 md:ml-0'>
              <ListItemLink
                href={`/dashboard`}
                icon={<MdDashboard className='text-lg' />}
                text='Dashboard'
              />
              <ListItemLink
                href={`/dashboard/settings`}
                icon={
                  <IoMdSettings
                    className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-[2px]'}`}
                  />
                }
                text='Settings'
              />
            </ul>
          </div>
        )}
      </div>
      {/* Desktop */}
      <div
        className={`hidden absolute top-0 left-0 h-full border-r border-gray-400 bg-white text-gray-500 text-sm px-1 md:flex flex-col justify-between ${
          isOpen ? 'min-w-48' : ''
        }`}
      >
        <ul className='flex flex-col mt-0 md:mt-8 ml-8 md:ml-0'>
          <ListItemLink
            href={`/dashboard`}
            icon={
              <MdDashboard
                className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-4'}`}
              />
            }
            text='Dashboard'
            className={isOpen ? 'mt-4' : ''}
          />
          <ListItemLink
            href={`/dashboard/settings`}
            icon={
              <IoMdSettings
                className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-[2px]'}`}
              />
            }
            text='Settings'
          />
        </ul>
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
