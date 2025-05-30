import React, { Suspense } from 'react';
import BlogCard from './components/blogCard/BlogCard';
import { fetchAllPosts } from '@/app/lib/data/postData';
import Header from './components/header/Header';
import Sidebar from './components/sidebar/Sidebar';

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
            <div className='flex flex-col gap-2 p-4'>
              <label className='text-blue-950 text-sm font-semibold'>
                Stay in the loop of luxury
              </label>
              <div className='flex items-center gap-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='w-full p-2 rounded-md border border-blue-950 focus:outline-none'
                />
                <button className='bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 focus:bg-blue-900 transition-colors duration-300 cursor-pointer focus:outline-none'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className='col-span-1 md:block hidden'>
            <Suspense fallback={<div>Loading...</div>}>
              <Sidebar posts={posts.data || []} />
            </Suspense>
          </div>
          <div className='col-span-1 lg:col-span-2'>
            {posts.data?.map((post) => (
              <Suspense
                key={post.id}
                fallback={
                  <div className='bg-white rounded-md shadow-md'>
                    Loading...
                  </div>
                }
              >
                <BlogCard post={post} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
