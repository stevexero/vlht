'use client';

import { useEffect, useRef, useCallback } from 'react';
import { usePostsStore } from '../../postsStore';
import { IoClose, IoEyeSharp, IoSave, IoSend } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import { Editor } from '@tiptap/react';
import { createPortal } from 'react-dom';
import toast from 'react-hot-toast';
import { createPostAction } from '@/app/lib/actions/actions';
import { createClient, User } from '@supabase/supabase-js';

interface PreviewProps {
  editor: Editor | null;
  user: User;
}

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Preview({ editor, user }: PreviewProps) {
  const { showPreview, setShowPreview } = usePostsStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const preview = () => {
    setShowPreview(true);
  };

  const closePreview = useCallback(() => {
    setShowPreview(false);
  }, [setShowPreview]);

  const getDefaultTitle = () => {
    if (!editor) return 'Untitled';
    const html = editor.getHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const h1 = doc.querySelector('h1');
    return h1?.textContent?.trim() || 'Untitled';
  };

  const saveDraft = async () => {
    if (!editor) {
      toast.error('Editor not available');
      return;
    }

    toast('Saving draft...');

    const content = editor.getHTML().trim();

    if (!content || content === '<p></p>') {
      toast.error('Post content cannot be empty');
      return;
    }

    const title =
      prompt('Enter post title', getDefaultTitle()) || 'Untitled Draft';
    if (!title.trim()) {
      toast.error('Post title cannot be empty');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('author_id', user.id);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('status', 'draft');
      formData.append('metadata', JSON.stringify({ tags: [] }));

      const result = await createPostAction(formData);
      console.log(result);

      if (!result.success) {
        toast.error(result.error || 'Failed to save draft');
        throw new Error(result.error || 'Failed to save draft');
      }
      toast.success('Draft saved successfully!');
      closePreview();
    } catch (error) {
      console.error('Error saving draft:', error);
      toast.error('Failed to save draft');
    }
  };

  const publishPost = async () => {
    if (!editor) {
      toast.error('Editor not available');
      return;
    }
    const content = editor.getHTML().trim();
    if (!content || content === '<p></p>') {
      toast.error('Post content cannot be empty');
      return;
    }
    const title =
      prompt('Enter post title', getDefaultTitle()) || 'Untitled Post';
    if (!title.trim()) {
      toast.error('Post title cannot be empty');
      return;
    }

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();
      if (authError || !user) {
        toast.error('Please log in to publish a post');
        return;
      }

      const formData = new FormData();
      formData.append('author_id', user.id);
      formData.append('title', title);
      formData.append('content', content);
      formData.append('status', 'published');
      formData.append('published_at', new Date().toISOString());
      formData.append('metadata', JSON.stringify({ tags: [] }));

      const result = await createPostAction(formData);

      if (!result.success) {
        toast.error(result.error || 'Failed to publish post');
        throw new Error(result.error || 'Failed to publish post');
      }
      toast.success('Post published successfully!');
      closePreview();
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to publish post');
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showPreview) {
        closePreview();
      }
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!showPreview || !modalRef.current || !closeButtonRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    if (showPreview) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleFocusTrap);
      closeButtonRef.current?.focus(); // Focus close button when modal opens
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [showPreview, closePreview]);

  return (
    <>
      <Tooltip id='preview' />
      <button
        onClick={preview}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Preview'
        data-tooltip-id='preview'
        data-tooltip-content='Preview'
        data-tooltip-place='bottom'
      >
        <IoEyeSharp />
      </button>

      {showPreview &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className='w-screen h-screen fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={closePreview}
            role='dialog'
            aria-modal='true'
            aria-label='Preview post'
            ref={modalRef}
          >
            <div
              className='bg-white rounded-lg w-full h-full flex flex-col'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-center justify-between px-4 py-2 bg-gray-800 text-white border-b border-gray-600'>
                <h2 className='font-semibold'>Post Preview</h2>
                <div className='flex items-center gap-2'>
                  <button
                    onClick={saveDraft}
                    className='border border-gray-500 text-xs flex items-center gap-2 p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                    aria-label='Save Draft'
                  >
                    Save Draft
                    <IoSave size={12} />
                  </button>
                  <button
                    onClick={publishPost}
                    className='border border-gray-500 text-xs flex items-center gap-2 p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                    aria-label='Publish'
                  >
                    Publish
                    <IoSend size={12} />
                  </button>
                  <button
                    ref={closeButtonRef}
                    onClick={closePreview}
                    className='p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                    aria-label='Close preview'
                  >
                    <IoClose size={16} />
                  </button>
                </div>
              </div>
              <div
                className='tiptap flex-1 overflow-y-auto p-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto'
                dangerouslySetInnerHTML={{
                  __html:
                    typeof window !== 'undefined'
                      ? editor?.getHTML() || ''
                      : '',
                }}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
}
