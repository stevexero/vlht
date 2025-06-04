'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function Header() {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 600]);

  return (
    <header className='relative w-full min-h-[32rem] overflow-hidden'>
      <motion.div
        className='absolute inset-0'
        style={{
          backgroundImage: `url('/images/blog_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          y: yBg,
        }}
      />
      <div className='absolute inset-0 bg-black/50 flex flex-col justify-center px-4 xl:px-0'>
        <div className='w-full max-w-7xl mx-auto'></div>
      </div>
    </header>
  );
}
