import Image from 'next/image';
import Link from 'next/link';
import { IoIosPhonePortrait } from 'react-icons/io';
import { HiBars3 } from 'react-icons/hi2';

export default function ZNavbar() {
  return (
    <div className='w-full flex flex-col absolute top-0 left-0 right-0 z-50'>
      <div className='w-full flex items-center justify-between'>
        <div className='w-full max-w-7xl py-4 border-b-1 border-amber-100/25 mx-auto flex items-center justify-between'>
          <Link href='/' className='flex items-center'>
            <Image
              src='/images/z_vlht_logo.png'
              alt='logo'
              width={70}
              height={40}
            />
            <div className='flex flex-col items-end ml-1.5 text-white'>
              <p className='text-2xl font-bold mt-3'>VEGAS LUXURY</p>
              <p className='opacity-70 text-sm -mt-1'>Home Tours</p>
            </div>
          </Link>
          <div className='flex items-center text-white'>
            <div className='flex flex-col items-end'>
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
            <IoIosPhonePortrait size={40} className='mr-8' />
            <div className='flex items-center px-1 text-white border-l-1 border-amber-100/25'>
              <HiBars3
                size={40}
                className='ml-8 cursor-pointer hover:text-amber-300 transition-colors duration-300'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full max-w-7xl grid grid-cols-2 mx-auto'>
        <div className='col-span-1'></div>
        <nav className='col-span-1 flex items-center justify-end text-white font-bold'>
          <Link
            href='/about'
            className='pt-4 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300'
          >
            ABOUT
          </Link>
          <Link
            href='/reviews'
            className='pt-4 ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300'
          >
            REVIEWS
          </Link>
          <Link
            href='/blog'
            className='pt-4 ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300'
          >
            BLOG
          </Link>
          <Link
            href='/feed'
            className='pt-4 ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300'
          >
            FEED
          </Link>
          <Link
            href='/contact'
            className='pt-4 ml-16 hover:text-amber-300 border-t border-transparent hover:border-amber-300 transition-all duration-300'
          >
            CONTACT
          </Link>
        </nav>
      </div>
    </div>
  );
}
