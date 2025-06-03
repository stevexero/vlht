'use client';

import Link from 'next/link';

interface Post {
  id: string;
  title: string;
}

export default function RecentPosts({ posts }: { posts: Post[] }) {
  return (
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
  );
}
