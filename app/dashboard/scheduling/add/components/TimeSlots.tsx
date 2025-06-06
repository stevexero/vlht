'use client';

import { useSchedulingStore } from '@/app/store/schedulingStore';
import { useEffect, useState } from 'react';

interface TimeSlot {
  value: string;
  label: string;
}

export default function TimeSlots() {
  const {
    getDayTimeSlot,
    selectedDay,
    selectedInterval,
    allAvailableDays,
    toggleTimeSlot,
    getSelectedTimeSlots,
  } = useSchedulingStore();

  const timeSlot = getDayTimeSlot(allAvailableDays ? 'all' : selectedDay);
  const startTime = timeSlot.startTime;
  const endTime = timeSlot.endTime;

  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

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
  }, [startTime, endTime, selectedInterval, selectedDay, allAvailableDays]);

  const handleTimeSlotClick = (timeValue: string) => {
    toggleTimeSlot(allAvailableDays ? 'all' : selectedDay, timeValue);
  };

  const selectedSlots = getSelectedTimeSlots(
    allAvailableDays ? 'all' : selectedDay
  );

  return (
    <div>
      <h3 className='font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
        Available Time Slots
      </h3>
      <div className='grid grid-cols-3 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-300 bg-neutral-100 rounded-lg inset-shadow-2xs inset-shadow-gray-400/50 mt-2'>
        {timeSlots.map((slot) => (
          <button
            key={slot.value}
            className={`p-2 text-sm border rounded shadow-xs shadow-gray-400/50 transition-colors cursor-pointer ${
              selectedSlots.includes(slot.value)
                ? 'bg-blue-50 border-blue-300 hover:bg-red-50 hover:border-red-300'
                : 'bg-white border-gray-200 hover:bg-blue-50 hover:border-blue-300'
            }`}
            onClick={() => handleTimeSlotClick(slot.value)}
          >
            {slot.label}
          </button>
        ))}
      </div>
    </div>
  );
}
