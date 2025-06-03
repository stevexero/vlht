import React from 'react';
// import { CiSearch } from 'react-icons/ci';
import Tags from './components/Tags';
import { getAllTags } from '@/app/lib/data/postData';
import RecentPosts from './components/RecentPosts';
import Archives from './components/Archives';

interface Post {
  id: string;
  title: string;
  created_at: string;
  published_at: string;
}

export default async function Sidebar({ posts }: { posts: Post[] }) {
  const tags = await getAllTags();
  if (!tags.success) {
    console.error(tags.message);
  }

  return (
    <div className='sticky top-32'>
      {/* Search */}
      {/* <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>Search</label>
        <input
          type='text'
          placeholder='Search'
          className='w-full mt-4 p-2 rounded-md border border-blue-950 focus:outline-none'
        />
        <button className='w-full mt-4 flex flex-row items-center justify-center gap-2 bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 focus:bg-blue-900 transition-colors duration-300 cursor-pointer focus:outline-none'>
          Search <CiSearch />
        </button>
      </div> */}
      <Tags tags={tags.data || []} />
      <RecentPosts posts={posts.slice(0, 5)} />
      <Archives posts={posts || []} />
      {/* Categories */}
      {/* <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>
          Categories
        </label>
        <hr className='my-4 border-blue-950/20 border-3' />
        <div className='flex flex-col gap-2'>
          <Link href='/blog/#'>Travel</Link>
          <Link href='/blog/#'>Food</Link>
          <Link href='/blog/#'>Lifestyle</Link>
          <Link href='/blog/#'>Fashion</Link>
        </div>
      </div> */}
      {/* Recent Comments */}
      {/* <div className='bg-white rounded-md shadow-md p-4 mb-8'>
        <label className='text-blue-950 text-lg font-semibold'>
          Recent Comments
        </label>
        <hr className='my-4 border-blue-950/20 border-3' />
      </div> */}
    </div>
  );
}
