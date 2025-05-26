'use client';

import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Tooltip } from 'react-tooltip';
import { Editor } from '@tiptap/react';
import {
  LuHeading1,
  LuHeading2,
  LuHeading3,
  LuHeading4,
  LuHeading5,
  LuHeading6,
} from 'react-icons/lu';
import { TbClearFormatting } from 'react-icons/tb';
import { TfiParagraph } from 'react-icons/tfi';
import { usePostsStore } from '@/app/store/store';

type MenuBarProps = { editor: Editor | null };

export default function HeadingsParagraph({ editor }: MenuBarProps) {
  const { isMenuBarMinimized } = usePostsStore();

  const [headingPickerPosition, setHeadingPickerPosition] = useState({
    top: 0,
    right: 0,
  });
  const [showHeadingPicker, setShowHeadingPicker] = useState(false);

  if (!editor) {
    return null;
  }

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

  const handleHeadingButtonClick = (event: React.MouseEvent) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    setHeadingPickerPosition({
      top: rect.bottom + window.scrollY,
      right: rect.left + window.scrollX,
    });
    setShowHeadingPicker(!showHeadingPicker);
  };
  return (
    <div className={`flex items-center gap-2 border-r border-gray-500 pr-2`}>
      {/* Headings Dropdown */}
      <div className='relative'>
        <Tooltip id='headings' />
        <button
          onClick={handleHeadingButtonClick}
          className={`p-2 rounded is-dropdown ${
            isHeadingActive
              ? 'bg-amber-200 text-black'
              : 'hover:bg-gray-700 hover:text-white'
          } cursor-pointer`}
          aria-label='Show headings'
          data-tooltip-id='headings'
          data-tooltip-content='Headings (Click to see all)'
          data-tooltip-place='bottom'
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
                  top: `calc(${headingPickerPosition.top}px - 8px)`,
                  left: `calc(${headingPickerPosition.right}px - 4px)`,
                  zIndex: 41,
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className='bg-gradient-to-b from-gray-500 to-gray-700 border border-gray-400 shadow-xl shadow-black/50 rounded-b-lg mt-4 text-sm text-gray-100 py-2 px-1'>
                  <Tooltip id='heading-1' />
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 1 }).run();
                      setShowHeadingPicker(false);
                    }}
                    className={`p-2 rounded ${
                      editor.isActive('heading', { level: 1 })
                        ? 'bg-amber-200 text-black'
                        : 'hover:bg-gray-600 hover:text-white'
                    } cursor-pointer`}
                    aria-label='Heading 1'
                    data-tooltip-id='heading-1'
                    data-tooltip-content='Heading 1'
                    data-tooltip-place='bottom'
                  >
                    <LuHeading1 />
                  </button>
                  <Tooltip id='heading-2' />
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 2 }).run();
                      setShowHeadingPicker(false);
                    }}
                    className={`p-2 rounded ${
                      editor.isActive('heading', { level: 2 })
                        ? 'bg-amber-200 text-black'
                        : 'hover:bg-gray-600 hover:text-white'
                    } cursor-pointer`}
                    aria-label='Heading 2'
                    data-tooltip-id='heading-2'
                    data-tooltip-content='Heading 2'
                    data-tooltip-place='bottom'
                  >
                    <LuHeading2 />
                  </button>
                  <Tooltip id='heading-3' />
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 3 }).run();
                      setShowHeadingPicker(false);
                    }}
                    className={`p-2 rounded ${
                      editor.isActive('heading', { level: 3 })
                        ? 'bg-amber-200 text-black'
                        : 'hover:bg-gray-600 hover:text-white'
                    } cursor-pointer`}
                    aria-label='Heading 3'
                    data-tooltip-id='heading-3'
                    data-tooltip-content='Heading 3'
                    data-tooltip-place='bottom'
                  >
                    <LuHeading3 />
                  </button>
                  <Tooltip id='heading-4' />
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 4 }).run();
                      setShowHeadingPicker(false);
                    }}
                    className={`p-2 rounded ${
                      editor.isActive('heading', { level: 4 })
                        ? 'bg-amber-200 text-black'
                        : 'hover:bg-gray-600 hover:text-white'
                    } cursor-pointer`}
                    aria-label='Heading 4'
                    data-tooltip-id='heading-4'
                    data-tooltip-content='Heading 4'
                    data-tooltip-place='bottom'
                  >
                    <LuHeading4 />
                  </button>
                  <Tooltip id='heading-5' />
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 5 }).run();
                      setShowHeadingPicker(false);
                    }}
                    className={`p-2 rounded ${
                      editor.isActive('heading', { level: 5 })
                        ? 'bg-amber-200 text-black'
                        : 'hover:bg-gray-600 hover:text-white'
                    } cursor-pointer`}
                    aria-label='Heading 5'
                    data-tooltip-id='heading-5'
                    data-tooltip-content='Heading 5'
                    data-tooltip-place='bottom'
                  >
                    <LuHeading5 />
                  </button>
                  <Tooltip id='heading-6' />
                  <button
                    onClick={() => {
                      editor.chain().focus().toggleHeading({ level: 6 }).run();
                      setShowHeadingPicker(false);
                    }}
                    className={`p-2 rounded ${
                      editor.isActive('heading', { level: 6 })
                        ? 'bg-amber-200 text-black'
                        : 'hover:bg-gray-600 hover:text-white'
                    } cursor-pointer`}
                    aria-label='Heading 6'
                    data-tooltip-id='heading-6'
                    data-tooltip-content='Heading 6'
                    data-tooltip-place='bottom'
                  >
                    <LuHeading6 />
                  </button>
                </div>
              </div>
            </div>,
            document.body
          )}
      </div>

      <Tooltip id='paragraph' />
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={`p-2 rounded ${
          editor.isActive('paragraph')
            ? 'bg-amber-200 text-black'
            : 'hover:bg-gray-700 hover:text-white'
        } cursor-pointer`}
        aria-label='Paragraph'
        data-tooltip-id='paragraph'
        data-tooltip-content='Paragraph'
        data-tooltip-place='bottom'
      >
        <TfiParagraph />
      </button>

      <Tooltip id='clear-nodes' />
      <button
        onClick={() => editor.chain().focus().clearNodes().run()}
        className={`${
          isMenuBarMinimized
            ? 'hidden'
            : 'p-2 rounded hover:bg-gray-700 cursor-pointer hover:text-white'
        }`}
        aria-label='Clear nodes'
        data-tooltip-id='clear-nodes'
        data-tooltip-content='Clear Nodes (Revert formatting to default)'
        data-tooltip-place='bottom'
      >
        <TbClearFormatting />
      </button>
    </div>
  );
}
