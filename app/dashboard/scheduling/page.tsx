import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import ScheduleSettings from './components/ScheduleSettings';
import Link from 'next/link';
import Availability from './components/availability/Availability';

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
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Scheduling</h1>
        <Link href='/dashboard/scheduling/add' className='mr-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
            Add Schedule
          </button>
        </Link>
      </div>
      <div className='mt-4 mr-8'>
        <div className='flex flex-col gap-4'>
          <Suspense fallback={<div>Loading...</div>}>
            <ScheduleSettings />
          </Suspense>
          <Suspense fallback={<div>Loading...</div>}>
            <Availability userId={user.id} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
