'use client';

import Link from 'next/link';
import Image from 'next/image';
import { stripHtml } from '@/app/lib/stripHtml';

interface Post {
  id: string;
  title: string;
  content: string;
}

export default function BlogCard({ post }: { post: Post }) {
  // Extract first image src from content
  const imageMatch = post.content.match(/<img[^>]+src=["'](.*?)["']/i);
  const imageSrc = imageMatch ? imageMatch[1] : '/placeholder-image.jpg'; // Fallback image

  // Strip HTML and truncate text, excluding <h1> content
  const previewText = stripHtml(post.content, { excludeH1: true }).substring(
    0,
    100
  );

  return (
    <Link
      href={`/blog/${post.id}`}
      className='bg-white p-4 rounded-md shadow-md flex flex-col gap-2 hover:shadow-lg transition-shadow mb-8'
      aria-label={`View blog post: ${post.title}`}
    >
      <div className='relative w-full h-48'>
        <Image
          src={imageSrc}
          alt={post.title || 'Blog post image'}
          fill
          className='object-cover rounded-md'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
          priority={false}
        />
      </div>
      <h3 className='text-lg font-bold text-gray-900'>{post.title}</h3>
      <p className='text-sm text-gray-500 line-clamp-2'>
        {previewText}
        {previewText.length >= 100 ? '...' : ''}
      </p>
    </Link>
  );
}
