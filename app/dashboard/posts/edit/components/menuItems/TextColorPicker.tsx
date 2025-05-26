'use client';

import { usePostsStore } from '@/app/store/store';
import { Editor } from '@tiptap/react';
import React, { useRef } from 'react';
import { IoColorPaletteSharp } from 'react-icons/io5';
import { Tooltip } from 'react-tooltip';

type TextColorPickerProps = { editor: Editor | null };

export default function TextColorPicker({ editor }: TextColorPickerProps) {
  const { isMenuBarMinimized } = usePostsStore();

  const colorInputRef = useRef<HTMLInputElement>(null);

  const setColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    editor?.chain().focus().setColor(color).run();
  };

  const openColorPicker = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };
  return (
    <div
      className={`tooltip-container ${
        isMenuBarMinimized ? 'hidden' : 'flex flex-col items-center'
      }`}
    >
      <Tooltip id='text-color-picker' />
      <button
        onClick={openColorPicker}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Choose text color'
        data-tooltip-id='text-color-picker'
        data-tooltip-content='Choose text color'
        data-tooltip-place='bottom'
      >
        <IoColorPaletteSharp />
      </button>
      <input
        ref={colorInputRef}
        id='text-color-picker'
        type='color'
        onChange={setColor}
        className='w-0 h-0 opacity-0 absolute'
        aria-hidden='true'
      />
    </div>
  );
}
