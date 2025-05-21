import Link from 'next/link';
import Image from 'next/image';

const Hero = () => {
  return (
    <header
      className='relative w-full h-screen'
      style={{
        backgroundImage: `url('/images/z_hero_bg.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div className='absolute inset-0 bg-black/50 flex flex-col items-center justify-center'>
        <div className='w-full max-w-[557px] mx-auto text-center flex flex-col items-center px-4'>
          <h1 className='font-cinzel text-amber-400 sm:text-2xl md:text-[56px] sm:px-5 md:px-0'>
            VEGAS LUXURY BEYOND THE STRIP
          </h1>
          <div className='mt-12'>
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
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
