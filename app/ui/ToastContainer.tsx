'use client';

import { Toaster } from 'react-hot-toast';

export default function ToastContainer() {
  return (
    <div
      className='fixed top-0 right-0 max-w-md w-full'
      style={{ zIndex: 9999 }}
    >
      <Toaster position='top-right' />
    </div>
  );
}
