'use client';

import { IoArrowRedoSharp } from 'react-icons/io5';
import { IoArrowUndoSharp } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';
import { usePostsStore } from '@/app/store/store';
import { Editor } from '@tiptap/react';

type MenuBarProps = { editor: Editor | null };

export default function UndoRedo({ editor }: MenuBarProps) {
  const { isMenuBarMinimized } = usePostsStore();

  if (!editor) {
    return null;
  }

  return (
    <div
      className={`${
        isMenuBarMinimized
          ? 'hidden'
          : 'flex items-center gap-2 border-r border-gray-500 pr-2'
      }`}
    >
      <Tooltip id='undo' />
      <button
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Undo'
        data-tooltip-id='undo'
        data-tooltip-content='Undo'
        data-tooltip-place='bottom'
      >
        <IoArrowUndoSharp />
      </button>
      <Tooltip id='redo' />
      <button
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Redo'
        data-tooltip-id='redo'
        data-tooltip-content='Redo'
        data-tooltip-place='bottom'
      >
        <IoArrowRedoSharp />
      </button>
    </div>
  );
}
