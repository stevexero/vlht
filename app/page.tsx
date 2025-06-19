import Story from './components/story/Story';
import BottomHero from './components/bottomhero/BottomHero';
import ZHero from './components/hero/ZHero';
import ZSubhero from './components/subhero/ZSubhero';
import ZReviews from './components/reviews/ZReviews';
import {
  getDaysOfAvailability,
  getAllSchedules,
  getAllScheduleTimeSlotsByScheduleId,
  getAllTimeSlots,
} from './lib/data/scheduleData';
import Newsletter from './components/newsletter/Newsletter';

export default async function Home() {
  const response = await getDaysOfAvailability();

  let daysOfAvailability = [];
  let timeSlotsReference = [];
  const scheduleTimeSlots = [];
  let schedules = [];

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
  }

  return (
    <main className='w-full'>
      <ZHero />
      <ZSubhero />
      <ZReviews />
      <Newsletter
        daysOfAvailability={daysOfAvailability}
        timeSlotsReference={timeSlotsReference}
        schedules={schedules}
        scheduleTimeSlots={scheduleTimeSlots}
      />
      <Story />
      <BottomHero />
    </main>
  );
}
