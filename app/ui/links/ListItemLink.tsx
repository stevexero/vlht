import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useNavStore } from '@/app/components/navbar/navStore';
import { usePathname } from 'next/navigation';

interface ListItemLinkProps {
  href: string;
  icon: React.ReactNode;
  text: string;
  className?: string;
}

export default function ListItemLink({
  href,
  icon,
  text,
  className,
}: ListItemLinkProps) {
  const { isOpen } = useNavStore();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getLinkClassName = (path: string) => {
    const baseClasses =
      'pl-1 py-1 flex items-center gap-1 rounded hover:bg-gray-100 hover:text-gray-600 cursor-pointer focus:bg-gray-100 focus:text-gray-600 focus:outline-none';
    if (!mounted) return baseClasses;
    return `${baseClasses} ${
      pathname === path ? 'bg-gray-100 text-gray-600' : ''
    }`;
  };

  return (
    <li className={className}>
      <Link href={href} className={getLinkClassName(href)}>
        {icon}
        {isOpen ? text : ''}
      </Link>
    </li>
  );
}
