import React, { Suspense } from 'react';
import { fetchAllPosts } from '@/app/lib/data/postData';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';
import SubscribeForm from './components/subscribeForm/SubscribeForm';
import Blogs from './components/blogs/Blogs';

export default async function BlogPage() {
  const posts = await fetchAllPosts();
  if (!posts.success) {
    return <div className='w-full mt-48 p-8'>Error: {posts.message}</div>;
  }

  return (
    <div className='w-full'>
      <Header />
      <div className='w-full max-w-7xl mx-auto flex flex-col justify-center px-4 xl:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-36 mb-16 relative'>
          <div className='absolute -top-52 w-full max-w-[900px] bg-gradient-to-br from-amber-200 to-amber-100 shadow-2xl shadow-blue-950/50 rounded-md'>
            <Suspense fallback={<div>Loading...</div>}>
              <SubscribeForm />
            </Suspense>
          </div>
          <div className='col-span-1 md:block hidden'>
            <Suspense fallback={<div>Loading...</div>}>
              <Sidebar posts={posts.data || []} />
            </Suspense>
          </div>
          <div className='col-span-1 lg:col-span-2'>
            <Blogs posts={posts.data || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
