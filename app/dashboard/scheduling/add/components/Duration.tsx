'use client';

import { useSchedulingStore } from '@/app/store/schedulingStore';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import Selector from '@/app/ui/dashboard/dropdowns/Selector';
import CheckBox from '@/app/ui/dashboard/input/CheckBox';
import React, { useState, useEffect } from 'react';

const INTERVALS = [
  { key: '1', label: '1 minute' },
  { key: '5', label: '5 minutes' },
  { key: '10', label: '10 minutes' },
  { key: '15', label: '15 minutes' },
  { key: '30', label: '30 minutes' },
  { key: '60', label: '1 hour' },
] as const;

const generateMaxDurationOptions = () => {
  const options = [];
  for (let hours = 1; hours <= 24; hours++) {
    options.push({
      key: (hours * 60).toString(),
      label: `${hours} ${hours === 1 ? 'hour' : 'hours'}`,
    });
  }
  return options;
};

const generateDurationOptions = (interval: number, maxMinutes: number) => {
  const options = [];
  for (let minutes = interval; minutes <= maxMinutes; minutes += interval) {
    let label = `${minutes} minutes`;

    if (minutes % 60 === 0) {
      const hours = minutes / 60;
      label += ` (${hours} ${hours === 1 ? 'hour' : 'hours'})`;
    } else if (minutes % 30 === 0) {
      const hours = minutes / 60;
      label += ` (${hours} hours)`;
    }

    options.push({
      key: minutes.toString(),
      label,
    });
  }

  return options;
};

export default function Duration() {
  const { duration, setDuration } = useSchedulingStore();
  const [interval, setInterval] = useState(5);
  const [maxMinutes, setMaxMinutes] = useState(600);
  const [durationOptions, setDurationOptions] = useState(
    generateDurationOptions(interval, maxMinutes)
  );

  useEffect(() => {
    setDurationOptions(generateDurationOptions(interval, maxMinutes));
    // Reset duration if it's not a valid option with the new interval
    if (duration % interval !== 0 || duration > maxMinutes) {
      setDuration(interval);
    }
  }, [interval, maxMinutes, duration, setDuration]);

  const handleIntervalChange = (value: string) => {
    setInterval(Number(value));
  };

  return (
    <DashboardCard title='Duration' containerStyles='mt-4'>
      <div className='flex flex-col gap-4'>
        <div className='flex flex-col'>
          <label className='text-sm text-gray-500'>Duration Interval</label>
          <div className='flex flex-wrap gap-4'>
            {INTERVALS.map(({ key, label }) => (
              <CheckBox
                key={key}
                checked={interval === Number(key)}
                onChange={() => handleIntervalChange(key)}
                label={label}
              />
            ))}
          </div>
        </div>
        <div>
          <Selector
            id='maxDuration'
            options={generateMaxDurationOptions()}
            selectedValue={maxMinutes.toString()}
            setSelectedValue={(value) => setMaxMinutes(Number(value))}
            defaultOptionValue='600'
            defaultOptionLabel='10 hours'
            label='Maximum Duration'
          />
        </div>
        <div>
          <Selector
            id='duration'
            options={durationOptions}
            selectedValue={duration.toString()}
            setSelectedValue={(value) => setDuration(Number(value))}
            defaultOptionValue={interval.toString()}
            defaultOptionLabel={`${interval} minutes`}
            label='Duration'
          />
        </div>
      </div>
    </DashboardCard>
  );
}
