'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { HiBars3, HiXMark } from 'react-icons/hi2';

// Define props interface (empty for now, included for extensibility)
interface NavbarProps {
  logo: string;
}

const Navbar: React.FC<NavbarProps> = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [logoVisibility, setLogoVisibility] = useState<'hidden' | 'visible'>(
    'hidden'
  );
  const [navBackgroundColor, setNavBackgroundColor] =
    useState<string>('bg-transparent');

  // Debounce scroll handler
  const debounce = <T extends (...args: unknown[]) => void>(
    func: T,
    wait: number
  ) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), wait);
    };
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY;
      if (pathname === '/' && scrollTop > 298) {
        setLogoVisibility('visible');
        setNavBackgroundColor('bg-black');
      } else {
        setLogoVisibility('hidden');
        setNavBackgroundColor('bg-transparent');
      }
    }, 100),
    [pathname]
  );

  useEffect(() => {
    // Reset states on pathname change
    if (pathname !== '/') {
      setLogoVisibility('visible');
      setNavBackgroundColor('bg-black');
    } else {
      handleScroll();
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, handleScroll]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-10 transition-colors duration-300 ${
        pathname === '/' ? navBackgroundColor : 'bg-black'
      } md:flex md:items-center md:justify-center`}
    >
      <div className='md:hidden fixed top-4 left-4 z-20'>
        <button onClick={toggleMenu} aria-label='Toggle menu'>
          {menuOpen ? (
            <HiXMark className='w-8 h-8 text-gray-400' />
          ) : (
            <HiBars3 className='w-8 h-8 text-amber-600' />
          )}
        </button>
      </div>

      <div className='hidden md:flex md:max-w-5xl md:w-full md:items-center md:justify-between'>
        <div className='flex space-x-8'>
          <Link
            href='/blog'
            className='font-bold text-2xl text-white hover:text-amber-600 transition-colors'
          >
            Blog
          </Link>
          <Link
            href='/about'
            className='font-bold text-2xl text-white hover:text-amber-600 transition-colors'
          >
            About
          </Link>
        </div>

        <Link href='/'>
          <Image
            src='/images/vlht_logo.png'
            alt='Logo'
            width={130}
            height={50}
            className={`transition-opacity duration-0 ${
              pathname === '/' && logoVisibility === 'hidden'
                ? 'opacity-0'
                : 'opacity-100'
            }`}
            style={{
              visibility: pathname === '/' ? logoVisibility : 'visible',
            }}
            priority
          />
        </Link>

        <div className='flex space-x-8'>
          <Link
            href='/contact'
            className='font-bold text-2xl text-white hover:text-amber-600 transition-colors'
          >
            Contact
          </Link>
          <Link
            href='/book'
            className='font-bold text-2xl text-white hover:text-amber-600 transition-colors'
          >
            Book
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
