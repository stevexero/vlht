'use client';

import Link from 'next/link';
import Image from 'next/image';

const Reviews = () => {
  return (
    <div className='relative w-full h-[600px] md:h-[700px] sm:h-[800px]'>
      <Image
        src='/images/reviews_bg.jpeg'
        alt='Reviews background'
        fill
        className='object-cover'
        priority
      />
      <div className='absolute inset-0 bg-black/75 flex items-center justify-center'>
        <div className='w-full max-w-5xl mx-auto flex flex-col items-center text-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
          <h1 className='font-cinzel text-amber-400 sm:text-2xl md:text-[56px] sm:px-5 md:px-0'>
            “Every member of our group greatly enjoyed this tour.”
          </h1>
          <p className='font-montserrat font-light text-sm text-white mt-8 sm:text-justify sm:px-7 md:px-0 md:text-center'>
            Erica was great to work with, very accommodating and super pleasant.
            She led the tour so capably and smoothly. The luxury homes were
            beautiful and very fun to tour. We highly recommend this tour for
            anyone interested in architecture, home design and decor or just
            looking for a fun and unique way to see some lovely homes in Las
            Vegas. Well worth the time and money! Thanks Erica!!
          </p>
          <Image
            src='/images/aaron.jpeg'
            alt='Aaron'
            width={56}
            height={56}
            className='mt-8 rounded-full'
          />
          <p className='font-montserrat font-light text-sm text-white mt-2'>
            AARON
          </p>
          <Link
            href='https://www.airbnb.com/experiences/2649345?source=booking_widget&modal=REVIEWS'
            className='font-cinzel-decorative font-bold text-lg text-amber-400 hover:text-amber-300 mt-8'
            target='_blank'
            rel='noreferrer'
          >
            SEE MORE REVIEWS
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
