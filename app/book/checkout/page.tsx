import React, { Suspense } from 'react';
import CheckoutForm from './components/checkoutForm/CheckoutForm';
import Header from './components/header/Header';

export default function page() {
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
      <div className='w-full max-w-7xl mx-auto flex flex-col justify-center px-4 xl:px-0'>
        <div className='w-full -mt-64 mb-16 relative'>
          <div className='w-full'>
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
