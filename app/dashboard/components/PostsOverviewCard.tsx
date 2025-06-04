import { User } from '@supabase/supabase-js';
import React from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  author_id: string;
}

interface PostsOverviewCardProps {
  posts: Post[];
  user: User;
}

export default function PostsOverviewCard({
  posts,
  user,
}: PostsOverviewCardProps) {
  const publishedPosts = posts.filter((post) => post.status === 'published');
  const drafts = posts.filter((post) => post.status === 'draft');
  const myPublishedPosts = publishedPosts.filter(
    (post) => post.author_id === user?.id
  );
  const myDrafts = drafts.filter((post) => post.author_id === user?.id);
  return (
    <div className='bg-white rounded-lg shadow-md p-4'>
      <h2 className='text-2xl font-bold'>Posts Overview</h2>
      <p>Total Published Posts: {publishedPosts.length}</p>
      <p>Total Drafts: {drafts.length}</p>
      <p>My Total Published Posts: {myPublishedPosts.length}</p>
      <p>My Total Drafts: {myDrafts.length}</p>
    </div>
  );
}
