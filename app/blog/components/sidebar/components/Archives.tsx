'use client';

import Link from 'next/link';

interface Post {
  id: string;
  title: string;
  published_at: string;
}

export default function Archives({ posts }: { posts: Post[] }) {
  const years = posts.map((post) => {
    return post.published_at.split('-')[0];
  });

  const uniqueYears = [...new Set(years)];

  return (
    <div className='bg-white rounded-md shadow-md p-4 mb-8'>
      <label className='text-blue-950 text-lg font-semibold'>Archives</label>
      <hr className='my-4 border-blue-950/20 border-3' />
      <div className='flex flex-col gap-2'></div>
      <div className='flex flex-col gap-2'>
        {uniqueYears.map((year) => (
          <Link
            key={year}
            href={`/blog/archives/${year}`}
            className='text-blue-950 hover:text-amber-500 hover:underline transition-all duration-300'
          >
            {year}
          </Link>
        ))}
      </div>
    </div>
  );
}
