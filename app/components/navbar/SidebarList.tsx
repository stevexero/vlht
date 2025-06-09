'use client';

import ListItemLink from '@/app/ui/links/ListItemLink';
import { IoMdSettings } from 'react-icons/io';
import { MdDashboard, MdPostAdd } from 'react-icons/md';
import { useNavStore } from './navStore';
import { IoCalendarOutline } from 'react-icons/io5';
import ListItemDropdown from '@/app/ui/dashboard/dropdowns/ListItemDropdown';
import { FaAngleDown, FaClipboardUser } from 'react-icons/fa6';

export default function SidebarList() {
  const { isOpen, isMobileOpen, setIsMobileOpen } = useNavStore();

  const closeMobileMenu = () => {
    if (isMobileOpen) {
      setIsMobileOpen(false);
    }
  };

  const settingsItems = [
    <div key='rols'>
      <ListItemLink
        href={`/dashboard/roles`}
        icon={
          <>
            <FaAngleDown className='rotate-45 opacity-50' />
            <FaClipboardUser />
          </>
        }
        text='Roles'
        onClick={closeMobileMenu}
      />
    </div>,
  ];

  return (
    <ul className='flex flex-col mt-0 md:mt-8 ml-8 md:ml-0'>
      <ListItemLink
        href={`/dashboard`}
        icon={
          <MdDashboard className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-4'}`} />
        }
        text='Dashboard'
        className={isOpen ? 'mt-4' : ''}
        onClick={closeMobileMenu}
      />
      <ListItemLink
        href={`/dashboard/scheduling`}
        icon={
          <IoCalendarOutline
            className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-[2px]'}`}
          />
        }
        text='Scheduling'
        onClick={closeMobileMenu}
      />
      <ListItemLink
        href={`/dashboard/posts`}
        icon={
          <MdPostAdd
            className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-[2px]'}`}
          />
        }
        text='Posts'
        onClick={closeMobileMenu}
      />
      <ListItemDropdown
        title='Settings'
        icon={
          <IoMdSettings
            className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-[2px]'}`}
          />
        }
        items={settingsItems}
      />
    </ul>
  );
}
