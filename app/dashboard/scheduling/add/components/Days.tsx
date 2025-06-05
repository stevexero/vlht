'use client';

import { useState, useEffect } from 'react';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import CheckBox from '@/app/ui/dashboard/input/CheckBox';

interface DaysOfAvailabilityProps {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

export default function Days({
  daysOfAvailability,
}: {
  daysOfAvailability: DaysOfAvailabilityProps;
}) {
  const [days, setDays] = useState<DaysOfAvailabilityProps>(daysOfAvailability);

  useEffect(() => {
    setDays(daysOfAvailability);
  }, [daysOfAvailability]);

  return (
    <DashboardCard title='Days Available' containerStyles='mt-4'>
      <div className='flex flex-row justify-between'>
        <CheckBox
          checked={days.monday}
          onChange={() =>
            setDays(
              days.monday
                ? { ...days, monday: false }
                : { ...days, monday: true }
            )
          }
          label='Monday'
        />
        <CheckBox
          checked={days.tuesday}
          onChange={() =>
            setDays(
              days.tuesday
                ? { ...days, tuesday: false }
                : { ...days, tuesday: true }
            )
          }
          label='Tuesday'
        />
        <CheckBox
          checked={days.wednesday}
          onChange={() =>
            setDays(
              days.wednesday
                ? { ...days, wednesday: false }
                : { ...days, wednesday: true }
            )
          }
          label='Wednesday'
        />
        <CheckBox
          checked={days.thursday}
          onChange={() =>
            setDays(
              days.thursday
                ? { ...days, thursday: false }
                : { ...days, thursday: true }
            )
          }
          label='Thursday'
        />
        <CheckBox
          checked={days.friday}
          onChange={() =>
            setDays(
              days.friday
                ? { ...days, friday: false }
                : { ...days, friday: true }
            )
          }
          label='Friday'
        />
        <CheckBox
          checked={days.saturday}
          onChange={() =>
            setDays(
              days.saturday
                ? { ...days, saturday: false }
                : { ...days, saturday: true }
            )
          }
          label='Saturday'
        />
        <CheckBox
          checked={days.sunday}
          onChange={() =>
            setDays(
              days.sunday
                ? { ...days, sunday: false }
                : { ...days, sunday: true }
            )
          }
          label='Sunday'
        />
      </div>
    </DashboardCard>
  );
}
