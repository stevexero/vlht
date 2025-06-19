'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/app/store/bookingStore';

interface Schedule {
  user_id: string;
  monday?: boolean;
  tuesday?: boolean;
  wednesday?: boolean;
  thursday?: boolean;
  friday?: boolean;
  saturday?: boolean;
  sunday?: boolean;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
}

export default function Tourista({
  schedules,
  allProfiles,
}: {
  schedules: Schedule[];
  allProfiles: Profile[];
}) {
  const { selectedDate, setSelectedTourista, selectedTourista } =
    useBookingStore();
  const [touristas, setTouristas] = useState<Profile[]>([]);

  useEffect(() => {
    if (!selectedDate || !schedules) {
      setTouristas([]);
      return;
    }

    const dayOfWeek = new Date(selectedDate)
      .toLocaleString('en-US', { weekday: 'long' })
      .toLowerCase();

    // Filter schedules for the selected day
    const availableSchedules = schedules.filter(
      (schedule: Schedule) => schedule[dayOfWeek as keyof Schedule] === true
    );

    // Get unique user_ids
    const userIds = [
      ...new Set(availableSchedules.map((s: Schedule) => s.user_id)),
    ];
    const profiles = allProfiles.filter((profile) =>
      userIds.includes(profile.id)
    );
    setTouristas(profiles);
  }, [selectedDate, schedules, allProfiles]);

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
        <h3 className='text-xl font-bold text-gray-800'>Touristas</h3>
        <p className='text-sm text-gray-800 mt-2'>
          {selectedDate || 'Select date from calendar'}
        </p>
      </div>
      {touristas.length > 0 ? (
        <div className='grid grid-cols-3 gap-2 overflow-y-scroll max-h-[300px]'>
          {touristas.map((tourista, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`
                p-2 border rounded-lg cursor-pointer text-center
                ${
                  selectedTourista === tourista.id
                    ? 'bg-amber-100 border-amber-300'
                    : 'bg-white border-gray-200 hover:bg-amber-50'
                }
              `}
              onClick={() => setSelectedTourista(tourista.id)}
            >
              <span className='font-semibold text-gray-700'>
                {tourista.first_name} {tourista.last_name}
              </span>
            </motion.div>
          ))}
        </div>
      ) : selectedDate ? (
        <p className='text-gray-500 mt-4'>
          No touristas available for this date.
        </p>
      ) : null}
    </div>
  );
}
