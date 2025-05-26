'use client';

import { Tooltip } from 'react-tooltip';
import { Editor } from '@tiptap/react';
import { usePostsStore } from '@/app/store/store';
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
} from 'react-icons/lu';
import { TbNotesOff } from 'react-icons/tb';

type MenuBarProps = { editor: Editor | null };

export default function TextAlign({ editor }: MenuBarProps) {
  const { isMenuBarMinimized } = usePostsStore();

  if (!editor) {
    return null;
  }
  return (
    <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
      <Tooltip id='align-left' />
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: 'left' })
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Align left'
        data-tooltip-id='align-left'
        data-tooltip-content='Align Left'
        data-tooltip-place='bottom'
      >
        <LuAlignLeft />
      </button>

      <Tooltip id='align-center' />
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: 'center' })
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Align center'
        data-tooltip-id='align-center'
        data-tooltip-content='Align Center'
        data-tooltip-place='bottom'
      >
        <LuAlignCenter />
      </button>

      <Tooltip id='align-right' />
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: 'right' })
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Align right'
        data-tooltip-id='align-right'
        data-tooltip-content='Align Right'
        data-tooltip-place='bottom'
      >
        <LuAlignRight />
      </button>

      <Tooltip id='justify' />
      <button
        onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        className={`p-2 rounded ${
          editor.isActive({ textAlign: 'justify' })
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Justify'
        data-tooltip-id='justify'
        data-tooltip-content='Justify (Align text to both sides)'
        data-tooltip-place='bottom'
      >
        <LuAlignJustify />
      </button>

      <Tooltip id='unset-text-align' />
      <button
        onClick={() => editor.chain().focus().unsetTextAlign().run()}
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : `p-2 rounded ${
                editor.isActive({ textAlign: 'left' })
                  ? 'hover:bg-gray-700 hover:text-white'
                  : editor.isActive({ textAlign: 'center' })
                  ? 'hover:bg-gray-700 hover:text-white'
                  : editor.isActive({ textAlign: 'right' })
                  ? 'hover:bg-gray-700 hover:text-white'
                  : editor.isActive({ textAlign: 'justify' })
                  ? 'hover:bg-gray-700 hover:text-white'
                  : 'bg-amber-200 text-black'
              } cursor-pointer`
        }`}
        aria-label='Unset text align'
        data-tooltip-id='unset-text-align'
        data-tooltip-content='Unset Text Align (Remove alignment)'
        data-tooltip-place='bottom'
      >
        <TbNotesOff />
      </button>
    </div>
  );
}
