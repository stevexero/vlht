'use client';

import { User } from '@supabase/supabase-js';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
// import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import ZMenuBar from './ZMenuBar';
import { usePostsStore } from '@/app/store/store';
import '../styles.css';
import Todos from './Todos';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
  }),
  // Image.configure({
  //   inline: true,
  // }),
  ImageResize.configure({
    allowBase64: false,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'right', 'center', 'justify'],
  }),
];

export default function PostEditor({
  user,
  initialContent,
  params,
  author,
}: {
  user: User;
  initialContent: string;
  params?: { id: string; viewonly: boolean } | null;
  author?: string;
}) {
  const router = useRouter();

  const { isFullScreen } = usePostsStore();

  const editor = useEditor({
    extensions: extensions,
    content: initialContent,
  });

  useEffect(() => {
    if (author === undefined && !params?.viewonly) {
      router.push('/dashboard/posts');
      toast.error('You are not authorized to edit this post');
    }
  }, [author, router, user.id, params?.viewonly]);

  if (author === undefined && !params?.viewonly) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${
        isFullScreen
          ? 'absolute top-0 left-0 z-10 w-screen h-screen'
          : 'w-full ml-2 md:ml-72 mt-24 md:mt-16'
      } transition-all duration-300`}
    >
      <div
        className={`${
          isFullScreen
            ? ''
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mr-2 md:mr-8'
        } transition-all duration-300`}
      >
        <div
          className={`col-span-3 bg-gray-300 rounded-lg ${
            isFullScreen ? 'h-[100vh]' : 'max-h-[500px] md:max-h-[700px]'
          }  flex flex-col transition-all duration-300`}
        >
          <div className='sticky top-0 border-gray-300'>
            <ZMenuBar editor={editor} user={user} params={params} />
          </div>
          <div className='sticky top-12 border-gray-300'>
            <Todos editor={editor} />
          </div>
          <div className='w-full max-w-[836px] mx-auto bg-white flex-1 overflow-y-auto p-4 mb-4'>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
}
