'use client';

import { useState } from 'react';
import { Editor } from '@tiptap/react';
import { createPortal } from 'react-dom';
import {
  IoArrowRedoSharp,
  IoArrowUndoSharp,
  IoCode,
  IoLinkSharp,
  IoImageSharp,
  IoColorPaletteSharp,
} from 'react-icons/io5';
import {
  ImBold,
  ImClearFormatting,
  ImItalic,
  ImStrikethrough,
} from 'react-icons/im';
import { IoMdQuote } from 'react-icons/io';
import { TbClearFormatting, TbNotesOff } from 'react-icons/tb';
import { TfiParagraph } from 'react-icons/tfi';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
  LuList,
  LuListOrdered,
  LuSeparatorHorizontal,
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
  LuMaximize,
} from 'react-icons/lu';
import { BsEmojiSmile, BsFileBreak } from 'react-icons/bs';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { usePostsStore } from '../postsStore';
import { LiaWindowMinimize } from 'react-icons/lia';
import { BiCodeBlock } from 'react-icons/bi';

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
  const [headingPickerPosition, setHeadingPickerPosition] = useState({
    top: 0,
    right: 0,
  });
  const [showHeadingPicker, setShowHeadingPicker] = useState(false);

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

  const handleHeadingButtonClick = (event: React.MouseEvent) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setHeadingPickerPosition({
      top: rect.bottom + window.scrollY,
      right: rect.left + window.scrollX,
    });
    setShowHeadingPicker(!showHeadingPicker);
  };

  const headingOptions = [
    { value: 'heading1', icon: <LuHeading1 /> },
    { value: 'heading2', icon: <LuHeading2 /> },
    { value: 'heading3', icon: <LuHeading3 /> },
    { value: 'heading4', icon: <LuHeading4 /> },
    { value: 'heading5', icon: <LuHeading5 /> },
    { value: 'heading6', icon: <LuHeading6 /> },
  ];

  const getActiveHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor.isActive('heading', { level })) {
        return `heading${level}`;
      }
    }
    if (editor.isActive('paragraph')) {
      return 'paragraph';
    }
    return 'heading1';
  };

  const activeHeading = getActiveHeading();
  const isHeadingActive = activeHeading.startsWith('heading');
  const selectedOption =
    headingOptions.find((opt) => opt.value === activeHeading) ||
    headingOptions[0];

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-2 p-2 bg-gray-800 ${
        isFullScreen ? '' : 'rounded-t-md'
      } text-white`}
    >
      {/* Undo and Redo */}
      <div
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : 'flex items-center gap-2 border-r border-gray-500 pr-2'
        }`}
      >
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
          aria-label='Undo'
        >
          <IoArrowUndoSharp />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
          aria-label='Redo'
        >
          <IoArrowRedoSharp />
        </button>
      </div>

      {/* Headings and Paragraph */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
        {/* Headings Dropdown */}
        <div className='relative'>
          <button
            onClick={handleHeadingButtonClick}
            className={`p-2 rounded is-dropdown ${
              isHeadingActive
                ? 'bg-amber-200 text-black'
                : 'hover:bg-gray-700 hover:text-white'
            } cursor-pointer`}
            aria-label='Show headings'
          >
            {selectedOption.icon}
          </button>
          {showHeadingPicker &&
            typeof window !== 'undefined' &&
            createPortal(
              <div
                className='fixed inset-0 z-40'
                onClick={() => setShowHeadingPicker(false)}
              >
                <div
                  className='absolute'
                  style={{
                    top: `calc(${headingPickerPosition.top}px - 4px)`,
                    left: `calc(${headingPickerPosition.right}px - 4px)`,
                    zIndex: 41,
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className='bg-gradient-to-b from-gray-500 to-gray-700 border border-gray-400 shadow-xl shadow-black/50 rounded-b-lg mt-4 text-sm text-gray-100 py-2 px-1'>
                    <button
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: 1 })
                          .run();
                        setShowHeadingPicker(false);
                      }}
                      className={`p-2 rounded ${
                        editor.isActive('heading', { level: 1 })
                          ? 'bg-amber-200 text-black'
                          : 'hover:bg-gray-600 hover:text-white'
                      } cursor-pointer`}
                      aria-label='Heading 1'
                    >
                      <LuHeading1 />
                    </button>
                    <button
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: 2 })
                          .run();
                        setShowHeadingPicker(false);
                      }}
                      className={`p-2 rounded ${
                        editor.isActive('heading', { level: 2 })
                          ? 'bg-amber-200 text-black'
                          : 'hover:bg-gray-600 hover:text-white'
                      } cursor-pointer`}
                      aria-label='Heading 2'
                    >
                      <LuHeading2 />
                    </button>
                    <button
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: 3 })
                          .run();
                        setShowHeadingPicker(false);
                      }}
                      className={`p-2 rounded ${
                        editor.isActive('heading', { level: 3 })
                          ? 'bg-amber-200 text-black'
                          : 'hover:bg-gray-600 hover:text-white'
                      } cursor-pointer`}
                      aria-label='Heading 3'
                    >
                      <LuHeading3 />
                    </button>
                    <button
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: 4 })
                          .run();
                        setShowHeadingPicker(false);
                      }}
                      className={`p-2 rounded ${
                        editor.isActive('heading', { level: 4 })
                          ? 'bg-amber-200 text-black'
                          : 'hover:bg-gray-600 hover:text-white'
                      } cursor-pointer`}
                      aria-label='Heading 4'
                    >
                      <LuHeading4 />
                    </button>
                    <button
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: 5 })
                          .run();
                        setShowHeadingPicker(false);
                      }}
                      className={`p-2 rounded ${
                        editor.isActive('heading', { level: 5 })
                          ? 'bg-amber-200 text-black'
                          : 'hover:bg-gray-600 hover:text-white'
                      } cursor-pointer`}
                      aria-label='Heading 5'
                    >
                      <LuHeading5 />
                    </button>
                    <button
                      onClick={() => {
                        editor
                          .chain()
                          .focus()
                          .toggleHeading({ level: 6 })
                          .run();
                        setShowHeadingPicker(false);
                      }}
                      className={`p-2 rounded ${
                        editor.isActive('heading', { level: 6 })
                          ? 'bg-amber-200 text-black'
                          : 'hover:bg-gray-600 hover:text-white'
                      } cursor-pointer`}
                      aria-label='Heading 6'
                    >
                      <LuHeading6 />
                    </button>
                  </div>
                </div>
              </div>,
              document.body
            )}
        </div>

        <button
          onClick={() => editor.chain().focus().setParagraph().run()}
          className={`p-2 rounded ${
            editor.isActive('paragraph')
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Paragraph'
        >
          <TfiParagraph />
        </button>

        <button
          onClick={() => editor.chain().focus().clearNodes().run()}
          className={`${
            isMenuBarMinimized
              ? 'hidden'
              : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
          }`}
          aria-label='Clear nodes'
        >
          <TbClearFormatting />
        </button>
      </div>

      {/* Bold, Italic, Strikethrough, Clear Formatting */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive('bold')
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Bold'
        >
          <ImBold />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive('italic')
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Italic'
        >
          <ImItalic />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={`${
            isMenuBarMinimized
              ? 'hidden'
              : `p-2 rounded ${
                  editor.isActive('strike')
                    ? 'bg-amber-200 text-black'
                    : 'hover:bg-gray-700 hover:text-white'
                } cursor-pointer`
          }`}
          aria-label='Strikethrough'
        >
          <ImStrikethrough />
        </button>

        <button
          onClick={() => editor.chain().focus().unsetAllMarks().run()}
          className={`${
            isMenuBarMinimized
              ? 'hidden'
              : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
          }`}
          aria-label='Clear formatting'
        >
          <ImClearFormatting />
        </button>
      </div>

      {/* Text Align */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: 'left' })
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Align left'
        >
          <LuAlignLeft />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: 'center' })
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Align center'
        >
          <LuAlignCenter />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: 'right' })
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Align right'
        >
          <LuAlignRight />
        </button>

        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={`p-2 rounded ${
            editor.isActive({ textAlign: 'justify' })
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Justify'
        >
          <LuAlignJustify />
        </button>

        <button
          onClick={() => editor.chain().focus().unsetTextAlign().run()}
          className={`${
            isMenuBarMinimized
              ? 'hidden'
              : `p-2 rounded ${
                  editor.isActive({ textAlign: 'left' })
                    ? 'hover:bg-gray-700 hover:text-white'
                    : editor.isActive({ textAlign: 'center' })
                    ? 'hover:bg-gray-700 hover:text-white'
                    : editor.isActive({ textAlign: 'right' })
                    ? 'hover:bg-gray-700 hover:text-white'
                    : editor.isActive({ textAlign: 'justify' })
                    ? 'hover:bg-gray-700 hover:text-white'
                    : 'bg-amber-200 text-black'
                } cursor-pointer`
          }`}
          aria-label='Unset text align'
        >
          <TbNotesOff />
        </button>
      </div>

      {/* Lists */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive('bulletList')
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Bullet list'
        >
          <LuList />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive('orderedList')
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Ordered list'
        >
          <LuListOrdered />
        </button>
      </div>

      {/* Code and Blockquote */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
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
        >
          <IoCode />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={`p-2 rounded ${
            editor.isActive('codeBlock')
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Code block'
        >
          <BiCodeBlock />
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={`p-2 rounded ${
            editor.isActive('blockquote')
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Blockquote'
        >
          <IoMdQuote />
        </button>
      </div>

      {/* Horizontal Rule and Hard Break */}
      <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
          className={`${
            isMenuBarMinimized
              ? 'hidden'
              : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
          }`}
          aria-label='Horizontal rule'
        >
          <LuSeparatorHorizontal />
        </button>

        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          className={`${
            isMenuBarMinimized
              ? 'hidden'
              : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
          }`}
          aria-label='Hard break'
        >
          <BsFileBreak />
        </button>
      </div>

      <button
        onClick={setLink}
        className={`p-2 rounded ${
          editor.isActive('link')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Add link'
      >
        <IoLinkSharp />
      </button>
      <button
        onClick={setImage}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Add image'
      >
        <IoImageSharp />
      </button>

      {/* Text Color Picker Icon button */}
      <div
        className={`${
          isMenuBarMinimized ? 'hidden' : 'flex flex-col items-center mt-4'
        }`}
      >
        <label htmlFor='text-color-picker'>
          <IoColorPaletteSharp />
        </label>
        <input
          id='text-color-picker'
          type='color'
          onChange={setColor}
          className={`${
            isMenuBarMinimized ? 'hidden' : 'w-8 h-4 cursor-pointer'
          }`}
          aria-label='Choose text color'
        />
      </div>

      {/* Emoji Picker */}
      <div className={`${isMenuBarMinimized ? 'hidden' : 'relative'}`}>
        <button
          onClick={handleEmojiButtonClick}
          className={`p-2 rounded is-dropdown ${
            showEmojiPicker
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Add emoji'
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
                  top: `calc(${pickerPosition.top}px + 12px)`,
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
      <button
        onClick={toggleFullScreen}
        className='p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Full screen'
      >
        <LuMaximize />
      </button>

      {/* Minimize Menu Bar */}
      <button
        onClick={() => setIsMenuBarMinimized(!isMenuBarMinimized)}
        className='block md:hidden p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        aria-label='Full screen'
      >
        <LiaWindowMinimize />
      </button>
    </div>
  );
}
