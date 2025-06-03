'use client';

import { useState, useEffect, useCallback } from 'react';
import { Editor } from '@tiptap/react';
import { FaTimesCircle } from 'react-icons/fa';
import { removePostTagAction } from '@/app/lib/actions/postActions';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { usePostsStore } from '@/app/store/postsStore';

interface TodosProps {
  editor: Editor | null;
  existingTags: string[];
  postId: string;
  params: { id: string; viewonly: boolean; newpost: boolean };
}

export default function Todos({
  editor,
  existingTags,
  postId,
  params,
}: TodosProps) {
  const router = useRouter();
  const { tempTagsList, setTempTagsList } = usePostsStore();
  const [hasH1, setHasH1] = useState(false);
  const [hasImg, setHasImg] = useState(false);
  const [hasParagraph, setHasParagraph] = useState(false);

  const scanDocument = useCallback(() => {
    if (!editor) return;

    let foundH1 = false;
    let foundImg = false;
    let foundParagraph = false;

    editor.state.doc.descendants((node) => {
      if (
        node.type.name === 'heading' &&
        node.attrs.level === 1 &&
        node.textContent.trim()
      ) {
        foundH1 = true;
      }
      if (node.type.name === 'image') {
        foundImg = true;
      }
      if (node.type.name === 'paragraph' && node.textContent.trim()) {
        foundParagraph = true;
      }
    });

    setHasH1(foundH1);
    setHasImg(foundImg);
    setHasParagraph(foundParagraph);
  }, [editor]);

  const handleRemoveTag = async (tag: string) => {
    const { success, error } = await removePostTagAction(postId, tag);
    if (success) {
      toast.success('Tag removed successfully');
      router.refresh();
    } else {
      toast.error(error);
    }
  };

  const handleRemoveStagedTag = async (tag: string) => {
    setTempTagsList(tempTagsList.filter((t) => t !== tag));
  };

  useEffect(() => {
    if (!editor) return;

    scanDocument();

    const handleTransaction = () => {
      scanDocument();
    };

    editor.on('transaction', handleTransaction);

    return () => {
      editor.off('transaction', handleTransaction);
    };
  }, [editor, scanDocument]);

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 p-2'>
      {!hasH1 && (
        <div
          className='bg-red-300/50 rounded-3xl text-red-600 border border-red-600 py-1 px-3 text-xs font-bold'
          aria-label='Todo: Add a title'
        >
          Add Title
        </div>
      )}
      {!hasImg && (
        <div
          className='bg-red-300/50 rounded-3xl text-red-600 border border-red-600 py-1 px-3 text-xs font-bold'
          aria-label='Todo: Add an image'
        >
          Add Image
        </div>
      )}
      {!hasParagraph && (
        <div
          className='bg-red-300/50 rounded-3xl text-red-600 border border-red-600 py-1 px-3 text-xs font-bold'
          aria-label='Todo: Add a paragraph'
        >
          Add a Paragraph
        </div>
      )}
      {(!params?.newpost && existingTags.length === 0) ||
      (params?.newpost && tempTagsList.length === 0) ? (
        <div
          className='bg-red-300/50 rounded-3xl text-red-600 border border-red-600 py-1 px-3 text-xs font-bold'
          aria-label='Todo: Add tags'
        >
          Add Tags
        </div>
      ) : params?.newpost ? (
        tempTagsList.map((tag: string) => (
          <div
            key={tag}
            className='bg-yellow-200/50 rounded-3xl text-yellow-800 border border-yellow-800 py-1 px-3 text-xs font-bold flex items-center gap-1'
          >
            {tag}
            <button
              className='text-red-600'
              aria-label='Remove tag'
              onClick={() => handleRemoveStagedTag(tag)}
            >
              <FaTimesCircle className='text-red-600 cursor-pointer hover:text-red-700' />
            </button>
          </div>
        ))
      ) : (
        existingTags.map((tag) => (
          <div
            key={tag}
            className='bg-yellow-200/50 rounded-3xl text-yellow-800 border border-yellow-800 py-1 px-3 text-xs font-bold flex items-center gap-1'
          >
            {tag}
            <button
              className='text-red-600'
              aria-label='Remove tag'
              onClick={() => handleRemoveTag(tag)}
            >
              <FaTimesCircle className='text-red-600 cursor-pointer hover:text-red-700' />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
