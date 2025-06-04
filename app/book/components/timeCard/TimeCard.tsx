'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/app/store/store';

const timeSlots = [
  { time: '10:00 AM', available: true },
  { time: '11:00 AM', available: true },
  { time: '12:00 PM', available: true },
  { time: '1:00 PM', available: true },
  { time: '2:00 PM', available: true },
  { time: '3:00 PM', available: true },
  { time: '4:00 PM', available: true },
  { time: '5:00 PM', available: true },
  { time: '6:00 PM', available: true },
  { time: '7:00 PM', available: true },
  { time: '8:00 PM', available: true },
  { time: '9:00 PM', available: true },
  { time: '10:00 PM', available: true },
];

export default function TimeCard() {
  const { setSelectedTime, selectedDate, selectedTime } = useBookingStore();

  return (
    <div className='w-full bg-gray-100 rounded-xl shadow-lg p-6 border border-gray-300 mt-4 md:mt-0 relative'>
      <div
        className={`${
          !selectedDate
            ? 'absolute top-0 left-0 w-full h-full bg-gray-100/90 cursor-not-allowed flex items-center justify-center rounded-xl'
            : ''
        }`}
      >
        {!selectedDate ? (
          <p className='text-red-900/50 text-center font-semibold text-lg'>
            Please select a date from the calendar
          </p>
        ) : null}
      </div>
      <div className='w-full flex flex-col items-center justify-center mb-6'>
        <h3 className='text-xl font-bold text-gray-800'>
          Available Time Slots ({timeSlots.length})
        </h3>
        <p className='text-sm text-gray-800 mt-2'>
          {selectedDate || 'Select date from calendar'}
        </p>
      </div>
      <div className='grid grid-cols-3 gap-2 overflow-y-scroll max-h-[300px]'>
        {timeSlots.map((slot, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`
              p-2 border rounded-lg cursor-pointer text-center
              ${
                slot.available
                  ? selectedTime === slot.time
                    ? 'bg-amber-100 border-amber-300'
                    : 'bg-white border-gray-200 hover:bg-amber-50'
                  : 'bg-gray-200 border-gray-300 cursor-not-allowed opacity-50'
              }
            `}
            onClick={() => slot.available && setSelectedTime(slot.time)}
          >
            <span className='font-semibold text-gray-700'>{slot.time}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
