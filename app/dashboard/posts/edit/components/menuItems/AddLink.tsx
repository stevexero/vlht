'use client';

import { Editor } from '@tiptap/react';
import { IoLinkSharp } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

type AddLinkProps = { editor: Editor | null };

export default function AddLink({ editor }: AddLinkProps) {
  const setLink = () => {
    const url = window.prompt('Enter the URL');
    if (url === null) return;
    if (url === '') {
      editor?.chain().focus().unsetLink().run();
    } else {
      editor?.chain().focus().setLink({ href: url }).run();
    }
  };
  return (
    <>
      <Tooltip id='add-link' />
      <button
        onClick={setLink}
        className={`p-2 rounded ${
          editor?.isActive('link')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Add link'
        data-tooltip-id='add-link'
        data-tooltip-content='Add Link'
        data-tooltip-place='bottom'
      >
        <IoLinkSharp />
      </button>
    </>
  );
}
