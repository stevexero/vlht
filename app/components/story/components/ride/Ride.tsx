'use client';

import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Image from 'next/image';

export default function Ride() {
  return (
    <div className='w-full relative h-[1000px] sm:h-[1200px] md:h-[1800px] lg:h-[2700px]'>
      <div className='sticky top-24 sm:top-12 md:top-20 lg:top-16 xl:top-0 z-10'>
        <motion.div
          className='text-[10vh] sm:text-[15vh] md:text-[18vh] lg:text-[20vh] xl:text-[30vh] font-bold text-gray-700'
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ amount: 0, once: true }}
          variants={textVariants}
        >
          RIDE
        </motion.div>
        <motion.div
          className='text-[10vh] sm:text-[15vh] md:text-[18vh] lg:text-[20vh] xl:text-[30vh] font-bold text-gray-700 sm:-mt-[6vh] md:-mt-[8vh] lg:-mt-[10vh] xl:-mt-[12vh]'
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ amount: 0, once: true }}
          variants={textVariants}
        >
          IN
        </motion.div>
        <motion.div
          className='text-[10vh] sm:text-[15vh] md:text-[18vh] lg:text-[20vh] xl:text-[30vh] font-bold text-gray-700 sm:-mt-[6vh] md:-mt-[8vh] lg:-mt-[10vh] xl:-mt-[12vh]'
          initial='offscreen'
          whileInView='onscreen'
          viewport={{ amount: 0, once: true }}
          variants={textVariants}
        >
          LUXURY
        </motion.div>
      </div>
      <div className='w-full absolute bottom-0 lg:bottom-1/3 right-0 flex justify-end'>
        <div className='w-full flex flex-col items-center lg:items-end space-y-0 lg:space-y-4 relative lg:static'>
          {/* Overlay on mobile */}
          <div className='absolute lg:hidden inset-0 w-full h-full bg-amber-200/80 z-20'></div>
          <Image
            src='/images/story1.png'
            alt='Passengers in limo'
            width={800}
            height={800}
            className='w-full lg:w-1/2 shadow-none lg:shadow-lg shadow-blue-950 z-10 lg:z-0'
          />
          <motion.div
            className='text-gray-700 lg:text-amber-300 text-2xl font-bold text-center lg:text-right mr-0 lg:mr-2 p-4 lg:p-0 absolute lg:relative top-1/2 z-20'
            initial='offscreen'
            whileInView='onscreen'
            viewport={{ amount: 0, once: true }}
            variants={sentenceVariants}
          >
            A luxury vehicle will whisk you away beyond the famous strip
          </motion.div>
        </div>
      </div>
    </div>
  );
}

const textVariants: Variants = {
  offscreen: {
    y: 300,
    opacity: 0,
  },
  onscreen: {
    y: -20,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

const sentenceVariants: Variants = {
  offscreen: {
    y: 100,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
      delay: 0.2,
    },
  },
};
