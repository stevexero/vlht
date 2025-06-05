'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import { IoMdArrowDroprightCircle } from 'react-icons/io';

const Hero = () => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 600]);

  return (
    <header className='relative w-full min-h-screen h-[40rem] overflow-hidden'>
      <motion.div
        className='absolute inset-0'
        style={{
          backgroundImage: `url('/images/z_hero_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          y: yBg,
        }}
      />
      <div className='absolute inset-0 bg-black/50 flex flex-col justify-center px-4 xl:px-0'>
        <div className='w-full max-w-6xl mx-auto'>
          <h1
            className='text-amber-200 text-4xl md:text-6xl font-bold mt-12 md:mt-0'
            style={{ fontFamily: 'var(--font-rajdhani)' }}
          >
            Vegas Luxury Beyond The Strip
          </h1>
          <h2 className='text-white text-xl md:text-2xl mt-4 font-bold'>
            Exclusive chauffeured tours of skyline estates and desert-view
            masterpieces
          </h2>
          <p className='text-white mt-4 text-sm md:text-base'>
            Glide past the neon into hillside estates where glass walls meet
            desert skies. Your private guided tour reveals Vegas’ most exclusive
            neighborhoods, letting you effortlessly taste true luxury
          </p>
          <div className='mt-12'>
            <Link
              href='/book'
              className='button w-full md:w-48 border-2 border-amber-200 text-amber-200'
            >
              Book a Tour
              <IoMdArrowDroprightCircle className='icon' size={24} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
