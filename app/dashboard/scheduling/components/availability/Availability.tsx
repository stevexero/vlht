import { getDaysOfAvailabilityByUserId } from '@/app/lib/data/scheduleData';
import Days from './Days';

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
    <div className='w-full bg-gray-100 rounded-xl shadow-lg p-6 border border-gray-300'>
      <Days daysOfAvailability={daysOfAvailability} userId={userId} />
    </div>
  );
}
