'use client';

import ListItemLink from '@/app/ui/links/ListItemLink';
import { IoMdSettings } from 'react-icons/io';
import { MdDashboard, MdPostAdd } from 'react-icons/md';
import { useNavStore } from './navStore';

export default function SidebarList() {
  const { isOpen } = useNavStore();

  return (
    <ul className='flex flex-col mt-0 md:mt-8 ml-8 md:ml-0'>
      <ListItemLink
        href={`/dashboard`}
        icon={
          <MdDashboard className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-4'}`} />
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
      <ListItemLink
        href={`/dashboard/posts`}
        icon={
          <MdPostAdd
            className={`text-lg ${isOpen ? 'mr-2' : 'mr-1 mt-[2px]'}`}
          />
        }
        text='Posts'
      />
    </ul>
  );
}
