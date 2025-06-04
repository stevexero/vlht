import React, { Suspense } from 'react';
import Header from './components/header/Header';
import CompactBookingForm from './components/compactBookingForm/CompactBookingForm';
import CalendarAndTimeCard from './components/CalendarAndTimeCard';

export default function page() {
  return (
    <div className='w-full'>
      <Header />
      <div className='w-full max-w-7xl mx-auto flex flex-col justify-center px-4 xl:px-0'>
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-36 mb-16 relative'> */}
        <div className='w-full mt-36 mb-16 relative'>
          <div className='absolute -top-52 w-full max-w-7xl bg-gradient-to-br from-amber-200 to-amber-100 shadow-2xl shadow-blue-950/50 rounded-md'>
            <Suspense fallback={<div>Loading...</div>}>
              <CompactBookingForm />
            </Suspense>
          </div>
          <div className='w-full'>
            <Suspense fallback={<div>Loading...</div>}>
              <CalendarAndTimeCard />
            </Suspense>
          </div>
          {/* <Blogs posts={posts.data || []} /> */}
        </div>
      </div>
    </div>
  );
}
