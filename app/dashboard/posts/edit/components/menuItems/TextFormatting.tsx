'use client';

import { ImClearFormatting } from 'react-icons/im';
import { ImBold, ImItalic, ImStrikethrough } from 'react-icons/im';
import { Tooltip } from 'react-tooltip';
import { Editor } from '@tiptap/react';
import { usePostsStore } from '@/app/store/store';

type MenuBarProps = { editor: Editor | null };

export default function TextFormatting({ editor }: MenuBarProps) {
  const { isMenuBarMinimized } = usePostsStore();

  if (!editor) {
    return null;
  }
  return (
    <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
      <Tooltip id='bold' />
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={`p-2 rounded ${
          editor.isActive('bold')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Bold'
        data-tooltip-id='bold'
        data-tooltip-content='Bold'
        data-tooltip-place='bottom'
      >
        <ImBold />
      </button>

      <Tooltip id='italic' />
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${
          editor.isActive('italic')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Italic'
        data-tooltip-id='italic'
        data-tooltip-content='Italic'
        data-tooltip-place='bottom'
      >
        <ImItalic />
      </button>

      <Tooltip id='strikethrough' />
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : `p-2 rounded ${
                editor.isActive('strike')
                  ? 'bg-amber-200 text-black'
                  : 'hover:bg-gray-700 hover:text-white'
              } cursor-pointer`
        }`}
        aria-label='Strikethrough'
        data-tooltip-id='strikethrough'
        data-tooltip-content='Strikethrough'
        data-tooltip-place='bottom'
      >
        <ImStrikethrough />
      </button>

      <Tooltip id='clear-formatting' />
      <button
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        }`}
        aria-label='Clear formatting'
        data-tooltip-id='clear-formatting'
        data-tooltip-content='Clear Formatting (Removes formatting)'
        data-tooltip-place='bottom'
      >
        <ImClearFormatting />
      </button>
    </div>
  );
}
