'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useBookingStore } from '@/app/store/store';

interface TimeSlotReferenceProps {
  id: string;
  slot_time: string;
  available: boolean;
}

interface ScheduleProps {
  id: string;
  user_id: string;
  name: string;
  days: string;
  time_interval: number;
  duration: number;
  start_time: string;
  end_time: string;
}

interface ScheduleTimeSlotProps {
  id: string;
  schedule_id: string;
  day: string;
  slot_time_id: number;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
}

export default function TimeCard({
  timeSlotsReference,
  schedules,
  scheduleTimeSlots,
  allProfiles,
}: {
  timeSlotsReference: TimeSlotReferenceProps[];
  schedules: ScheduleProps[];
  scheduleTimeSlots: ScheduleTimeSlotProps[][];
  allProfiles: Profile[];
}) {
  const {
    setSelectedTime,
    selectedDate,
    selectedTime,
    selectedTourista,
    setSelectedTourista,
  } = useBookingStore();
  const [timeSlots, setTimeSlots] = useState<TimeSlotReferenceProps[]>([]);

  useEffect(() => {
    if (!selectedDate || schedules.length === 0 || !selectedTourista) {
      setTimeSlots([]);
      return;
    }

    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.getDay();
    const dayNames = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const selectedDayName = dayNames[dayOfWeek];

    // Find schedules for the selected tourista
    const touristaSchedules = schedules.filter(
      (schedule) => schedule.user_id === selectedTourista
    );

    // Get the schedule IDs for the selected tourista
    const touristaScheduleIds = touristaSchedules.map((s) => s.id);

    // Flatten all schedule time slots into a single array
    const allScheduleTimeSlots = scheduleTimeSlots.flat();

    // Get all available slot_time_ids for the selected day and selected tourista
    const availableSlotTimeIds = allScheduleTimeSlots
      .filter(
        (slot) =>
          touristaScheduleIds.includes(slot.schedule_id) &&
          (slot.day === selectedDayName || slot.day === 'all')
      )
      .map((slot) => slot.slot_time_id);

    // Filter time slots that are actually available
    const availableTimeSlots = timeSlotsReference
      .filter((slot) => availableSlotTimeIds.includes(parseInt(slot.id)))
      .map((slot) => ({
        ...slot,
        available: true,
      }));

    setTimeSlots(availableTimeSlots);

    // If there are no available time slots for the selected tourista, clear the selection
    if (selectedTourista && availableTimeSlots.length === 0) {
      setSelectedTourista('');
    }
  }, [
    selectedDate,
    schedules,
    timeSlotsReference,
    scheduleTimeSlots,
    selectedTourista,
    setSelectedTourista,
  ]);

  // Find the selected tourista's profile
  const selectedTouristaProfile = allProfiles.find(
    (p) => p.id === selectedTourista
  );

  return (
    <div className='w-full bg-gray-100 rounded-xl shadow-lg p-6 border border-gray-300 mt-4 md:mt-0 relative'>
      <div
        className={`${
          !selectedTourista
            ? 'absolute top-0 left-0 w-full h-full bg-gray-100/90 cursor-not-allowed flex items-center justify-center rounded-xl'
            : ''
        }`}
      >
        {!selectedTourista ? (
          <p className='text-red-900/50 text-center font-semibold text-lg'>
            Please select a Tourista
          </p>
        ) : null}
      </div>
      <div className='w-full flex flex-col items-center justify-center mb-6'>
        <h3 className='text-xl font-bold text-gray-800'>
          Available Time Slots ({timeSlots.length})
        </h3>
        <div className='flex flex-row items-center gap-2'>
          <p className='text-sm text-gray-800 mt-2'>
            {selectedTouristaProfile
              ? `${selectedTouristaProfile.first_name} ${selectedTouristaProfile.last_name}`
              : 'Select tourista'}
          </p>
          <p className='text-sm text-gray-800 mt-2'>-</p>
          <p className='text-sm text-gray-800 mt-2'>
            {selectedDate || 'Select date from calendar'}
          </p>
        </div>
      </div>
      {timeSlots.length > 0 ? (
        <div className='grid grid-cols-3 gap-2 overflow-y-scroll max-h-[300px]'>
          {timeSlots.map((slot, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className={`
              p-2 border rounded-lg cursor-pointer text-center
              ${
                selectedTime === slot.slot_time
                  ? 'bg-amber-100 border-amber-300'
                  : 'bg-white border-gray-200 hover:bg-amber-50'
              }
            `}
              onClick={() => setSelectedTime(slot.slot_time)}
            >
              <span className='font-semibold text-gray-700'>
                {slot.slot_time}
              </span>
            </motion.div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
