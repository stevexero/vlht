'use client';

import ButtonPrimary from '@/app/ui/dashboard/buttons/ButtonPrimary';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import { useSchedulingStore } from '@/app/store/schedulingStore';

export default function ScheduleSummary() {
  const {
    scheduleName,
    days,
    dayTimeSlots,
    duration,
    selectedTimeSlots,
    getSelectedTimeSlots,
    allAvailableDays,
  } = useSchedulingStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      scheduleName,
      days,
      dayTimeSlots,
      duration,
      selectedTimeSlots,
    };
    console.log('Form Data:', data);
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
            <ButtonPrimary type='submit'>Save Schedule</ButtonPrimary>
          </div>
        </div>
      </form>
    </DashboardCard>
  );
}
