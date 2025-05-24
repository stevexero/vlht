'use client';

import { useState, useRef } from 'react';
import { Editor } from '@tiptap/react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'react-tooltip';
import {
  IoCode,
  IoLinkSharp,
  IoImageSharp,
  IoColorPaletteSharp,
} from 'react-icons/io5';
import { IoMdQuote } from 'react-icons/io';
import { LuSeparatorHorizontal, LuMaximize } from 'react-icons/lu';
import { BsEmojiSmile, BsFileBreak } from 'react-icons/bs';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { usePostsStore } from '../postsStore';
import { LiaWindowMinimize } from 'react-icons/lia';
import { BiCodeBlock } from 'react-icons/bi';
import { VscClearAll } from 'react-icons/vsc';
import UndoRedo from './menuItems/UndoRedo';
import HeadingsParagraph from './menuItems/HeadingsParagraph';
import TextFormatting from './menuItems/TextFormatting';
import TextAlign from './menuItems/TextAlign';
import Lists from './menuItems/Lists';

type MenuBarProps = { editor: Editor | null };

export default function ZMenuBar({ editor }: MenuBarProps) {
  const {
    isFullScreen,
    setIsFullScreen,
    isMenuBarMinimized,
    setIsMenuBarMinimized,
  } = usePostsStore();

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, right: 0 });

  const colorInputRef = useRef<HTMLInputElement>(null);

  if (!editor) {
    return null;
  }

  const setLink = () => {
    const url = window.prompt('Enter the URL');
    if (url === null) return;
    if (url === '') {
      editor.chain().focus().unsetLink().run();
    } else {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  const setImage = () => {
    const url = window.prompt('Enter the image URL');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const setColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    editor.chain().focus().setColor(color).run();
  };

  const openColorPicker = () => {
    if (colorInputRef.current) {
      colorInputRef.current.click();
    }
  };

  const insertEmoji = (emojiData: EmojiClickData) => {
    editor.chain().focus().insertContent(emojiData.emoji).run();
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

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const clearAllText = () => {
    editor.chain().focus().clearContent().run();
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2 p-2 bg-gray-800 ${
        isFullScreen ? '' : 'rounded-t-md'
      } text-white`}
    >
      <UndoRedo editor={editor} />
      <HeadingsParagraph editor={editor} />
      <TextFormatting editor={editor} />
      <TextAlign editor={editor} />
      <Lists editor={editor} />

      {/* Code and Blockquote */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
        <Tooltip id='code' />
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={`${
            isMenuBarMinimized
              ? 'hidden'
              : `p-2 rounded ${
                  editor.isActive('code')
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
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${
            editor.isActive('codeBlock')
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

        <Tooltip id='blockquote' />
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive('blockquote')
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
      </div>

      {/* Horizontal Rule and Hard Break */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
        <Tooltip id='horizontal-rule' />
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
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
          onClick={() => editor.chain().focus().setHardBreak().run()}
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

      <Tooltip id='add-link' />
      <button
        onClick={setLink}
        className={`p-2 rounded ${
          editor.isActive('link')
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

      {/* Text Color Picker Icon button */}
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
      {/* <Tooltip id='text-color-picker' />
      <div
        className={`${
          isMenuBarMinimized ? 'hidden' : 'flex flex-col items-center mt-4'
        }`}
        data-tooltip-id='text-color-picker'
        data-tooltip-content='Choose text color'
        data-tooltip-place='bottom'
      >
        <label
          htmlFor='text-color-picker'
          className='cursor-pointer'
        >
          <IoColorPaletteSharp />
        </label>
        <input
          id='text-color-picker'
          type='color'
          onChange={setColor}
          className={`${
            isMenuBarMinimized ? 'hidden' : 'w-8 h-4'
          } cursor-pointer`}
          aria-label='Choose text color'
        />
      </div> */}

      {/* Emoji Picker */}
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

      {/* Full screen mode */}
      <Tooltip id='full-screen' />
      <button
        onClick={toggleFullScreen}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Full screen'
        data-tooltip-id='full-screen'
        data-tooltip-content='Full Screen'
        data-tooltip-place='bottom'
      >
        <LuMaximize />
      </button>

      {/* Minimize Menu Bar */}
      <Tooltip id='minimize-menu-bar' />
      <button
        onClick={() => setIsMenuBarMinimized(!isMenuBarMinimized)}
        className='block md:hidden p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Full screen'
        data-tooltip-id='full-screen'
        data-tooltip-content='Full Screen'
        data-tooltip-place='bottom'
      >
        <LiaWindowMinimize />
      </button>

      {/* Clear All Text */}
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
    </div>
  );
}
