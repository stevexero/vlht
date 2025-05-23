import Link from 'next/link';

export default function page() {
  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <h1 className='text-2xl font-bold'>Posts</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mr-8'>
        <div className='flex flex-col gap-4'>
          <p className='text-sm text-gray-500'>Manage your posts here</p>
          {/* Add Post */}
          <Link href='/dashboard/posts/add'>
            <button className='bg-blue-500 text-white px-4 py-2 rounded-md'>
              Add Post
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
