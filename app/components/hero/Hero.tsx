'use client';

import { FC, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Props interface (empty for now)
interface HeroProps {
  logo: string;
}

// Debounce utility
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

const Hero: FC<HeroProps> = () => {
  const [logoWidth, setLogoWidth] = useState<number>(414);
  const [logoVisibility, setLogoVisibility] = useState<'visible' | 'hidden'>(
    'visible'
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = useCallback(
    debounce(() => {
      const scrollTop = window.scrollY;
      if (window.innerWidth <= 320) {
        setLogoWidth(200);
      } else if (window.innerWidth <= 768) {
        setLogoWidth(278);
      } else {
        if (scrollTop > 260) {
          setLogoWidth(130);
        } else {
          setLogoWidth(414);
        }
        if (scrollTop > 298) {
          setLogoVisibility('hidden');
        } else {
          setLogoVisibility('visible');
        }
      }
    }, 100),
    []
  );

  useEffect(() => {
    handleScroll(); // Initial check
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <header
      className='relative w-full h-screen'
      style={{
        backgroundImage: `url('/images/hero_img.jpeg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center'>
        <div className='h-[332px] sm:h-[100px] md:h-[200px] flex items-center justify-center'>
          <Image
            src='/images/vlht_logo.png'
            alt='Logo'
            width={logoWidth}
            height={logoWidth * (50 / 130)} // Maintain aspect ratio
            className={`transition-opacity ${
              logoVisibility === 'hidden' ? 'duration-0' : 'duration-200'
            }`}
            style={{ visibility: logoVisibility }}
            priority
          />
        </div>
        <div className='w-full max-w-[557px] mx-auto text-center flex flex-col items-center px-4'>
          <p className='font-rajdhani font-bold text-white text-shadow-md sm:text-xs md:text-lg'>
            Venture outside of the <br className='md:hidden' />
            <span
              style={{ fontFamily: 'var(--font-allura)' }}
              className='sm:text-2xl md:text-4xl text-amber-500'
            >
              glittering lights{' '}
            </span>
            <br className='md:hidden' />
            of the Vegas Strip and tour <br className='md:hidden' />
            <span className='font-rajdhani font-bold sm:text-lg md:text-2xl text-amber-500'>
              gorgeous homes
            </span>
            <br className='md:hidden' />
            with scenic views along the way.
          </p>
          <p className='font-rajdhani font-bold text-white text-shadow-md sm:text-xs md:text-lg mt-4'>
            You will love the{' '}
            <span className='font-rajdhani font-bold sm:text-lg md:text-2xl text-amber-500'>
              VIP
            </span>{' '}
            treatment <br className='md:hidden' /> as you get a taste of the
            local Vegas <br className='md:hidden' />
            <span className='font-rajdhani font-bold sm:text-lg md:text-2xl text-amber-300'>
              luxury lifestyle!
            </span>
          </p>
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2, type: 'spring' }}
            className='mt-12'
          >
            <Link
              href='/book'
              className='inline-flex items-center justify-center w-60 sm:w-40 h-12 sm:h-10 bg-gradient-to-r from-gray-600 to-gray-200 text-white border-2 border-amber-400 rounded-full shadow-[0_4px_0_black] font-alfa sm:text-sm md:text-lg tracking-wider hover:text-white'
            >
              BOOK NOW
              <Image
                src='/images/right_arrow.svg'
                alt='Arrow'
                width={22}
                height={22}
                className='ml-2 drop-shadow-[1px_1px_0_black]'
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
