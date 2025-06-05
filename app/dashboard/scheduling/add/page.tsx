import SubPageHeading from '@/app/ui/pageHeadings/SubPageHeading';
import ScheduleName from './components/ScheduleName';
import Days from './components/Days';
// import { getDaysOfAvailabilityByUserId } from '@/app/lib/data/scheduleData';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import TimeInterval from './components/TimeInterval';
import DaySelector from './components/DaySelector';
import StartEndTime from './components/StartEndTime';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  //   const { data: daysResponse } = await getDaysOfAvailabilityByUserId(user.id);

  //   let daysOfAvailability = {
  //     sunday: false,
  //     monday: false,
  //     tuesday: false,
  //     wednesday: false,
  //     thursday: false,
  //     friday: false,
  //     saturday: false,
  //   };

  //   if (daysResponse) {
  //     daysOfAvailability = daysResponse;
  //   }

  return (
    <div className='w-full ml-4 md:ml-72 mt-24 md:mt-16 mb-8'>
      <SubPageHeading href='/dashboard/scheduling' title='Add Schedule' />
      <div className='mt-4 mr-4 md:mr-8'>
        <div className='flex flex-col gap-0 md:gap-4'>
          <ScheduleName />
          <Days />
          <TimeInterval />
          <DaySelector />
          <StartEndTime />
        </div>
      </div>
    </div>
  );
}
