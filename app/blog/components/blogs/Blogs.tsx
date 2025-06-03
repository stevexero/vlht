'use client';

import { usePostsStore } from '@/app/store/postsStore';
import BlogCard from '../blogCard/BlogCard';
import { LuLayoutGrid, LuList } from 'react-icons/lu';

interface Post {
  id: string;
  title: string;
  content: string;
  post_tags: {
    post_id: string;
    tag_id: string;
    tags: {
      id: string;
      tag: string;
    };
  }[];
}

export default function Blogs({ posts }: { posts: Post[] }) {
  const { selectedTag, layout, setLayout } = usePostsStore();

  const filteredPosts = posts.filter((post) => {
    if (!selectedTag) {
      return true;
    }
    return post.post_tags?.some((pt) => pt.tags?.tag === selectedTag);
  });

  return (
    <div className='relative w-full col-span-1 lg:col-span-2'>
      <div className='hidden lg:flex lg:justify-end lg:gap-2 lg:absolute lg:-top-8 lg:right-0'>
        <button
          onClick={() => setLayout('list')}
          className={`${
            layout === 'list' ? 'text-amber-500' : 'text-gray-500'
          } cursor-pointer`}
        >
          <LuList />
        </button>
        <button
          onClick={() => setLayout('grid')}
          className={`${
            layout === 'grid' ? 'text-amber-500' : 'text-gray-500'
          } cursor-pointer`}
        >
          <LuLayoutGrid />
        </button>
      </div>
      <div
        className={`w-full ${
          layout === 'list'
            ? 'flex flex-col gap-4'
            : 'grid grid-cols-1 lg:grid-cols-2 gap-4'
        }`}
      >
        {filteredPosts?.map((post) => (
          <div key={post.id}>
            <BlogCard post={post} />
          </div>
        ))}
      </div>
    </div>
  );
}
