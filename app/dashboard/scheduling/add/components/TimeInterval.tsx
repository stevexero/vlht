'use client';

import { useSchedulingStore } from '@/app/store/schedulingStore';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import CheckBox from '@/app/ui/dashboard/input/CheckBox';

interface TimeInterval {
  value: number;
  label: string;
}

export default function TimeInterval() {
  const { selectedInterval, setSelectedInterval } = useSchedulingStore();

  const timeIntervals: TimeInterval[] = [
    { value: 60, label: '1 Hour' },
    { value: 30, label: '30 Minutes' },
    { value: 15, label: '15 Minutes' },
    { value: 10, label: '10 Minutes' },
    { value: 5, label: '5 Minutes' },
  ];

  return (
    <DashboardCard title='Time Interval' containerStyles='mt-4'>
      <div className='grid grid-cols-2 gap-4 md:flex md:flex-row justify-between'>
        {timeIntervals.map((interval) => (
          <CheckBox
            key={interval.value}
            checked={selectedInterval === interval.value}
            onChange={() => setSelectedInterval(interval.value)}
            label={interval.label}
          />
        ))}
      </div>
    </DashboardCard>
  );
}
