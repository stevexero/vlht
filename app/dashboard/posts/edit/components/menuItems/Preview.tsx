'use client';

import { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'react-tooltip';
import { Editor } from '@tiptap/react';
import toast from 'react-hot-toast';
import { usePostsStore } from '@/app/store/store';
import {
  createPostAction,
  publishPostToMailchimpAction,
  revertPostToDraftAction,
  updatePostTagsAction,
} from '@/app/lib/actions/actions';
import { IoClose, IoEyeSharp, IoSave, IoSend } from 'react-icons/io5';
import { User } from '@supabase/supabase-js';
import { SiMailchimp } from 'react-icons/si';
import { TbArticleFilled, TbArticleOff } from 'react-icons/tb';
import { processAndUploadImages } from '../../lib/processAndUploadImages';
import { useRouter } from 'next/navigation';

interface PreviewProps {
  editor: Editor | null;
  user: User;
  params?: { id: string; viewonly: boolean; newpost: boolean } | null;
  post?: {
    id: string;
    title: string;
    content: string;
    status: string;
    published_to_mailchimp: boolean;
    published_to_blog: boolean;
    published_at: string;
  } | null;
}

export default function Preview({ editor, user, params, post }: PreviewProps) {
  const router = useRouter();

  const { showPreview, setShowPreview, tempTagsList, setTempTagsList } =
    usePostsStore();
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const preview = () => {
    setShowPreview(true);
  };

  const closePreview = useCallback(() => {
    if (params?.viewonly) {
      router.push('/dashboard/posts');
      return;
    }
    setShowPreview(false);
  }, [setShowPreview, router, params?.viewonly]);

  const getDefaultTitle = () => {
    if (!editor) return 'Untitled';
    const html = editor.getHTML();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const h1 = doc.querySelector('h1');
    return h1?.textContent?.trim() || 'Untitled';
  };

  const publishArticle = async (
    platform: 'draft' | 'mailchimp' | 'blog' | 'everywhere'
  ) => {
    if (!editor) {
      toast.error('Editor not available');
      return;
    }

    toast(`Processing post for ${platform}...`);

    const content = editor.getHTML().trim();
    if (!content || content === '<p></p>') {
      toast.error('Post content cannot be empty');
      return;
    }

    const title = getDefaultTitle();
    if (!title.trim()) {
      toast.error('Please add a title to your post');
      return;
    }

    try {
      const { updatedContent, imageUrls } = await processAndUploadImages(
        content,
        user.id
      );
      console.log('Uploaded images:', imageUrls);

      const isDraft = platform === 'draft';
      const status = isDraft ? 'draft' : 'published';
      const published_at = isDraft ? null : new Date().toISOString();
      const published_to_mailchimp =
        platform === 'mailchimp' || platform === 'everywhere';

      const formData = new FormData();
      if (params?.id) {
        formData.append('id', params.id);
      }
      formData.append('author_id', user.id);
      formData.append('title', title);
      formData.append('content', updatedContent);
      formData.append('status', status);
      if (published_at) {
        formData.append('published_at', published_at);
      }
      if (platform === 'mailchimp' || platform === 'everywhere') {
        formData.append('published_to_mailchimp', 'true');
        if (post?.published_to_blog === false) {
          formData.append('published_to_blog', 'false');
        } else {
          formData.append('published_to_blog', 'true');
        }
      }
      if (platform === 'blog' || platform === 'everywhere') {
        formData.append('published_to_blog', 'true');
        if (post?.published_to_mailchimp === false) {
          formData.append('published_to_mailchimp', 'false');
        } else {
          formData.append('published_to_mailchimp', 'true');
        }
      }
      formData.append('metadata', JSON.stringify({ tags: [] }));

      const postResult = await createPostAction(formData);

      if (!postResult.success || !postResult.data?.id) {
        toast.error(postResult.error || 'Failed to save post');
        throw new Error(postResult.error || 'Failed to save post');
      }

      if (published_to_mailchimp) {
        const mailchimpResult = await publishToMailchimp(
          postResult.data.id,
          title,
          updatedContent
        );
        if (!mailchimpResult.success) {
          toast.error(
            mailchimpResult.error || 'Failed to send post to audience'
          );
          console.error(
            'Failed to send post to audience',
            mailchimpResult.error
          );
        }
      }

      // Add tags to post
      if (params?.newpost) {
        const promises = tempTagsList.map((tag) =>
          updatePostTagsAction(postResult.data.id, tag)
        );
        const results = await Promise.all(promises);

        if (results.every((result) => result.success)) {
          toast.success('Tags added successfully');
          setTempTagsList([]);
        } else {
          toast.error(
            results.find((result) => !result.success)?.error ||
              'Failed to add tags'
          );
        }
      }

      toast.success(
        isDraft ? 'Draft saved successfully!' : 'Post published successfully!'
      );
      closePreview();
      router.refresh();
    } catch (error) {
      console.error('Error publishing post:', error);
      toast.error('Failed to process post');
    }
  };

  const publishToMailchimp = async (
    postId: string,
    title: string,
    content: string
  ) => {
    try {
      const mailchimpResult = await publishPostToMailchimpAction({
        postId,
        title,
        content,
      });

      if (!mailchimpResult.success) {
        toast.error(mailchimpResult.error || 'Failed to send post to audience');
        return { success: false, error: mailchimpResult.error, data: null };
      }

      toast.success('Post published to Mailchimp successfully!');

      return { success: true, error: null, data: mailchimpResult };
    } catch (error) {
      console.error('Error publishing post to Mailchimp:', error);
      toast.error('Failed to publish post to Mailchimp');
      return {
        success: false,
        error: 'Failed to publish post to Mailchimp',
        data: null,
      };
    }
  };

  const revertPostToDraft = async (postId: string) => {
    const revertResult = await revertPostToDraftAction(postId);
    if (!revertResult.success) {
      toast.error(revertResult.error || 'Failed to revert post to draft');
    } else {
      toast.success('Post reverted to draft successfully!');
      closePreview();
      router.refresh();
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
      closeButtonRef.current?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [showPreview, closePreview]);

  useEffect(() => {
    if (params?.viewonly) {
      setShowPreview(true);
    }
  }, [params?.viewonly, setShowPreview]);

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
              className='bg-gray-300 rounded-lg w-full h-full flex flex-col'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex items-center justify-between px-4 py-2 bg-gray-800 text-white border-b border-gray-600'>
                <h2 className='font-semibold'>Post Preview</h2>
                <div className='flex items-center gap-2'>
                  {params?.viewonly ? null : (
                    <>
                      {post?.status === 'published' ? null : (
                        <button
                          onClick={() => publishArticle('draft')}
                          className='border border-gray-500 text-xs flex items-center gap-2 p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                          aria-label='Save Draft'
                        >
                          Save Draft
                          <IoSave size={12} />
                        </button>
                      )}
                      {post?.published_to_mailchimp ? null : (
                        <button
                          onClick={() => publishArticle('mailchimp')}
                          className='border border-gray-500 text-xs flex items-center gap-2 p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                          aria-label='Publish'
                        >
                          Publish to Mailchimp
                          <SiMailchimp size={12} />
                        </button>
                      )}
                      {post?.published_to_blog ? (
                        <button
                          onClick={() => revertPostToDraft(post?.id)}
                          className='border border-gray-500 text-xs flex items-center gap-2 p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                          aria-label='Unpublish'
                        >
                          Revert to Draft
                          <TbArticleOff size={12} />
                        </button>
                      ) : (
                        <button
                          onClick={() => publishArticle('blog')}
                          className='border border-gray-500 text-xs flex items-center gap-2 p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                          aria-label='Publish'
                        >
                          Publish to Blog
                          <TbArticleFilled size={12} />
                        </button>
                      )}
                      {post?.published_to_blog ||
                      post?.published_to_mailchimp ? null : (
                        <button
                          onClick={() => publishArticle('everywhere')}
                          className='border border-gray-500 text-xs flex items-center gap-2 p-2 rounded hover:bg-gray-700 hover:text-white focus:outline-none cursor-pointer'
                          aria-label='Publish'
                        >
                          Publish Everywhere
                          <IoSend size={12} />
                        </button>
                      )}
                    </>
                  )}
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
                className='tiptap flex-1 w-full max-w-[836px] bg-white overflow-y-auto p-4 my-4 prose prose-sm sm:prose lg:prose-lg xl:prose-xl mx-auto'
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
