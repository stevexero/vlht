'use client';

import ButtonPrimary from '@/app/ui/dashboard/buttons/ButtonPrimary';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import { useSchedulingStore } from '@/app/store/schedulingStore';
import { addSchedule } from '@/app/lib/actions/scheduleActions';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type DayKey =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export default function ScheduleSummary({ userId }: { userId: string }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    scheduleName,
    days,
    dayTimeSlots,
    duration,
    selectedTimeSlots,
    getSelectedTimeSlots,
    allAvailableDays,
    selectedInterval,
    reset,
  } = useSchedulingStore();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Get the first available day or use 'all'
      const firstAvailableDay =
        (Object.keys(days) as DayKey[]).find((day) => days[day]) || 'all';

      // Get time slots with fallback to defaults
      const timeSlot = dayTimeSlots[
        allAvailableDays ? 'all' : firstAvailableDay
      ] || {
        startTime: '09:00',
        endTime: '17:00',
      };

      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('scheduleName', scheduleName);
      formData.append('timeInterval', selectedInterval.toString());
      formData.append('duration', duration.toString());
      formData.append('maxDuration', duration.toString()); // Using duration as maxDuration for now
      formData.append('startTime', timeSlot.startTime);
      formData.append('endTime', timeSlot.endTime);
      formData.append('days', JSON.stringify(days));
      formData.append('selectedTimeSlots', JSON.stringify(selectedTimeSlots));
      formData.append('allAvailableDays', allAvailableDays.toString());

      console.log('selectedTimeSlots being sent:', selectedTimeSlots);

      const result = await addSchedule(formData);

      if (result.success) {
        reset(); // Reset the store state
        router.push('/dashboard/scheduling'); // Redirect to scheduling page after success
      } else {
        setError(result.error || 'Failed to create schedule');
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (time: string) => {
    return new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getFirstAndLastSlots = (day: string) => {
    const slots = allAvailableDays
      ? getSelectedTimeSlots('all')
      : getSelectedTimeSlots(day);
    if (slots.length === 0) {
      return { firstSlot: null, lastSlot: null };
    }

    // Sort slots chronologically
    const sortedSlots = [...slots].sort((a, b) => {
      const timeA = new Date(`2000-01-01T${a}`).getTime();
      const timeB = new Date(`2000-01-01T${b}`).getTime();
      return timeA - timeB;
    });

    return {
      firstSlot: sortedSlots[0],
      lastSlot: sortedSlots[sortedSlots.length - 1],
    };
  };

  const availableDays = Object.entries(days).filter(
    ([, isAvailable]) => isAvailable
  );

  return (
    <DashboardCard title='Schedule Summary' containerStyles='mt-4 mb-16'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4'>
          {error && (
            <div className='bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg'>
              {error}
            </div>
          )}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex flex-row justify-between gap-2 border border-gray-300 rounded-lg p-2 px-4'>
              <p className='text-sm font-bold text-gray-500'>Schedule Name:</p>
              <p className='font-semibold text-gray-500'>{scheduleName}</p>
            </div>
            <div className='flex flex-row justify-between gap-2 border border-gray-300 rounded-lg p-2 px-4'>
              <p className='text-sm font-bold text-gray-500'>Duration:</p>
              <p className='font-semibold text-gray-500'>{duration} minutes</p>
            </div>
          </div>

          <div className='border border-gray-300 rounded-lg overflow-hidden'>
            <table className='w-full'>
              <thead>
                <tr className='bg-gray-50'>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>
                    Day
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>
                    Start Time
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>
                    End Time
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>
                    First Available Slot
                  </th>
                  <th className='px-4 py-2 text-left text-sm font-semibold text-gray-600'>
                    Last Available Slot
                  </th>
                </tr>
              </thead>
              <tbody>
                {availableDays.map(([day]) => {
                  const timeSlot = dayTimeSlots[day] ||
                    dayTimeSlots['all'] || {
                      startTime: '09:00',
                      endTime: '17:00',
                    };
                  const { firstSlot, lastSlot } = getFirstAndLastSlots(day);
                  return (
                    <tr key={day} className='border-t border-gray-200'>
                      <td className='px-4 py-2 text-sm text-gray-600 capitalize'>
                        {day}
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-600'>
                        {formatTime(timeSlot.startTime)}
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-600'>
                        {formatTime(timeSlot.endTime)}
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-600'>
                        {firstSlot
                          ? formatTime(firstSlot)
                          : 'No slots selected'}
                      </td>
                      <td className='px-4 py-2 text-sm text-gray-600'>
                        {lastSlot ? formatTime(lastSlot) : 'No slots selected'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className='flex justify-end'>
            <ButtonPrimary type='submit'>
              {isSubmitting ? 'Saving...' : 'Save Schedule'}
            </ButtonPrimary>
          </div>
        </div>
      </form>
    </DashboardCard>
  );
}
