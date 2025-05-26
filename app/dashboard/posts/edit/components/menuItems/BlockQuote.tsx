'use client';

import { Editor } from '@tiptap/react';
import { IoMdQuote } from 'react-icons/io';
import { Tooltip } from 'react-tooltip';

type BlockQuoteProps = { editor: Editor | null };

export default function BlockQuote({ editor }: BlockQuoteProps) {
  return (
    <>
      <Tooltip id='blockquote' />
      <button
        onClick={() => editor?.chain().focus().toggleBlockquote().run()}
        className={`p-2 rounded ${
          editor?.isActive('blockquote')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Blockquote'
        data-tooltip-id='blockquote'
        data-tooltip-content='Blockquote (Quote)'
        data-tooltip-place='bottom'
      >
        <IoMdQuote />
      </button>
    </>
  );
}
