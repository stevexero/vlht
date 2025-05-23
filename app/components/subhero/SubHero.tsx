'use client';

import Link from 'next/link';
import Image from 'next/image';

const SubHero = () => {
  return (
    <div className='w-full flex items-center justify-center py-20'>
      <div className='w-full max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between md:items-center px-4'>
        <div className='w-full md:w-[55%] flex flex-col items-center md:items-start justify-between h-[19rem]'>
          <div className='flex items-center -mt-8'>
            <Image
              src='/images/champagne.png'
              alt='Champagne Bottle'
              width={100}
              height={100}
              className='hidden md:block -ml-3 opacity-50 saturate-50'
            />
            <h1 className='text-blue-800/50 ml-4 sm:text-[30px] md:text-[36px] lg:text-[56px] sm:mb-8 md:mb-0'>
              A Taste of&nbsp;
              <span className='text-amber-400 font-bold'>VIP</span>
            </h1>
          </div>
          <div className='w-full'>
            <p className='text-blue-950/80 md:-mt-8 md:mr-8 md:text-left text-justify sm:px-10 md:px-0'>
              Whether you are looking to invest in Vegas real estate or just
              want to get a taste of how the locals live while seeing some
              beautiful homes, we are happy to give you a personalized tour! Get
              decorating ideas, and be inspired by the creative attention to
              detail these properties possess.
            </p>
          </div>
          <div>
            <Link
              href='/book'
              className='font-cinzel-decorative font-bold text-lg text-amber-600 hover:text-amber-400'
            >
              BOOK YOUR TOUR NOW
            </Link>
          </div>
        </div>
        <div className='hidden md:grid md:w-[45%] h-[19rem] grid-cols-3 gap-7 justify-items-end'>
          {[
            '/images/subhero1.jpeg',
            '/images/subhero2.jpeg',
            '/images/subhero3.jpeg',
            '/images/subhero4.jpeg',
            '/images/hero_img.jpeg',
            '/images/subhero6.jpeg',
          ].map((src, index) => (
            <Image
              key={index}
              src={src}
              alt={`Property ${index + 1}`}
              width={129}
              height={129}
              className='object-cover'
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubHero;
