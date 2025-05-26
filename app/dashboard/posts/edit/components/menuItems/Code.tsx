'use client';

import { usePostsStore } from '@/app/store/store';
import { Editor } from '@tiptap/react';
import { BiCodeBlock } from 'react-icons/bi';
import { IoCode } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

type CodeProps = { editor: Editor | null };

export default function Code({ editor }: CodeProps) {
  const { isMenuBarMinimized } = usePostsStore();
  return (
    <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
      <Tooltip id='code' />
      <button
        onClick={() => editor?.chain().focus().toggleCode().run()}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : `p-2 rounded ${
                editor?.isActive('code')
                  ? 'bg-amber-200 text-black'
                  : 'hover:bg-gray-700 hover:text-white'
              } cursor-pointer`
        }`}
        aria-label='Code'
        data-tooltip-id='code'
        data-tooltip-content='Code (Inline code)'
        data-tooltip-place='bottom'
      >
        <IoCode />
      </button>

      <Tooltip id='code-block' />
      <button
        onClick={() => editor?.chain().focus().toggleCodeBlock().run()}
        className={`p-2 rounded ${
          editor?.isActive('codeBlock')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Code block'
        data-tooltip-id='code-block'
        data-tooltip-content='Code Block (Block of code)'
        data-tooltip-place='bottom'
      >
        <BiCodeBlock />
      </button>
    </div>
  );
}
