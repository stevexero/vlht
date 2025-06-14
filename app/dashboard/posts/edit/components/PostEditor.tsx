'use client';

import { User } from '@supabase/supabase-js';
import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, Extension, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import ImageResize from 'tiptap-extension-resize-image';
import ZMenuBar from './ZMenuBar';
import { usePostsStore } from '@/app/store/store';
import '../styles.css';
import Todos from './Todos';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import TagsModal from './menuItems/TagsModal';

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
  post,
  existingTags,
  tagsList,
}: {
  user: User;
  initialContent: string;
  params?: { id: string; viewonly: boolean; newpost: boolean } | null;
  author?: string;
  post?: {
    id: string;
    title: string;
    content: string;
    status: string;
    published_to_mailchimp: boolean;
    published_to_blog: boolean;
    published_at: string;
  } | null;
  existingTags: string[];
  tagsList: string[];
}) {
  const router = useRouter();

  const { isFullScreen, showTagsModal } = usePostsStore();

  const editor = useEditor({
    extensions: extensions as Extension[],
    content: initialContent,
  });

  useEffect(() => {
    if (author === undefined && !params?.viewonly && !params?.newpost) {
      router.push('/dashboard/posts');
      toast.error('You are not authorized to edit this post');
    }
  }, [author, router, user.id, params?.viewonly, params?.newpost]);

  if (author === undefined && !params?.viewonly && !params?.newpost) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={`${
        isFullScreen
          ? 'absolute top-0 left-0 z-10 w-screen h-screen'
          : 'w-full mt-16 md:mt-8'
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
            <ZMenuBar editor={editor} user={user} params={params} post={post} />
          </div>
          <div className='sticky top-12 border-gray-300'>
            <Todos
              editor={editor}
              existingTags={existingTags}
              postId={post?.id || ''}
              params={params || { id: '', viewonly: false, newpost: false }}
            />
          </div>
          <div className='w-full max-w-[836px] mx-auto bg-white flex-1 overflow-y-auto p-4 mb-4'>
            {post?.status === 'draft' || params?.newpost ? (
              <EditorContent editor={editor} />
            ) : (
              <div
                className='tiptap flex-1 w-full max-w-[836px] bg-white overflow-y-auto p-4 my-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto'
                dangerouslySetInnerHTML={{
                  __html:
                    typeof window !== 'undefined'
                      ? editor?.getHTML() || ''
                      : '',
                }}
              />
            )}
          </div>
        </div>
      </div>
      {showTagsModal && (
        <div
          className='fixed inset-0 bg-black/50 flex justify-center items-center'
          style={{ zIndex: 1000 }}
        >
          <TagsModal
            postId={post?.id || ''}
            tagsList={tagsList}
            params={params || { id: '', viewonly: false, newpost: false }}
          />
        </div>
      )}
    </div>
  );
}
