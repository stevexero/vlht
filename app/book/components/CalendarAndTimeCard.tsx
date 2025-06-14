'use client';

// import { useBookingStore } from '@/app/store/store';
import Calendar from './calendar/Calendar';
import TimeCard from './timeCard/TimeCard';
import GuestCount from './guestCount/GuestCount';
import GuestBasicInfo from './guestBasicInfo/GuestBasicInfo';

interface DaysOfAvailabilityProps {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  user_id: string;
}

export default function CalendarAndTimeCard({
  daysOfAvailability,
}: {
  daysOfAvailability: DaysOfAvailabilityProps[];
}) {
  //   const { isDateSelected } = useBookingStore();
  return (
    // <div
    //   className={`w-full max-w-7xl mx-auto ${
    //     isDateSelected ? 'grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4' : ''
    //   }`}
    // >
    <div
      className={`w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4`}
    >
      {/* <div className={`${isDateSelected ? 'col-span-2' : ''}`}> */}
      <div className={`col-span-2`}>
        <Calendar daysOfAvailability={daysOfAvailability} />
      </div>
      {/* <div className={`${isDateSelected ? 'block col-span-1' : 'hidden'}`}> */}
      <div className={`block col-span-1`}>
        <div className='flex flex-col gap-4'>
          <TimeCard />
          <GuestCount />
          <GuestBasicInfo />
        </div>
      </div>
    </div>
  );
}
