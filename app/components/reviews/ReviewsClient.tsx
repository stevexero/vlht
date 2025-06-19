'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { IoMdArrowDroprightCircle, IoMdQuote } from 'react-icons/io';

interface Review {
  author_name: string;
  author_url: string;
  profile_photo_url: string;
  rating: number;
  relative_time_description: string;
  text: string;
}

export default function ReviewsClient({ reviews }: { reviews: Review[] }) {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 50000], [0, -2000]);

  function truncateText(text: string, maxLength: number) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }

  function renderStars(rating: number) {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    // Add filled stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg
          key={`star-${i}`}
          className='w-4 h-4 text-yellow-400 fill-current'
          viewBox='0 0 20 20'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      );
    }

    // Add half star if needed
    if (hasHalfStar) {
      stars.push(
        <svg
          key='star-half'
          className='w-4 h-4 text-yellow-400 fill-current'
          viewBox='0 0 20 20'
        >
          <defs>
            <linearGradient id='halfStar'>
              <stop offset='50%' stopColor='#fbbf24' />
              <stop offset='50%' stopColor='transparent' />
            </linearGradient>
          </defs>
          <path
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
            fill='url(#halfStar)'
          />
        </svg>
      );
    }

    // Add empty stars to complete 5 stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg
          key={`empty-star-${i}`}
          className='w-4 h-4 text-gray-400 fill-current'
          viewBox='0 0 20 20'
        >
          <path d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z' />
        </svg>
      );
    }

    return stars;
  }

  return (
    <div className='relative w-full min-h-[80rem] md:min-h-[50rem] xl:min-h-[40rem] overflow-hidden'>
      <div
        className='absolute inset-0'
        style={{
          backgroundImage: `url('/images/reviews_bg.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'top',
          backgroundRepeat: 'no-repeat',
        }}
      />
      <div className='absolute inset-0 bg-white/50 flex flex-col justify-center px-4 xl:px-0'>
        <motion.div
          className='w-full max-w-7xl mx-auto mt-24'
          style={{
            y: yBg,
          }}
        >
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {reviews.map((review) => (
              <div
                key={review.author_url}
                className='bg-gradient-to-br from-blue-950/90 via-blue-700/90 to-blue-950/90 backdrop-blur-sm shadow-lg shadow-black/50 p-4 rounded-lg'
              >
                <div className='flex items-center justify-between'>
                  <div>
                    <div className='flex items-center gap-1'>
                      {renderStars(review.rating)}&nbsp;
                      <span className='text-xs text-gray-300'>
                        {review.rating}/5
                      </span>
                    </div>
                    <div className='text-xs text-gray-300'>
                      {review.relative_time_description}
                    </div>
                  </div>
                  <div>
                    <IoMdQuote className='text-blue-500' size={72} />
                  </div>
                </div>
                <div className='flex items-center gap-2 mt-2'>
                  <Image
                    src={review.profile_photo_url}
                    alt={review.author_name}
                    width={50}
                    height={50}
                    className='rounded-full'
                  />
                  <h6 className='text-sm font-bold text-white'>
                    {review.author_name}
                  </h6>
                </div>
                <p className='text-sm text-gray-300 mt-4 font-semibold'>
                  {truncateText(review.text, 180)}
                </p>
                <Link
                  href={review.author_url}
                  target='_blank'
                  className='text-white underline text-xs mt-4 text-right w-full block hover:text-amber-200'
                >
                  Read Full Review
                </Link>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div
          className='w-full max-w-7xl mx-auto flex justify-end mt-12'
          style={{
            y: yBg,
          }}
        >
          <Link
            href='https://www.google.com/maps/place/Las+Vegas+Luxury+Home+Tours/@36.0699712,-115.1763,892m/data=!3m1!1e3!4m14!1m5!8m4!1e1!2s102060249151251186536!3m1!1e1!3m7!1s0x80c8c59a9976a505:0x4d781841bb2a2e8c!8m2!3d36.0699669!4d-115.1737251!9m1!1b1!16s%2Fg%2F11x20g8bv9?entry=ttu&g_ep=EgoyMDI1MDYxNi4wIKXMDSoASAFQAw%3D%3D'
            className='button w-full bg-gradient-to-r from-blue-950/90 via-blue-700/90 to-blue-950/90 md:w-48 border-2 border-amber-200 text-amber-200 backdrop-blur-sm shadow-lg shadow-black/50'
            target='_blank'
          >
            All Reviews
            <IoMdArrowDroprightCircle className='icon' size={24} />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
