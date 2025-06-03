import Link from 'next/link';
import { getEveryPost } from '@/app/lib/data/postData';
import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import DndPosts from './components/DndPosts';
import { Suspense } from 'react';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const posts = await getEveryPost();
  if (!posts.success) {
    console.error('Error fetching posts:', posts.message);
  }

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Posts</h1>
        <Link href='/dashboard/posts/edit?newpost=true' className='mr-4'>
          <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
            Add Post
          </button>
        </Link>
      </div>
      <div className='mt-4 mr-8'>
        <div className='flex flex-col gap-4'>
          <Suspense fallback={<div>Loading...</div>}>
            <DndPosts posts={posts.data || []} user={user} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
