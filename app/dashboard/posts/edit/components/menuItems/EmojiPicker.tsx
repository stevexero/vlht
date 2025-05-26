'use client';

import { usePostsStore } from '@/app/store/store';
import { Editor } from '@tiptap/react';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BsEmojiSmile } from 'react-icons/bs';
import { Tooltip } from 'react-tooltip';

type EmojiPickerProps = { editor: Editor | null };

export default function EmojiPickerMenu({ editor }: EmojiPickerProps) {
  const { isMenuBarMinimized } = usePostsStore();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, right: 0 });

  const insertEmoji = (emojiData: EmojiClickData) => {
    editor?.chain().focus().insertContent(emojiData.emoji).run();
    setShowEmojiPicker(false);
  };

  const handleEmojiButtonClick = (event: React.MouseEvent) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setPickerPosition({
      top: rect.bottom + window.scrollY,
      right: rect.left + window.scrollX,
    });
    setShowEmojiPicker(!showEmojiPicker);
  };
  return (
    <div className={`${isMenuBarMinimized ? 'hidden' : 'relative'}`}>
      <Tooltip id='add-emoji' />
      <button
        onClick={handleEmojiButtonClick}
        className={`p-2 rounded is-dropdown ${
          showEmojiPicker
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Add emoji'
        data-tooltip-id='add-emoji'
        data-tooltip-content='Add Emoji'
        data-tooltip-place='bottom'
      >
        <BsEmojiSmile />
      </button>
      {showEmojiPicker &&
        typeof window !== 'undefined' &&
        createPortal(
          <div
            className='fixed inset-0 z-40'
            onClick={() => setShowEmojiPicker(false)}
          >
            <div
              className='absolute bg-gradient-to-b from-gray-500 to-gray-700 border border-gray-400 shadow-xl shadow-black/50 rounded-b-lg p-2'
              style={{
                top: `calc(${pickerPosition.top}px + 8px)`,
                left: `calc(${pickerPosition.right}px - 284px)`,
                zIndex: 41,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <EmojiPicker
                onEmojiClick={insertEmoji}
                width={300}
                height={400}
              />
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
