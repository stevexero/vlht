'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';
import { createPostAction } from '@/app/lib/actions/postActions';
import { publishPostToMailchimpAction } from '@/app/lib/actions/publishActions';
import { User } from '@supabase/supabase-js';

interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  author_id: string;
}

function Droppable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    backgroundColor: isOver ? '#e6fffa' : '#f3f4f6',
    padding: '16px',
    borderRadius: '8px',
    minHeight: '200px',
  };

  return (
    <div ref={setNodeRef} style={style} className='flex flex-col gap-4'>
      {children}
    </div>
  );
}

function Draggable({
  id,
  children,
  data,
}: {
  id: string;
  children: React.ReactNode;
  data?: { type: string };
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
    data,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    backgroundColor: '#ffffff',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '8px',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='flex flex-col gap-2'
    >
      {children}
    </div>
  );
}

export default function DndPosts({
  posts,
  user,
}: {
  posts: Post[];
  user: User;
}) {
  const [drafts, setDrafts] = useState<Post[]>(
    posts.filter((p) => p.status === 'draft' && p.author_id === user.id)
  );
  const [published, setPublished] = useState<Post[]>(
    posts.filter((p) => p.status === 'published' && p.author_id === user.id)
  );
  const [otherPosts] = useState<Post[]>(
    posts.filter((p) => p.author_id !== user.id)
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const sourceId = String(active.id);
    const destinationId = String(over.id);

    if (sourceId === destinationId) return;

    if (active.data.current?.type === 'post') {
      const postId = sourceId;
      const post =
        drafts.find((p) => p.id === postId) ||
        published.find((p) => p.id === postId);

      if (!post) return;

      if (destinationId === 'drafts' && post.status === 'published') {
        toast.error('Cannot move published posts back to drafts');
        return;
      }

      if (destinationId === 'published' && post.status === 'draft') {
        const newDrafts = drafts.filter((p) => p.id !== postId);
        const newPublished = [...published, { ...post, status: 'published' }];

        setDrafts(newDrafts);
        setPublished(newPublished);

        try {
          const formData = new FormData();
          formData.append('id', postId);
          formData.append('title', post.title);
          formData.append('content', post.content);
          formData.append('status', 'published');
          formData.append('published_at', new Date().toISOString());
          formData.append('published_to_mailchimp', 'true');
          formData.append('published_to_blog', 'true');

          const result = await createPostAction(formData);
          if (!result.success) {
            throw new Error(result.error || 'Failed to publish post');
          }

          const mailchimpResult = await publishPostToMailchimpAction({
            postId,
            title: post.title,
            content: post.content,
          });

          if (!mailchimpResult.success) {
            throw new Error(
              mailchimpResult.error || 'Failed to publish post to Mailchimp'
            );
          }

          toast.success('Post published everywhere!');
        } catch (error) {
          console.error('Error publishing post:', error);
          toast.error('Failed to publish post');
          setDrafts([...drafts]);
          setPublished([...published]);
        }
      } else if (destinationId === 'drafts' && post.status === 'published') {
        console.log('Moving published post to drafts not implemented');
      }
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 mr-8'>
        <Droppable id='drafts'>
          <h2 className='text-lg font-bold mb-2'>My Drafts</h2>
          {drafts.length === 0 ? (
            <p className='text-sm text-gray-500'>No drafts available</p>
          ) : (
            drafts.map((post) => (
              <Draggable key={post.id} id={post.id} data={{ type: 'post' }}>
                <div aria-label={`Draft post: ${post.title}`}>
                  <h3 className='text-lg font-bold'>{post.title}</h3>
                  <Link href={`/dashboard/posts/edit?id=${post.id}`}>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>
                      Edit
                    </button>
                  </Link>
                </div>
              </Draggable>
            ))
          )}
        </Droppable>

        <Droppable id='published'>
          <h2 className='text-lg font-bold mb-2'>My Posts</h2>
          {published.length === 0 ? (
            <p className='text-sm text-gray-500'>No published posts</p>
          ) : (
            published.map((post) => (
              <Draggable key={post.id} id={post.id} data={{ type: 'post' }}>
                <div aria-label={`Published post: ${post.title}`}>
                  <h3 className='text-lg font-bold'>{post.title}</h3>
                  <Link href={`/dashboard/posts/edit?id=${post.id}`}>
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>
                      Edit
                    </button>
                  </Link>
                </div>
              </Draggable>
            ))
          )}
        </Droppable>

        {/* Other Users Posts */}
        <div className='bg-gray-100 p-4 rounded-md'>
          <h2 className='text-lg font-bold mb-2'>Posts by Others</h2>
          {otherPosts.length === 0 ? (
            <p className='text-sm text-gray-500'>No posts</p>
          ) : (
            otherPosts.map((post) => (
              <div
                key={post.id}
                id={post.id}
                className='bg-white p-4 rounded-md shadow-sm mt-6'
              >
                <div aria-label={`Published post: ${post.title}`}>
                  <div className='flex justify-between items-start'>
                    <h3 className='text-lg font-bold'>{post.title}</h3>
                    <p className='bg-gray-300 text-gray-700 border border-gray-900 px-2 py-1 rounded-full text-xs'>
                      {post.status}
                    </p>
                  </div>
                  <Link
                    href={`/dashboard/posts/edit?id=${post.id}&viewonly=true`}
                  >
                    <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>
                      View
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </DndContext>
  );
}
