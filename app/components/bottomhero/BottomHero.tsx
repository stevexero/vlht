'use client';

import { FC } from 'react';
import Link from 'next/link';

const BottomHero: FC = () => {
  return (
    <div className='w-full flex items-center justify-center py-40 md:py-32 px-4 md:px-0'>
      <div className='max-w-5xl w-full flex flex-col items-center justify-center text-center'>
        <p className='font-cinzel text-gray-200 sm:text-[30px] md:text-[36px] lg:text-[56px] md:text-center sm:text-left sm:leading-[43px] sm:mx-6 md:mx-0'>
          Let us do the research and create a tour of the Las Vegas luxury
          lifestyle tailored just for you.
        </p>
        <Link
          href='/book'
          className='font-cinzel-decorative font-bold text-lg text-amber-600 hover:text-amber-400 mt-16'
        >
          BOOK YOUR TOUR NOW
        </Link>
      </div>
    </div>
  );
};

export default BottomHero;
