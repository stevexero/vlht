'use client';

import { useEffect, useState } from 'react';
import { IoChevronDown } from 'react-icons/io5';
import { useNavStore } from '@/app/components/navbar/navStore';

interface ListItemDropdownProps {
  title: string;
  icon: React.ReactNode;
  items: React.ReactNode[];
}

export default function ListItemDropdown({
  title,
  icon,
  items,
}: ListItemDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { isOpen: isSidebarOpen } = useNavStore();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getClassName = () => {
    const baseClasses =
      'pl-1 py-1 flex items-center justify-between gap-1 rounded hover:bg-gray-100 hover:text-gray-600 cursor-pointer focus:bg-gray-100 focus:text-gray-600 focus:outline-none';
    if (!mounted) return baseClasses;
    return `${baseClasses}`;
  };

  return (
    <>
      <li onClick={() => setIsOpen(!isOpen)}>
        <div className={getClassName()}>
          <div className='flex items-center'>
            {icon}
            {isSidebarOpen && <span>{title}</span>}
          </div>
          <div>
            {isSidebarOpen && (
              <IoChevronDown
                className={`transform transition-transform ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            )}
          </div>
        </div>
      </li>

      {isOpen && isSidebarOpen && (
        <div className='space-y-2'>
          {items.map((item, index) => (
            <div key={index}>{item}</div>
          ))}
        </div>
      )}
    </>
  );
}
