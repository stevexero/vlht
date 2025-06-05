'use client';

import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import CheckBox from '@/app/ui/dashboard/input/CheckBox';
import { useSchedulingStore } from '@/app/store/schedulingStore';
import { useEffect } from 'react';

interface DaysOfAvailabilityProps {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
] as const;

export default function Days() {
  const { days, setDays, selectedDay, setSelectedDay } = useSchedulingStore();

  const handleDayToggle = (dayKey: keyof DaysOfAvailabilityProps) => {
    setDays({
      ...days,
      [dayKey]: !days[dayKey],
    });
  };

  useEffect(() => {
    if (selectedDay === '') {
      const firstCheckedDay = DAYS.find(({ key }) => days[key]);
      if (firstCheckedDay) {
        setSelectedDay(firstCheckedDay.key);
      }
    }
  }, [selectedDay, setSelectedDay, days]);

  return (
    <DashboardCard title='Days Available' containerStyles='mt-4'>
      <div className='grid grid-cols-2 gap-4 md:flex md:flex-row justify-between'>
        {DAYS.map(({ key, label }) => (
          <CheckBox
            key={key}
            checked={days[key]}
            onChange={() => handleDayToggle(key)}
            label={label}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
