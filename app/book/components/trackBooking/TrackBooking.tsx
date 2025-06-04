'use client';

import { useState } from 'react';

export default function TrackBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingNumber, setBookingNumber] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  };
  return (
    <form className='flex flex-col gap-2 p-4' onSubmit={handleSubmit}>
      <label className='text-blue-950 text-sm font-semibold'>
        Track my Booking
      </label>
      <div className='w-full flex flex-col md:flex-row items-end gap-2'>
        <div className='w-full flex flex-col gap-2'>
          <label
            htmlFor='bookingNumber'
            className='text-blue-950 text-sm font-semibold -mb-1'
          >
            Booking Number
          </label>
          <input
            type='text'
            name='bookingNumber'
            id='bookingNumber'
            className='w-full p-1.5 rounded-md border border-blue-950 focus:outline-none'
            value={bookingNumber}
            onChange={(e) => setBookingNumber(e.target.value)}
          />
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label
            htmlFor='email'
            className='text-blue-950 text-sm font-semibold -mb-1'
          >
            Email
          </label>
          <input
            name='email'
            id='email'
            className='w-full p-1.5 rounded-md border border-blue-950 focus:outline-none'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          type='submit'
          className='w-full md:w-1/2 mt-2 md:mt-0 bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 focus:bg-blue-900 transition-colors duration-300 cursor-pointer focus:outline-none'
        >
          {isSubmitting ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
}
