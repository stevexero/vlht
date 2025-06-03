'use client';

import { usePostsStore } from '@/app/store/postsStore';

interface Tag {
  id: string;
  tag: string;
}

export default function Tags({ tags }: { tags: Tag[] }) {
  const { setSelectedTag } = usePostsStore();

  return (
    <div className='bg-white rounded-md shadow-md p-4 mb-8'>
      <label className='text-blue-950 text-lg font-semibold'>Tags</label>
      <hr className='my-4 border-blue-950/20 border-3' />
      <div className='flex flex-row flex-wrap gap-2'>
        <button
          className='px-2 py-1 bg-amber-200 rounded-3xl hover:bg-amber-100 hover:text-amber-500 transition-all duration-300 cursor-pointer'
          onClick={() => {
            setSelectedTag('');
          }}
        >
          All Posts
        </button>
        {tags.map((tag) => (
          <button
            key={tag.id}
            className='px-2 py-1 bg-amber-200 rounded-3xl hover:bg-amber-100 hover:text-amber-500 transition-all duration-300 cursor-pointer'
            onClick={() => {
              setSelectedTag(tag.tag);
            }}
          >
            {tag.tag
              .replace(/-/g, ' ')
              .split(' ')
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
