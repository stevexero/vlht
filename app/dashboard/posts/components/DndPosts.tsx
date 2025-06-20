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
import {
  createPostAction,
  publishPostToMailchimpAction,
} from '@/app/lib/actions/actions';
import { User } from '@supabase/supabase-js';

interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  author_id: string;
  published_to_mailchimp: boolean;
  published_to_blog: boolean;
}

function Droppable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) {
  const { isOver, setNodeRef } = useDroppable({ id });
  return (
    <div
      ref={setNodeRef}
      className={`relative flex flex-col gap-2 bg-gradient-to-br from-white via-white to-neutral-100/50 shadow-lg shadow-gray-400/30 border border-neutral-400 rounded-lg p-4 overflow-hidden ${
        isOver ? 'bg-blue-50' : ''
      }`}
    >
      <div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none' />
      <div className='relative z-10'>{children}</div>
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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='relative flex flex-col gap-2 bg-gradient-to-br from-white via-white to-neutral-100/50 shadow-lg shadow-gray-400/30 border border-neutral-400 rounded-lg p-4 overflow-hidden cursor-move'
    >
      <div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none' />
      <div className='relative z-10'>{children}</div>
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
          formData.append('published_to_blog', 'true');
          formData.append('published_to_mailchimp', 'true');

          const result = await createPostAction(formData);
          if (!result.success) {
            throw new Error(result.error || 'Failed to publish post');
          }

          // Publish to Mailchimp
          if (post.published_to_mailchimp === false) {
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
          }

          toast.success('Post published!');
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
          <h3 className='text-lg font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
            My Drafts
          </h3>
          {drafts.length === 0 ? (
            <p className='text-sm text-gray-500'>No drafts available</p>
          ) : (
            <div className='space-y-4'>
              {drafts.map((post) => (
                <Draggable key={post.id} id={post.id} data={{ type: 'post' }}>
                  <div aria-label={`Draft post: ${post.title}`}>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-bold'>{post.title}</h3>
                      <div className='flex flex-row gap-2'>
                        {post.published_to_mailchimp && (
                          <p className='bg-gray-300 text-gray-700 border border-gray-900 px-2 py-1 rounded-full text-xs'>
                            Mailchimp
                          </p>
                        )}
                        {post.published_to_blog && (
                          <p className='bg-gray-300 text-gray-700 border border-gray-900 px-2 py-1 rounded-full text-xs'>
                            Blog
                          </p>
                        )}
                      </div>
                    </div>
                    <Link href={`/dashboard/posts/edit?id=${post.id}`}>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>
                        Edit
                      </button>
                    </Link>
                  </div>
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>

        <Droppable id='published'>
          <h3 className='text-lg font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
            My Published Posts
          </h3>
          {published.length === 0 ? (
            <p className='text-sm text-gray-500'>No published posts</p>
          ) : (
            <div className='space-y-4'>
              {published.map((post) => (
                <Draggable key={post.id} id={post.id} data={{ type: 'post' }}>
                  <div aria-label={`Published post: ${post.title}`}>
                    <div className='flex justify-between items-start'>
                      <h3 className='font-bold'>{post.title}</h3>
                      <div className='flex flex-row gap-2'>
                        {post.published_to_mailchimp && (
                          <p className='bg-gray-300 text-gray-700 border border-gray-900 px-2 py-1 rounded-full text-xs'>
                            Mailchimp
                          </p>
                        )}
                        {post.published_to_blog && (
                          <p className='bg-gray-300 text-gray-700 border border-gray-900 px-2 py-1 rounded-full text-xs'>
                            Blog
                          </p>
                        )}
                      </div>
                    </div>
                    <Link href={`/dashboard/posts/edit?id=${post.id}`}>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded-md mt-2'>
                        View
                      </button>
                    </Link>
                  </div>
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>

        <div className='relative flex flex-col gap-2 bg-gradient-to-br from-white via-white to-neutral-100/50 shadow-lg shadow-gray-400/30 border border-neutral-400 rounded-lg p-4 overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none' />
          <div className='relative z-10'>
            <h3 className='text-lg font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
              Posts by Others
            </h3>
            {otherPosts.length === 0 ? (
              <p className='text-sm text-gray-500'>No posts</p>
            ) : (
              <div className='space-y-4'>
                {otherPosts.map((post) => (
                  <div
                    key={post.id}
                    className='relative flex flex-col gap-2 bg-gradient-to-br from-white via-white to-neutral-100/50 shadow-lg shadow-gray-400/30 border border-neutral-400 rounded-lg p-4 overflow-hidden'
                  >
                    <div className='absolute inset-0 bg-gradient-to-br from-white/50 to-transparent pointer-events-none' />
                    <div className='relative z-10'>
                      <div className='flex justify-between items-start'>
                        <h3 className='font-bold'>{post.title}</h3>
                        <div className='flex flex-row gap-2'>
                          {post.published_to_mailchimp && (
                            <p className='bg-gray-300 text-gray-700 border border-gray-900 px-2 py-1 rounded-full text-xs'>
                              Mailchimp
                            </p>
                          )}
                          {post.published_to_blog && (
                            <p className='bg-gray-300 text-gray-700 border border-gray-900 px-2 py-1 rounded-full text-xs'>
                              Blog
                            </p>
                          )}
                        </div>
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
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </DndContext>
  );
}
