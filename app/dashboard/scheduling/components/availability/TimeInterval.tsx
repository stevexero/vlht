'use client';

import { useSchedulingStore } from '@/app/store/schedulingStore';
import React from 'react';

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
    { value: 1, label: '1 Minute' },
  ];

  return (
    <div className='flex flex-col gap-4 mt-4 bg-white rounded-lg p-4'>
      <div>
        <h3 className='text-lg font-bold'>Time Interval</h3>
        <p className='text-sm text-gray-500 mb-2'>Select time slot duration</p>
        <select
          name='interval'
          id='interval'
          value={selectedInterval}
          onChange={(e) => setSelectedInterval(Number(e.target.value))}
          className='w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
        >
          {timeIntervals.map((interval) => (
            <option key={interval.value} value={interval.value}>
              {interval.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
