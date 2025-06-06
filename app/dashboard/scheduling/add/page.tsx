import SubPageHeading from '@/app/ui/dashboard/pageHeadings/SubPageHeading';
import ScheduleName from './components/ScheduleName';
import Days from './components/Days';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import TimeInterval from './components/TimeInterval';
import DaySelector from './components/DaySelector';
import StartEndTime from './components/StartEndTime';
import Duration from './components/Duration';
import ScheduleSummary from './components/ScheduleSummary';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

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
          <Duration />
          <ScheduleSummary userId={user.id} />
        </div>
      </div>
    </div>
  );
}
