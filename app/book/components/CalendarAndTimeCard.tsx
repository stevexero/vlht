'use client';

// import { useBookingStore } from '@/app/store/store';
import Calendar from './calendar/Calendar';
import TimeCard from './timeCard/TimeCard';
import GuestCount from './guestCount/GuestCount';
import GuestBasicInfo from './guestBasicInfo/GuestBasicInfo';
import Tourista from './tourista/Tourista';

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

interface TimeSlotReferenceProps {
  id: string;
  slot_time: string;
  available: boolean;
}

interface ScheduleProps {
  id: string;
  user_id: string;
  name: string;
  days: string; // This should contain the days of the week
  time_interval: number;
  duration: number;
  start_time: string;
  end_time: string;
}

interface ScheduleTimeSlotProps {
  id: string;
  schedule_id: string;
  day: string;
  slot_time_id: number;
}

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
}

export default function CalendarAndTimeCard({
  daysOfAvailability,
  timeSlotsReference,
  schedules,
  scheduleTimeSlots,
  allProfiles,
}: {
  daysOfAvailability: DaysOfAvailabilityProps[];
  timeSlotsReference: TimeSlotReferenceProps[];
  schedules: ScheduleProps[];
  scheduleTimeSlots: ScheduleTimeSlotProps[][];
  allProfiles: Profile[];
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
          <Tourista schedules={schedules} allProfiles={allProfiles} />
          <TimeCard
            timeSlotsReference={timeSlotsReference}
            schedules={schedules}
            scheduleTimeSlots={scheduleTimeSlots}
            allProfiles={allProfiles}
          />
          <GuestCount />
          <GuestBasicInfo />
        </div>
      </div>
    </div>
  );
}
