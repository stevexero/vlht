'use client';

import React, { useEffect, useState } from 'react';

export default function CompactBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [month, setMonth] = useState('');
  const [dates, setDates] = useState<{ date: number; day: string }[]>([]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
  };

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    // Get month name
    const monthName = new Date(0, month).toLocaleString('en-US', {
      month: 'long',
    });
    setMonth(monthName);

    // Get dates and days for the month
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Calculate the minimum date (2 days from now)
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);

    const datesWithDays = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return {
        date: i + 1,
        day: date.toLocaleString('en-US', { weekday: 'long' }),
        fullDate: date,
      };
    }).filter(({ fullDate }) => fullDate >= minDate);

    setDates(datesWithDays);
  }, []);

  return (
    <form className='flex flex-col gap-2 p-4' onSubmit={handleSubmit}>
      <label className='text-blue-950 text-sm font-semibold'>
        Book a Tour for {month}{' '}
        <span className='text-red-500 text-xs'>
          - Scroll down to see more dates
        </span>
      </label>
      <div className='w-full flex items-end gap-2'>
        <div className='w-full flex flex-col gap-2'>
          <label
            htmlFor='date'
            className='text-blue-950 text-sm font-semibold -mb-1'
          >
            Date
          </label>
          <select
            name='date'
            id='date'
            className='w-full p-2 rounded-md border border-blue-950 focus:outline-none'
          >
            {dates.map(({ date, day }, index) => (
              <option key={index} value={date}>
                {day}, {month} {date}
              </option>
            ))}
          </select>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label
            htmlFor='time'
            className='text-blue-950 text-sm font-semibold -mb-1'
          >
            Time
          </label>
          <select
            name='time'
            id='time'
            className='w-full p-2 rounded-md border border-blue-950 focus:outline-none'
          >
            <option value='10:00'>10:00 AM</option>
            <option value='11:00'>11:00 AM</option>
            <option value='12:00'>12:00 PM</option>
            <option value='1:00'>1:00 PM</option>
            <option value='2:00'>2:00 PM</option>
            <option value='3:00'>3:00 PM</option>
            <option value='4:00'>4:00 PM</option>
            <option value='5:00'>5:00 PM</option>
          </select>
        </div>
        <div className='w-full flex flex-col gap-2'>
          <label
            htmlFor='numguests'
            className='text-blue-950 text-sm font-semibold -mb-1'
          >
            Number of Guests
          </label>
          <select
            name='numguests'
            id='numguests'
            className='w-full p-2 rounded-md border border-blue-950 focus:outline-none'
          >
            <option value='1'>1</option>
            <option value='2'>2</option>
            <option value='3'>3</option>
            <option value='4'>4</option>
          </select>
        </div>
        <button
          type='submit'
          className='w-1/2 bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 focus:bg-blue-900 transition-colors duration-300 cursor-pointer focus:outline-none'
        >
          {isSubmitting ? 'Booking...' : 'Book'}
        </button>
      </div>
    </form>
  );
}
