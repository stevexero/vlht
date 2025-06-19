import React, { Suspense } from 'react';
import CheckoutForm from './components/checkoutForm/CheckoutForm';
import Header from './components/header/Header';
import { fetchAllUserProfiles } from '@/app/lib/data/userData';

export default async function page() {
  let allProfiles = [];

  const profilesResponse = await fetchAllUserProfiles();
  if (profilesResponse.data) {
    allProfiles = profilesResponse.data;
  }

  return (
    <div
      className='w-full'
      style={{
        backgroundImage: `url('/images/lines.png')`,
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat',
      }}
    >
      <Header />
      <div className='w-full max-w-7xl mx-auto flex flex-col justify-center px-0 md:px-4 xl:px-0'>
        <div className='w-full -mt-96 md:-mt-64 mb-16 relative'>
          <div className='w-full'>
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutForm allProfiles={allProfiles} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
