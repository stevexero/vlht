'use client';

import { updateDaysOfAvailability } from '@/app/lib/actions/scheduleActions';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';

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
  userId,
}: {
  daysOfAvailability: DaysOfAvailabilityProps;
  userId: string;
}) {
  const [days, setDays] = useState<DaysOfAvailabilityProps>(daysOfAvailability);
  const router = useRouter();
  useEffect(() => {
    setDays(daysOfAvailability);
  }, [daysOfAvailability]);

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('monday', days.monday.toString());
    formData.append('tuesday', days.tuesday.toString());
    formData.append('wednesday', days.wednesday.toString());
    formData.append('thursday', days.thursday.toString());
    formData.append('friday', days.friday.toString());
    formData.append('saturday', days.saturday.toString());
    formData.append('sunday', days.sunday.toString());

    const response = await updateDaysOfAvailability(formData);
    if (response.success) {
      toast.success('Days of availability updated successfully');
      router.refresh();
    } else {
      toast.error('Error updating days of availability');
    }
  };

  return (
    <div className='flex flex-col gap-2 mt-4'>
      <h3 className='text-lg font-bold'>Days</h3>
      <p className='text-sm text-gray-500'>Select days of availability</p>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={days.sunday || false}
          onChange={() =>
            setDays(
              days.sunday
                ? { ...days, sunday: false }
                : { ...days, sunday: true }
            )
          }
        />
        <label>Sunday</label>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={days.monday}
          onChange={() =>
            setDays(
              days.monday
                ? { ...days, monday: false }
                : { ...days, monday: true }
            )
          }
        />
        <label>Monday</label>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={days.tuesday}
          onChange={() =>
            setDays(
              days.tuesday
                ? { ...days, tuesday: false }
                : { ...days, tuesday: true }
            )
          }
        />
        <label>Tuesday</label>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={days.wednesday}
          onChange={() =>
            setDays(
              days.wednesday
                ? { ...days, wednesday: false }
                : { ...days, wednesday: true }
            )
          }
        />
        <label>Wednesday</label>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={days.thursday}
          onChange={() =>
            setDays(
              days.thursday
                ? { ...days, thursday: false }
                : { ...days, thursday: true }
            )
          }
        />
        <label>Thursday</label>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={days.friday}
          onChange={() =>
            setDays(
              days.friday
                ? { ...days, friday: false }
                : { ...days, friday: true }
            )
          }
        />
        <label>Friday</label>
      </div>
      <div className='flex items-center gap-2'>
        <input
          type='checkbox'
          checked={days.saturday}
          onChange={() =>
            setDays(
              days.saturday
                ? { ...days, saturday: false }
                : { ...days, saturday: true }
            )
          }
        />
        <label>Saturday</label>
      </div>
      <button
        className='bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer'
        onClick={handleSave}
      >
        Save
      </button>
    </div>
  );
}
