'use client';

import { useState, useRef, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { FaCircleUser } from 'react-icons/fa6';
import { IoMdSettings } from 'react-icons/io';
import { IoLogOutSharp } from 'react-icons/io5';
import { logoutAction } from '@/app/lib/actions/actions';
import Link from 'next/link';

interface UserMenuProps {
  user: User | null;
}

export default function UserMenu({ user }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className='relative' ref={menuRef}>
      <FaCircleUser
        className='text-2xl cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      />
      {isOpen && (
        <div className='absolute top-full right-0 bg-white shadow-lg rounded-lg mt-12 md:mt-4 text-sm text-gray-400 pb-2 px-1'>
          <div className='px-3 py-2 border-b border-gray-300'>
            <p className='text-gray-500'>{user?.email}</p>
          </div>
          <Link
            href='/dashboard/profile'
            className='px-3 py-1 mt-2 flex items-center gap-1 rounded hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 focus:outline-none cursor-pointer'
            onClick={() => setIsOpen(false)}
          >
            <IoMdSettings />
            <p>Profile Settings</p>
          </Link>
          <form action={logoutAction}>
            <button
              type='submit'
              className='w-full px-3 py-1 flex items-center gap-1 rounded hover:bg-gray-100 hover:text-gray-600 focus:bg-gray-100 focus:text-gray-600 focus:outline-none cursor-pointer'
            >
              <IoLogOutSharp />
              <p>Logout</p>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
