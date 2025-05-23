import { Suspense } from 'react';
import Sidebar from '../components/navbar/Sidebar';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <div className='w-full flex flex-col md:flex-row justify-center my-12 px-1 md:px-8'>
    <div className='w-full min-h-screen flex justify-center items-center'>
      <div className='w-full min-h-screen flex justify-center'>
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
        {/* <div className='w-full grid grid-cols-1 md:grid-cols-4 gap-8'> */}
        <div className='w-full bg-gray-200 flex justify-center'>{children}</div>
      </div>
    </div>
  );
}
