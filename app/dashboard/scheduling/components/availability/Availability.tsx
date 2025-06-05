import { getDaysOfAvailabilityByUserId } from '@/app/lib/data/scheduleData';
import Days from './Days';
import Time from './Time';
import TimeInterval from './TimeInterval';

export default async function Availability({ userId }: { userId: string }) {
  const response = await getDaysOfAvailabilityByUserId(userId);

  let daysOfAvailability = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };

  if (response.data) {
    daysOfAvailability = response.data;
  }

  return (
    // <div className='w-full bg-gray-100 rounded-xl shadow-lg p-6 border border-gray-300'>
    <div className='grid grid-cols-2 gap-4 w-full'>
      <div className='flex flex-col gap-4'>
        <Days daysOfAvailability={daysOfAvailability} userId={userId} />
        <TimeInterval />
      </div>
      <Time daysOfAvailability={daysOfAvailability} userId={userId} />
    </div>
    // </div>
  );
}
