'use client';

import { useBookingStore } from '@/app/store/store';
import Calendar from './calendar/Calendar';
import TimeCard from './timeCard/TimeCard';
import GuestCount from './guestCount/GuestCount';
import GuestBasicInfo from './guestBasicInfo/GuestBasicInfo';

export default function CalendarAndTimeCard() {
  const { isDateSelected } = useBookingStore();
  return (
    <div
      className={`w-full max-w-7xl mx-auto ${
        isDateSelected ? 'grid grid-cols-1 md:grid-cols-3 gap-4' : ''
      }`}
    >
      <div className={`${isDateSelected ? 'col-span-2' : ''}`}>
        <Calendar />
      </div>
      <div className={`${isDateSelected ? 'block col-span-1' : 'hidden'}`}>
        <div className='flex flex-col gap-4'>
          <TimeCard />
          <GuestCount />
          <GuestBasicInfo />
        </div>
      </div>
    </div>
  );
}
