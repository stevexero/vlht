'use client';

import { Editor } from '@tiptap/react';
import { IoImageSharp } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

type AddImageProps = { editor: Editor | null };

export default function AddImage({ editor }: AddImageProps) {
  const setImage = () => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };
  return (
    <>
      <Tooltip id='add-image' />
      <button
        onClick={setImage}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Add image'
        data-tooltip-id='add-image'
        data-tooltip-content='Add Image'
        data-tooltip-place='bottom'
      >
        <IoImageSharp />
      </button>
    </>
  );
}
