'use client';

import { usePostsStore } from '@/app/store/store';
import { Editor } from '@tiptap/react';
import { BsFileBreak } from 'react-icons/bs';
import { LuSeparatorHorizontal } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';

type PageFormattingProps = { editor: Editor | null };

export default function PageFormatting({ editor }: PageFormattingProps) {
  const { isMenuBarMinimized } = usePostsStore();

  return (
    <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
      <Tooltip id='horizontal-rule' />
      <button
        onClick={() => editor?.chain().focus().setHorizontalRule().run()}
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        }`}
        aria-label='Horizontal rule'
        data-tooltip-id='horizontal-rule'
        data-tooltip-content='Horizontal Rule (Line)'
        data-tooltip-place='bottom'
      >
        <LuSeparatorHorizontal />
      </button>

      <Tooltip id='hard-break' />
      <button
        onClick={() => editor?.chain().focus().setHardBreak().run()}
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        }`}
        aria-label='Hard break'
        data-tooltip-id='hard-break'
        data-tooltip-content='Hard Break (Line break)'
        data-tooltip-place='bottom'
      >
        <BsFileBreak />
      </button>
    </div>
  );
}
