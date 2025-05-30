import Link from 'next/link';
import React from 'react';
import { CiSearch } from 'react-icons/ci';

interface Post {
  id: string;
  title: string;
}

export default function Sidebar({ posts }: { posts: Post[] }) {
  return (
    <div>
      {/* Search */}
      <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>Search</label>
        <input
          type='text'
          placeholder='Search'
          className='w-full mt-4 p-2 rounded-md border border-blue-950 focus:outline-none'
        />
        <button className='w-full mt-4 flex flex-row items-center justify-center gap-2 bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 focus:bg-blue-900 transition-colors duration-300 cursor-pointer focus:outline-none'>
          Search <CiSearch />
        </button>
      </div>
      {/* Recent Posts */}
      <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>
          Recent Posts
        </label>
        <hr className='my-4 border-blue-950/20 border-3' />
        {posts.map((post) => (
          <div key={post.id} className='flex flex-col gap-2'>
            <Link
              href={`/blog/${post.id}`}
              className='text-blue-950 hover:text-amber-500 hover:underline transition-all duration-300 mb-4'
            >
              {post.title.toUpperCase()}
            </Link>
          </div>
        ))}
      </div>
      {/* Categories */}
      <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>
          Categories
        </label>
        <hr className='my-4 border-blue-950/20 border-3' />
        <div className='flex flex-col gap-2'>
          <Link href='/blog/categories/travel'>Travel</Link>
          <Link href='/blog/categories/food'>Food</Link>
          <Link href='/blog/categories/lifestyle'>Lifestyle</Link>
          <Link href='/blog/categories/fashion'>Fashion</Link>
        </div>
      </div>
      {/* Archives */}
      <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>Archives</label>
        <hr className='my-4 border-blue-950/20 border-3' />
        <div className='flex flex-col gap-2'></div>
        <div className='flex flex-col gap-2'>
          {/* Year */}
          <Link href='/blog/archives/2025'>2025</Link>
          <Link href='/blog/archives/2024'>2024</Link>
          <Link href='/blog/archives/2023'>2023</Link>
        </div>
      </div>
      {/* Tags */}
      <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>Tags</label>
        <hr className='my-4 border-blue-950/20 border-3' />
        <div className='flex flex-col gap-2'></div>
        <div className='flex flex-col gap-2'>
          <Link href='/blog/tags/travel'>Travel</Link>
          <Link href='/blog/tags/food'>Food</Link>
          <Link href='/blog/tags/lifestyle'>Lifestyle</Link>
          <Link href='/blog/tags/fashion'>Fashion</Link>
        </div>
      </div>
      {/* Recent Comments */}
      <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>
          Recent Comments
        </label>
        <hr className='my-4 border-blue-950/20 border-3' />
      </div>
    </div>
  );
}
