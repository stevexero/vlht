'use client';

import { usePostsStore } from '@/app/store/postsStore';
import BlogCard from '../blogCard/BlogCard';
// import { useEffect } from 'react';

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
  const { selectedTag } = usePostsStore();

  const filteredPosts = posts.filter((post) => {
    if (!selectedTag) {
      return true;
    }
    return post.post_tags?.some((pt) => pt.tags?.tag === selectedTag);
  });

  //   useEffect(() => {
  //     console.log('posts', posts);
  //   }, [posts]);

  return (
    <>
      {filteredPosts?.map((post) => (
        <div key={post.id}>
          <BlogCard post={post} />
        </div>
      ))}
    </>
  );
}
