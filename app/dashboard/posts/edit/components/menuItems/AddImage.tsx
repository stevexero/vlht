'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { User } from '@supabase/supabase-js';
import { Tooltip } from 'react-tooltip';
import toast from 'react-hot-toast';
import { Editor } from '@tiptap/react';
import { IoImageSharp, IoClose } from 'react-icons/io5';

type AddImageProps = { editor: Editor | null; user: User };

export default function AddImage({ editor }: AddImageProps) {
  const [showModal, setShowModal] = useState(false);
  const [isUrlMode, setIsUrlMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);

  const processImageToDataUrl = (file: File): Promise<{ dataUrl: string }> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        const dataUrl = reader.result as string;
        resolve({ dataUrl });
      };

      reader.onerror = () => reject(new Error('Failed to read file'));

      reader.readAsDataURL(file);
    });
  };

  const validateAndProcessImage = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return null;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error('Image size must be less than 5MB');
      return null;
    }

    try {
      const { dataUrl } = await processImageToDataUrl(file);
      return { dataUrl, file };
    } catch (error) {
      console.error('Error processing image:', error);
      toast.error('Failed to process image');
      return null;
    }
  }, []);

  const insertImage = useCallback(
    (dataUrl: string) => {
      if (!editor) {
        toast.error('Editor not available');
        return;
      }

      editor.chain().focus().setImage({ src: dataUrl }).run();

      toast.success('Image added successfully!');
    },
    [editor]
  );

  const handleInsertUrl = () => {
    if (!editor) {
      toast.error('Editor not available');
      return;
    }

    const url = urlInputRef.current?.value?.trim();
    if (!url) {
      toast.error('Please enter an image URL');
      return;
    }

    if (!url.match(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i)) {
      toast.error('Please enter a valid image URL (e.g., .png, .jpg)');
      return;
    }

    insertImage(url);
    setShowModal(false);
  };

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const result = await validateAndProcessImage(file);
    if (result) {
      insertImage(result.dataUrl);
      setShowModal(false);
    }
  };

  const handlePaste = useCallback(
    (event: Event) => {
      const clipboardEvent = event as ClipboardEvent;
      const items = clipboardEvent.clipboardData?.items;
      if (!items || !editor) return;

      for (const item of items) {
        if (item.type.startsWith('image/')) {
          event.preventDefault();
          const file = item.getAsFile();
          if (file) {
            validateAndProcessImage(file).then((result) => {
              if (result) {
                insertImage(result.dataUrl);
              }
            });
          }
        } else if (item.type === 'text/plain') {
          item.getAsString((text) => {
            if (text.match(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp)$/i)) {
              event.preventDefault();
              insertImage(text);
            }
          });
        }
      }
    },
    [editor, validateAndProcessImage, insertImage]
  );

  const handleDragOver = useCallback((event: Event) => {
    event.preventDefault();
    editorRef.current?.classList.add('dragging');
  }, []);

  const handleDragLeave = useCallback((event: Event) => {
    event.preventDefault();
    editorRef.current?.classList.remove('dragging');
  }, []);

  const handleDrop = useCallback(
    async (event: Event) => {
      const dragEvent = event as DragEvent;
      dragEvent.preventDefault();
      editorRef.current?.classList.remove('dragging');

      const files = dragEvent.dataTransfer?.files;
      if (!files || files.length === 0 || !editor) return;

      const file = files[0];
      const result = await validateAndProcessImage(file);
      if (result) {
        insertImage(result.dataUrl);
      }
    },
    [editor, validateAndProcessImage, insertImage]
  );

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const openModal = () => {
    setShowModal(true);
    setIsUrlMode(false);
  };

  useEffect(() => {
    console.log('editor');
    const editorElement = document.querySelector('.ProseMirror');
    if (editorElement) {
      editorRef.current = editorElement as HTMLDivElement;
      editorElement.addEventListener('paste', handlePaste);
      editorElement.addEventListener('dragover', handleDragOver);
      editorElement.addEventListener('dragleave', handleDragLeave);
      editorElement.addEventListener('drop', handleDrop);
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.removeEventListener('paste', handlePaste);
        editorRef.current.removeEventListener('dragover', handleDragOver);
        editorRef.current.removeEventListener('dragleave', handleDragLeave);
        editorRef.current.removeEventListener('drop', handleDrop);
      }
    };
  }, [editor, handlePaste, handleDragOver, handleDragLeave, handleDrop]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };

    const handleFocusTrap = (event: KeyboardEvent) => {
      if (!showModal || !modalRef.current) return;
      const focusableElements = modalRef.current.querySelectorAll(
        'button, input, [tabindex]:not([tabindex="-1"])'
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

    if (showModal) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleFocusTrap);
      modalRef.current?.querySelector('button')?.focus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleFocusTrap);
    };
  }, [showModal]);

  return (
    <>
      <Tooltip id='add-image' />
      <button
        onClick={openModal}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Add image'
        data-tooltip-id='add-image'
        data-tooltip-content='Add Image'
        data-tooltip-place='bottom'
      >
        <IoImageSharp />
      </button>
      {showModal &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'
            onClick={() => setShowModal(false)}
            role='dialog'
            aria-modal='true'
            aria-label='Add image modal'
            ref={modalRef}
          >
            <div
              className='bg-gray-800 text-white rounded-lg p-6 max-w-md w-full'
              onClick={(e) => e.stopPropagation()}
            >
              <div className='flex justify-between items-center mb-4'>
                <h2 className='text-lg font-semibold'>Add Image</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className='p-2 rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-200'
                  aria-label='Close modal'
                >
                  <IoClose size={20} />
                </button>
              </div>
              {isUrlMode ? (
                <div className='flex flex-col gap-4'>
                  <input
                    type='text'
                    ref={urlInputRef}
                    placeholder='Enter image URL'
                    className='w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-200'
                    aria-label='Image URL'
                  />
                  <div className='flex gap-2'>
                    <button
                      onClick={() => setIsUrlMode(false)}
                      className='flex-1 p-2 rounded bg-gray-600 hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-200'
                    >
                      Back
                    </button>
                    <button
                      onClick={handleInsertUrl}
                      className='flex-1 p-2 rounded bg-amber-200 text-black hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200'
                    >
                      Insert URL
                    </button>
                  </div>
                </div>
              ) : (
                <div className='flex flex-col gap-4'>
                  <button
                    onClick={() => setIsUrlMode(true)}
                    className='p-2 rounded bg-amber-200 text-black hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200'
                  >
                    Enter an Image URL
                  </button>
                  <button
                    onClick={triggerFileInput}
                    className='p-2 rounded bg-amber-200 text-black hover:bg-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-200'
                  >
                    Upload from Device
                  </button>
                  <input
                    type='file'
                    accept='image/*'
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    className='hidden'
                    aria-hidden='true'
                  />
                </div>
              )}
            </div>
          </div>,
          document.body
        )}
      <style jsx>{`
        .ProseMirror.dragging {
          border: 2px dashed #fbbf24 !important; /* amber-200 */
        }
      `}</style>
    </>
  );
}
