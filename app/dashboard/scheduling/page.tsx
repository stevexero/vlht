import { Suspense } from 'react';
import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import Availability from './components/availability/Availability';
import MainPageHeading from '@/app/ui/pageHeadings/MainPageHeading';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <MainPageHeading
        title='Scheduling'
        link='/dashboard/scheduling/add'
        linkText='Add Schedule'
      />
      <div className='mt-4 mr-8'>
        <div className='flex flex-col gap-4'>
          {/* <Suspense fallback={<div>Loading...</div>}>
            <ScheduleSettings />
          </Suspense> */}
          <Suspense fallback={<div>Loading...</div>}>
            <Availability userId={user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
