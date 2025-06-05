'use client';

import { useSchedulingStore } from '@/app/store/schedulingStore';
import { useEffect, useState } from 'react';

interface DaysOfAvailabilityProps {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

interface TimeSlot {
  value: string;
  label: string;
}

export default function Time({
  daysOfAvailability,
  userId,
}: {
  daysOfAvailability: DaysOfAvailabilityProps;
  userId: string;
}) {
  const { selectedInterval } = useSchedulingStore();

  const [days, setDays] = useState<DaysOfAvailabilityProps>(daysOfAvailability);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [endTime, setEndTime] = useState<string>('17:00');
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  useEffect(() => {
    setDays(daysOfAvailability);
  }, [daysOfAvailability]);

  // Format day name for display (capitalize first letter)
  const formatDayName = (day: string) => {
    return day.charAt(0).toUpperCase() + day.slice(1);
  };

  // Get available days (where value is true)
  const availableDays = Object.entries(days)
    .filter(([key, isAvailable]) => isAvailable && key !== 'user_id')
    .map(([day]) => day);

  // Generate time slots based on interval
  useEffect(() => {
    const slots: TimeSlot[] = [];
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    const currentTime = new Date();
    currentTime.setHours(startHour, startMinute, 0);

    const endDateTime = new Date();
    endDateTime.setHours(endHour, endMinute, 0);

    while (currentTime <= endDateTime) {
      const hours = currentTime.getHours().toString().padStart(2, '0');
      const minutes = currentTime.getMinutes().toString().padStart(2, '0');
      const timeString = `${hours}:${minutes}`;

      slots.push({
        value: timeString,
        label: new Date(`2000-01-01T${timeString}`).toLocaleTimeString(
          'en-US',
          {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          }
        ),
      });

      currentTime.setMinutes(currentTime.getMinutes() + selectedInterval);
    }

    setTimeSlots(slots);
  }, [startTime, endTime, selectedInterval]);

  console.log(userId);

  return (
    <div className='flex flex-col gap-4 mt-4 bg-white rounded-lg p-4'>
      <div>
        <h3 className='text-lg font-bold'>Day</h3>
        <p className='text-sm text-gray-500 mb-2'>Select available day</p>
        <select
          name='days'
          id='days'
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
        >
          {availableDays.length > 0 ? (
            availableDays.map((day) => (
              <option key={day} value={day}>
                {formatDayName(day)}
              </option>
            ))
          ) : (
            <option value=''>No available days</option>
          )}
        </select>
      </div>

      <div className='grid grid-cols-2 gap-4'>
        <div>
          <h3 className='text-lg font-bold'>Start Time</h3>
          <p className='text-sm text-gray-500 mb-2'>Select start time</p>
          <input
            type='time'
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
          />
        </div>

        <div>
          <h3 className='text-lg font-bold'>End Time</h3>
          <p className='text-sm text-gray-500 mb-2'>Select end time</p>
          <input
            type='time'
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
          />
        </div>
      </div>

      <div>
        <h3 className='text-lg font-bold'>Available Time Slots</h3>
        <p className='text-sm text-gray-500 mb-2'>
          Select available time slots
        </p>
        <div className='grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-300 rounded-lg'>
          {timeSlots.map((slot) => (
            <button
              key={slot.value}
              className='p-2 text-sm border border-gray-200 rounded hover:bg-amber-50 hover:border-amber-300 transition-colors'
            >
              {slot.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
