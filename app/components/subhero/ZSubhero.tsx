'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BsCalendar3 } from 'react-icons/bs';
import { PiChampagneDuotone } from 'react-icons/pi';

export default function ZSubhero() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 2000], [100, 0]);
  const yImg = useTransform(scrollY, [0, 1000], [100, 0]);

  return (
    <div
      style={{
        backgroundImage: `url('/images/lines.png')`,
      }}
      className='pb-0 lg:pb-8'
    >
      <div className='w-full max-w-7xl mx-auto h-[40rem] flex flex-col md:flex-row md:justify-between'>
        <div
          className='w-1/2 block lg:hidden relative'
          style={{
            backgroundImage: `url('/images/zsubheroimg.png')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        <div className='hidden lg:block w-full md:w-1/2 relative'>
          <motion.div
            className='hidden md:block w-[640px] h-full md:h-[720px] md:absolute md:-top-24 left-0 md:left-8'
            style={{
              backgroundImage: `url('/images/pattern.png')`,
              backgroundSize: 'contain',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              zIndex: 1,
              y: yBg,
            }}
          />
          <div className='hidden md:block w-[525px] h-[657px] bg-amber-200 md:absolute md:-top-4 left-0'>
            <motion.div
              className='hidden md:block w-[525px] h-[657px] md:absolute md:-top-42 left-0 md:left-24 z-10 shadow-2xl'
              style={{
                y: yImg,
              }}
            >
              <Image
                src='/images/zsubheroimg.png'
                alt='ZSubhero'
                width={400}
                height={555}
                className='w-full h-full'
              />
            </motion.div>
          </div>
        </div>
        <div className='h-full w-full md:w-1/2 flex items-center'>
          <div className='p-4 lg:p-32 ml-0 lg:ml-4'>
            <PiChampagneDuotone
              size={48}
              className='opacity-50 text-amber-950/60 mt-8'
            />
            <h3 className='text-4xl font-bold text-amber-950/60 mt-8'>
              A Taste of VIP
            </h3>
            <p className='mt-8 text-sm leading-7'>
              Whether you are looking to invest in Vegas real estate or just
              want to get a taste of how the locals live while seeing some
              beautiful homes, we are happy to give you a personalized tour! Get
              decorating ideas, and be inspired by the creative attention to
              detail these properties possess.
            </p>
            <Link
              href='/book'
              className='flex flex-row items-center gap-4 hover:text-amber-500 transition-all duration-300 mt-8'
            >
              <BsCalendar3 size={32} />
              <span className='text-sm font-bold'>Book your tour</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
