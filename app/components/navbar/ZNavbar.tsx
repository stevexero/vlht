'use client';

import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import AuthNav from './AuthNav';
// import { logoutAction } from '@/app/lib/actions/actions';
import SocialLink from '@/app/ui/links/SocialLink';
import {
  IoIosPhonePortrait,
  IoMdMail,
  IoLogoInstagram,
  IoLogoYoutube,
} from 'react-icons/io';
import { IoLogoTiktok } from 'react-icons/io5';
import { HiBars3 } from 'react-icons/hi2';

interface NavbarProps {
  user: User | null;
}

export default function ZNavbar({ user }: NavbarProps) {
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);

  // const handleLogout = async () => {
  //   await logoutAction();
  // };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 69) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  if (
    pathname === '/signup' ||
    pathname === '/login' ||
    pathname === '/verify-email' ||
    pathname.startsWith('/dashboard')
  ) {
    return <AuthNav pathname={pathname} user={user} />;
  }

  return (
    <div
      className={`w-full flex flex-col fixed top-0 left-0 right-0 z-50 ${
        isScrolled
          ? 'bg-blue-950/50 backdrop-blur-md shadow-md shadow-black'
          : 'bg-transparent'
      } transition-all duration-300`}
    >
      <div className='w-full flex items-center justify-between'>
        <div
          className={`w-full max-w-7xl border-b-1 border-amber-100/25 mx-auto flex items-center justify-between ${
            isScrolled ? 'py-1 px-4 xl:px-0' : 'py-4 px-4 xl:px-0'
          } transition-all duration-300`}
        >
          <Link href='/' className='flex items-center'>
            <Image
              src='/images/z_vlht_logo.png'
              alt='logo'
              width={70}
              height={40}
              className={`${
                isScrolled
                  ? 'w-[46.67px] h-[32px] md:w-[46.67px] md:h-[32px]'
                  : 'w-[46.67px] h-[32px] md:w-[70px] md:h-[48px]'
              } transition-all duration-300`}
            />
            <div
              className={`hidden md:flex ml-1.5 text-white ${
                isScrolled ? 'flex-row items-center' : 'flex-col items-end'
              } transition-all duration-300`}
            >
              <p
                className={`font-bold ${
                  isScrolled ? 'text-lg' : 'text-2xl mt-3'
                } transition-all duration-300`}
              >
                VEGAS LUXURY
              </p>
              <p
                className={`opacity-70 ${
                  isScrolled ? 'text-xs mt-1 ml-1' : 'text-sm -mt-1'
                } transition-all duration-300`}
              >
                Home Tours
              </p>
            </div>
          </Link>
          <div className='flex items-center text-white'>
            <div className='hidden md:flex flex-col items-end'>
              <Link
                href='tel:+17024177839'
                className='font-bold hover:text-amber-300 transition-colors duration-300'
              >
                +1 (702) 417-7839
              </Link>
              <Link
                href='mailto:vegasluxuryhometours@aol.com'
                className='opacity-70 text-sm -mt-1 hover:text-amber-300 transition-colors duration-300'
              >
                vegasluxuryhometours@aol.com
              </Link>
            </div>
            <Link href='tel:+17024177839' className='hidden md:block mr-8'>
              <IoIosPhonePortrait size={40} />
            </Link>
            <div className='flex items-center text-white md:border-l-1 border-amber-100/25'>
              <HiBars3 className='w-8 h-8 md:w-10 md:h-10 ml-8 cursor-pointer hover:text-amber-300 transition-colors duration-300' />
            </div>
          </div>
        </div>
      </div>
      <div className='grid w-full max-w-7xl px-4 xl:px-0 grid-cols-1 md:grid-cols-2 mx-auto'>
        <div className='col-span-1 flex justify-center md:justify-start'>
          <div
            className={`flex gap-6 ${
              isScrolled ? 'py-1' : 'py-4'
            } transition-all duration-300`}
          >
            <SocialLink
              href='https://www.instagram.com/lasvegasluxuryhometours/'
              icon={<IoLogoInstagram size={24} />}
            />
            <SocialLink
              href='https://www.youtube.com/channel/UC7EEt0BXJDJIgfGKEHzeVKw'
              icon={<IoLogoYoutube size={24} />}
            />
            <SocialLink
              href='https://www.tiktok.com/@las_vegasrealestate?_t=ZT-8wME5QcigEV&_r=1'
              icon={<IoLogoTiktok size={24} />}
            />
            <SocialLink
              href='mailto:vegasluxuryhometours@aol.com'
              icon={<IoMdMail size={24} />}
              className='block md:hidden'
            />
            <SocialLink
              href='tel:+17024177839'
              icon={<IoIosPhonePortrait size={24} />}
              className='block md:hidden'
            />
          </div>
        </div>
        <nav
          className={`hidden md:flex col-span-1 items-center justify-end text-white font-bold`}
        >
          <Link
            href='/about'
            className={`hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300 ${
              isScrolled ? 'py-1' : 'py-4'
            } transition-all duration-300`}
          >
            ABOUT
          </Link>
          <Link
            href='/reviews'
            className={`ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300 ${
              isScrolled ? 'py-1' : 'py-4'
            } transition-all duration-300`}
          >
            REVIEWS
          </Link>
          <Link
            href='/blog'
            className={`ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300 ${
              isScrolled ? 'py-1' : 'py-4'
            } transition-all duration-300`}
          >
            BLOG
          </Link>
          {/* <Link
            href='/feed'
            className={`ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300 ${
              isScrolled ? 'py-1' : 'py-4'
            } transition-all duration-300`}
          >
            FEED
          </Link> */}
          <Link
            href='/contact'
            className={`ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300 ${
              isScrolled ? 'py-1' : 'py-4'
            } transition-all duration-300`}
          >
            CONTACT
          </Link>
          <Link
            href='/book'
            // className={`ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300 ${
            className={`ml-12 px-4 bg-amber-300 text-blue-950 hover:bg-amber-200 hover:text-blue-800 border-t border-transparent hover:border-amber-200 ${
              isScrolled ? 'py-1' : 'py-4'
            } transition-all duration-300`}
          >
            BOOK NOW
          </Link>
        </nav>
      </div>
    </div>
  );
}
