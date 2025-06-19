import React, { Suspense } from 'react';
import Header from './components/header/Header';
// import CompactBookingForm from './components/compactBookingForm/CompactBookingForm';
import CalendarAndTimeCard from './components/CalendarAndTimeCard';
import TrackBooking from './components/trackBooking/TrackBooking';
import {
  getAllSchedules,
  getAllScheduleTimeSlotsByScheduleId,
  getAllTimeSlots,
  getDaysOfAvailability,
} from '@/app/lib/data/scheduleData';
import { fetchAllUserProfiles } from '@/app/lib/data/userData';

export default async function page() {
  const response = await getDaysOfAvailability();

  let daysOfAvailability = [];
  let timeSlotsReference = [];
  const scheduleTimeSlots = [];
  let schedules = [];
  let allProfiles = [];
  if (response.data) {
    daysOfAvailability = response.data;

    // Fetch all schedules
    const schedulesResponse = await getAllSchedules();
    if (schedulesResponse.data) {
      schedules = schedulesResponse.data;
    }

    // Fetch all time slots
    const timeSlotsResponse = await getAllTimeSlots();
    if (timeSlotsResponse.data) {
      timeSlotsReference = timeSlotsResponse.data;
    }

    // Loop through all schedules and fetch all schedule_time_slots
    for (const schedule of schedules) {
      const scheduleTimeSlotsResponse =
        await getAllScheduleTimeSlotsByScheduleId(schedule.id);
      if (scheduleTimeSlotsResponse.data) {
        scheduleTimeSlots.push(scheduleTimeSlotsResponse.data);
      }
    }

    // Fetch all user profiles
    const profilesResponse = await fetchAllUserProfiles();
    if (profilesResponse.data) {
      allProfiles = profilesResponse.data;
    }
  }

  return (
    <div className='w-full'>
      <Header />
      <div className='w-full max-w-7xl mx-auto flex flex-col justify-center px-4 xl:px-0'>
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-36 mb-16 relative'> */}
        <div className='w-full mt-36 mb-16 relative'>
          <div className='absolute -top-52 w-full max-w-7xl bg-gradient-to-br from-amber-200 to-amber-100 shadow-2xl shadow-blue-950/50 rounded-md'>
            <Suspense fallback={<div>Loading...</div>}>
              {/* <CompactBookingForm /> */}
              <TrackBooking />
            </Suspense>
          </div>
          <div className='w-full'>
            <Suspense fallback={<div>Loading...</div>}>
              <CalendarAndTimeCard
                daysOfAvailability={daysOfAvailability}
                timeSlotsReference={timeSlotsReference}
                schedules={schedules}
                scheduleTimeSlots={scheduleTimeSlots}
                allProfiles={allProfiles}
              />
            </Suspense>
          </div>
          {/* <Blogs posts={posts.data || []} /> */}
        </div>
      </div>
    </div>
  );
}
