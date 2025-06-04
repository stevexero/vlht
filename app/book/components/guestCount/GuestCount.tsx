'use client';

import { useBookingStore } from '@/app/store/store';
import { motion } from 'framer-motion';

export default function GuestCount() {
  const { setGuestCount, guestCount } = useBookingStore();

  return (
    <div className='w-full bg-gray-100 rounded-xl shadow-lg p-6 border border-gray-300'>
      <div className='w-full flex flex-col items-center justify-center mb-6'>
        <div className='flex flex-col items-center justify-center'>
          <h3 className='text-xl font-bold text-gray-800'>Number of Guests</h3>
          <p className='text-sm text-gray-800'>(Including yourself)</p>
        </div>
        <div className='flex flex-row gap-4 items-center justify-center mt-4'>
          {[1, 2, 3, 4].map((count) => (
            <motion.div
              key={count}
              whileHover={{ scale: 1.05 }}
              className='relative'
            >
              <input
                type='radio'
                name='guestCount'
                id={count.toString()}
                checked={guestCount === count}
                onChange={() => setGuestCount(count)}
                className='peer sr-only'
              />
              <label
                htmlFor={count.toString()}
                className={`
                  flex items-center justify-center
                  w-12 h-12 rounded-lg cursor-pointer
                  border-2 transition-all duration-200
                  ${
                    guestCount === count
                      ? 'bg-amber-100 border-amber-300 text-amber-900'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-amber-50'
                  }
                `}
              >
                <span className='font-semibold'>{count}</span>
              </label>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
