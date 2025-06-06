'use client';

import { useSchedulingStore } from '@/app/store/schedulingStore';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import CheckBox from '@/app/ui/dashboard/input/CheckBox';
import TimeInput from '@/app/ui/dashboard/input/TimeInput';
import { useEffect, useState } from 'react';
import TimeSlots from './TimeSlots';

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
] as const;

export default function StartEndTime() {
  const {
    allAvailableDays,
    setAllAvailableDays,
    selectedDay,
    days,
    setDayTimeSlot,
    getDayTimeSlot,
  } = useSchedulingStore();

  const [titleExtension, setTitleExtension] = useState(
    'for All Available Days'
  );
  const [currentTimeSlot, setCurrentTimeSlot] = useState(
    getDayTimeSlot(selectedDay)
  );

  const availableDays = DAYS.filter(({ key }) => days[key]);

  const capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  useEffect(() => {
    if (allAvailableDays) {
      setTitleExtension('for All Available Days');
      setCurrentTimeSlot(getDayTimeSlot('all'));
    } else {
      setTitleExtension(`for ${capitalize(selectedDay)}s`);
      setCurrentTimeSlot(getDayTimeSlot(selectedDay));
    }
  }, [allAvailableDays, selectedDay, getDayTimeSlot]);

  const handleTimeChange = (type: 'startTime' | 'endTime', value: string) => {
    const newTimeSlot = {
      ...currentTimeSlot,
      [type]: value,
    };
    setCurrentTimeSlot(newTimeSlot);
    setDayTimeSlot(allAvailableDays ? 'all' : selectedDay, newTimeSlot);
  };

  return (
    <DashboardCard
      title={`Start and End Time ${titleExtension}`}
      containerStyles='mt-4'
    >
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col md:flex-row gap-4 mt-0 md:mt-4'>
          <CheckBox
            checked={allAvailableDays}
            onChange={() => setAllAvailableDays(true)}
            label='All Available Days'
          />
          <CheckBox
            checked={!allAvailableDays}
            onChange={() => setAllAvailableDays(false)}
            label='Specific Days'
            disabled={availableDays.length === 0}
          />
        </div>
        <div className='flex flex-col md:flex-row justify-between gap-4'>
          <TimeInput
            value={currentTimeSlot.startTime}
            onChange={(e) => handleTimeChange('startTime', e.target.value)}
            label='Start Time'
          />
          <TimeInput
            value={currentTimeSlot.endTime}
            onChange={(e) => handleTimeChange('endTime', e.target.value)}
            label='End Time'
          />
        </div>
      </div>
      <hr className='my-4 border-2 border-t-gray-300 border-l-gray-300 border-b-neutral-100 border-r-neutral-100 drop-shadow-xs drop-shadow-white' />
      <TimeSlots />
    </DashboardCard>
  );
}
