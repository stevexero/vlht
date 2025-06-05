import SubPageHeading from '@/app/ui/pageHeadings/SubPageHeading';
import ScheduleName from './components/ScheduleName';
import Days from './components/Days';
import { getDaysOfAvailabilityByUserId } from '@/app/lib/data/scheduleData';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const { data: daysResponse } = await getDaysOfAvailabilityByUserId(user.id);

  let daysOfAvailability = {
    sunday: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
  };

  if (daysResponse) {
    daysOfAvailability = daysResponse;
  }
  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <SubPageHeading href='/dashboard/scheduling' title='Add Schedule' />
      <div className='mt-4 mr-8'>
        <div className='flex flex-col gap-4'>
          <ScheduleName />
          <Days daysOfAvailability={daysOfAvailability} />
        </div>
      </div>
    </div>
  );
}
