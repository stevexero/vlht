import Link from 'next/link';
import { getDraftPosts } from '@/app/lib/data/postData';
import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  const response = await getDraftPosts(user.id);

  if (!response.success) {
    console.error('Error fetching posts:', response.message);
  }

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <h1 className='text-2xl font-bold'>Posts</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mr-8'>
        <div className='flex flex-col gap-4'>
          <p className='text-sm text-gray-500'>Manage your posts here</p>
          {/* Drafts */}
          <div className='flex flex-col gap-4'>
            <h2 className='text-lg font-bold'>Drafts</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
              {response.data?.map((post) => (
                <div
                  key={post.id}
                  className='bg-white p-4 rounded-md shadow-md'
                >
                  <h3 className='text-lg font-bold'>{post.title}</h3>
                  <Link href={`/dashboard/posts/edit?id=${post.id}`}>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
                      Edit
                    </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
          {/* Add Post */}
          <Link href='/dashboard/posts/edit'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
              Add Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
