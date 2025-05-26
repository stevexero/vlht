'use client';

import { Editor } from '@tiptap/react';
import { VscClearAll } from 'react-icons/vsc';
import { Tooltip } from 'react-tooltip';

type ClearTextProps = { editor: Editor | null };

const ClearText = ({ editor }: ClearTextProps) => {
  const clearAllText = () => {
    editor?.chain().focus().clearContent().run();
  };

  return (
    <>
      <Tooltip id='clear-all-text' />
      <button
        onClick={clearAllText}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Clear all text'
        data-tooltip-id='clear-all-text'
        data-tooltip-content='Clear All Text'
        data-tooltip-place='bottom'
      >
        <VscClearAll />
      </button>
    </>
  );
};

export default ClearText;
