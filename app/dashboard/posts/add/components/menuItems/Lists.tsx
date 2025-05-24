'use client';

import { LuList, LuListOrdered } from 'react-icons/lu';
import { Tooltip } from 'react-tooltip';
import { Editor } from '@tiptap/react';

type MenuBarProps = { editor: Editor | null };

export default function Lists({ editor }: MenuBarProps) {
  if (!editor) {
    return null;
  }
  return (
    <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
      <Tooltip id='bullet-list' />
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${
          editor.isActive('bulletList')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Bullet list'
        data-tooltip-id='bullet-list'
        data-tooltip-content='Bullet List (Unordered List)'
        data-tooltip-place='bottom'
      >
        <LuList />
      </button>
      <Tooltip id='numbered-list' />
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${
          editor.isActive('orderedList')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Numbered list'
        data-tooltip-id='numbered-list'
        data-tooltip-content='Numbered List (Ordered List)'
        data-tooltip-place='bottom'
      >
        <LuListOrdered />
      </button>
    </div>
  );
}
