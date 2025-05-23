'use client';

// components/MenuBar.tsx
import React from 'react';
import { Editor } from '@tiptap/react';
import {
  IoArrowRedo,
  IoArrowUndoSharp,
  IoCode,
  IoImageSharp,
  IoLinkSharp,
} from 'react-icons/io5';
import { ImBold, ImItalic, ImStrikethrough } from 'react-icons/im';
import {
  LuAlignCenter,
  LuAlignJustify,
  LuAlignLeft,
  LuAlignRight,
} from 'react-icons/lu';

type MenuBarProps = { editor: Editor | null };

export const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
  if (!editor) return null;

  return (
    <div
      role='toolbar'
      aria-label='Formatting toolbar'
      className='flex flex-row bg-red-200'
    >
      {/* <div style={{ flex: 1 }} /> */}

      {/* Undo / Redo */}
      <div role='group' className='tiptap-toolbar-group'>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
          aria-label='Undo'
          className='tiptap-button'
        >
          <IoArrowUndoSharp />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
          aria-label='Redo'
          className='tiptap-button'
        >
          <IoArrowRedo />
        </button>
      </div>

      <div className='tiptap-separator' />

      {/* Headings dropdown */}
      <div role='group' className='tiptap-toolbar-group'>
        <button
          aria-haspopup='menu'
          aria-expanded='false'
          aria-label='Format text as heading'
          className='tiptap-button'
          onClick={() => {
            /* you can wire up a `<Menu>` component here if you want a dropdown */
          }}
        >
          <svg
            width='24'
            height='24'
            className='tiptap-button-icon'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6V18C3 18.5523 3.44772 19 4 19C4.55228 19 5 18.5523 5 18V13H11V18C11 18.5523 11.4477 19 12 19C12.5523 19 13 18.5523 13 18V6C13 5.44772 12.5523 5 12 5C11.4477 5 11 5.44772 11 6V11H5V6Z' />
            <path d='M21.0001 10C21.0001 9.63121 20.7971 9.29235 20.472 9.11833C20.1468 8.94431 19.7523 8.96338 19.4454 9.16795L16.4454 11.168C15.9859 11.4743 15.8617 12.0952 16.1681 12.5547C16.4744 13.0142 17.0953 13.1384 17.5548 12.8321L19.0001 11.8685V18C19.0001 18.5523 19.4478 19 20.0001 19C20.5524 19 21.0001 18.5523 21.0001 18V10Z' />
          </svg>
        </button>

        {/* Lists menu (same pattern) */}
        <button
          aria-haspopup='menu'
          aria-expanded='false'
          aria-label='List options'
          className='tiptap-button'
        >
          <svg
            width='24'
            height='24'
            className='tiptap-button-icon'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7 6C7 5.44772 7.44772 5 8 5H21C21.5523 5 22 5.44772 22 6C22 6.55228 21.5523 7 21 7H8C7.44772 7 7 6.55228 7 6Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7 12C7 11.4477 7.44772 11 8 11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H8C7.44772 13 7 12.5523 7 12Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M7 18C7 17.4477 7.44772 17 8 17H21C21.5523 17 22 17.4477 22 18C22 18.5523 21.5523 19 21 19H8C7.44772 19 7 18.5523 7 18Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2 6C2 5.44772 2.44772 5 3 5H3.01C3.56228 5 4.01 5.44772 4.01 6C4.01 6.55228 3.56228 7 3.01 7H3C2.44772 7 2 6.55228 2 6Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2 12C2 11.4477 2.44772 11 3 11H3.01C3.56228 11 4.01 11.4477 4.01 12C4.01 12.5523 3.56228 13 3.01 13H3C2.44772 13 2 12.5523 2 12Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M2 18C2 17.4477 2.44772 17 3 17H3.01C3.56228 17 4.01 17.4477 4.01 18C4.01 18.5523 3.56228 19 3.01 19H3C2.44772 19 2 18.5523 2 18Z'
            />
          </svg>
        </button>

        {/* Blockquote */}
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label='Blockquote'
          className={`tiptap-button ${
            editor.isActive('blockquote') ? 'is-active' : ''
          }`}
        >
          <svg
            width='24'
            height='24'
            className='tiptap-button-icon'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 6C8 5.44772 8.44772 5 9 5H16C16.5523 5 17 5.44772 17 6C17 6.55228 16.5523 7 16 7H9C8.44772 7 8 6.55228 8 6Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M4 3C4.55228 3 5 3.44772 5 4L5 20C5 20.5523 4.55229 21 4 21C3.44772 21 3 20.5523 3 20L3 4C3 3.44772 3.44772 3 4 3Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 12C8 11.4477 8.44772 11 9 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H9C8.44772 13 8 12.5523 8 12Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M8 18C8 17.4477 8.44772 17 9 17H16C16.5523 17 17 17.4477 17 18C17 18.5523 16.5523 19 16 19H9C8.44772 19 8 18.5523 8 18Z'
            />
          </svg>
        </button>

        {/* Code block */}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label='Code block'
          className={`tiptap-button ${
            editor.isActive('codeBlock') ? 'is-active' : ''
          }`}
        >
          <svg
            width='24'
            height='24'
            className='tiptap-button-icon'
            viewBox='0 0 24 24'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M6.70711 2.29289C7.09763 2.68342 7.09763 3.31658 6.70711 3.70711L4.41421 6L6.70711 8.29289C7.09763 8.68342 7.09763 9.31658 6.70711 9.70711C6.31658 10.0976 5.68342 10.0976 5.29289 9.70711L2.29289 6.70711C1.90237 6.31658 1.90237 5.68342 2.29289 5.29289L5.29289 2.29289C5.68342 1.90237 6.31658 1.90237 6.70711 2.29289Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M10.2929 2.29289C10.6834 1.90237 11.3166 1.90237 11.7071 2.29289L14.7071 5.29289C15.0976 5.68342 15.0976 6.31658 14.7071 6.70711L11.7071 9.70711C11.3166 10.0976 10.6834 10.0976 10.2929 9.70711C9.90237 9.31658 9.90237 8.68342 10.2929 8.29289L12.5858 6L10.2929 3.70711C9.90237 3.31658 9.90237 2.68342 10.2929 2.29289Z'
            />
            <path
              fillRule='evenodd'
              clipRule='evenodd'
              d='M17 4C17 3.44772 17.4477 3 18 3H19C20.6569 3 22 4.34315 22 6V18C22 19.6569 20.6569 21 19 21H5C3.34315 21 2 19.6569 2 18V12C2 11.4477 2.44772 11 3 11C3.55228 11 4 11.4477 4 12V18C4 18.5523 4.44772 19 5 19H19C19.5523 19 20 18.5523 20 18V6C20 5.44772 19.5523 5 19 5H18C17.4477 5 17 4.55228 17 4Z'
            />
          </svg>
        </button>
      </div>

      <div className='tiptap-separator' />

      {/* Inline formatting */}
      <div role='group' className='tiptap-toolbar-group'>
        <button
          aria-label='Bold'
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <ImBold />
        </button>
        <button
          aria-label='Italic'
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <ImItalic />
        </button>
        <button
          aria-label='Strikethrough'
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <ImStrikethrough />
        </button>
        <button
          aria-label='Code'
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}
        >
          <IoCode />
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter link URL');
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
          aria-label='Link'
          className={`tiptap-button ${
            editor.isActive('link') ? 'is-active' : ''
          }`}
        >
          <IoLinkSharp />
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter image URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          aria-label='Add image'
          className='tiptap-button'
        >
          <IoImageSharp />
        </button>
      </div>

      <div className='tiptap-separator' />

      {/* Alignment */}
      <div role='group' className='tiptap-toolbar-group'>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          aria-label='Align left'
          className={`tiptap-button ${
            editor.isActive('textAlign', { align: 'left' }) ? 'is-active' : ''
          }`}
        >
          <LuAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          aria-label='Align center'
          className={`tiptap-button ${
            editor.isActive('textAlign', { align: 'center' }) ? 'is-active' : ''
          }`}
        >
          <LuAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          aria-label='Align right'
          className={`tiptap-button ${
            editor.isActive('textAlign', { align: 'right' }) ? 'is-active' : ''
          }`}
        >
          <LuAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          aria-label='Justify'
          className={`tiptap-button ${
            editor.isActive('textAlign', { align: 'justify' })
              ? 'is-active'
              : ''
          }`}
        >
          <LuAlignJustify />
        </button>
      </div>

      <div style={{ flex: 1 }} />
    </div>
  );
};

// import React from 'react';
// import { Editor } from '@tiptap/react';
// import {
//   FaBold,
//   FaItalic,
//   FaStrikethrough,
//   FaCode,
//   FaUndo,
//   FaRedo,
//   FaLink,
//   FaImage,
// } from 'react-icons/fa';

// type MenuBarProps = { editor: Editor | null };

// export const MenuBar: React.FC<MenuBarProps> = ({ editor }) => {
//   if (!editor) return null;

//   const isActive = (format: string, options = {}) =>
//     editor.isActive(format, options);

//   const run = (command: () => any) =>
//     editor.chain().focus()[command.name]?.().run();

//   return (
//     <div className='flex flex-wrap gap-1 mb-2'>
//       <button
//         onClick={() => editor.chain().focus().toggleBold().run()}
//         className={isActive('bold') ? 'font-bold' : ''}
//       >
//         <FaBold />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleItalic().run()}
//         className={isActive('italic') ? 'italic' : ''}
//       >
//         <FaItalic />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleStrike().run()}
//         className={isActive('strike') ? 'line-through' : ''}
//       >
//         <FaStrikethrough />
//       </button>

//       <button
//         onClick={() => editor.chain().focus().toggleCode().run()}
//         className={isActive('code') ? 'bg-gray-200' : ''}
//       >
//         <FaCode />
//       </button>

//       <button onClick={() => editor.chain().focus().undo().run()}>
//         <FaUndo />
//       </button>

//       <button onClick={() => editor.chain().focus().redo().run()}>
//         <FaRedo />
//       </button>

//       {/* Heading dropdown */}
//       <select
//         onChange={(e) => {
//           const level = Number(e.target.value);
//           editor.chain().focus().toggleHeading({ level }).run();
//         }}
//         value={isActive('heading') ? editor.getAttributes('heading').level : ''}
//       >
//         <option value=''>Normal</option>
//         {[1, 2, 3, 4, 5, 6].map((l) => (
//           <option key={l} value={l}>
//             H{l}
//           </option>
//         ))}
//       </select>

//       {/* Link */}
//       <button
//         onClick={() => {
//           const url = window.prompt('Enter URL');
//           if (url) editor.chain().focus().setLink({ href: url }).run();
//         }}
//         className={isActive('link') ? 'underline' : ''}
//       >
//         <FaLink />
//       </button>

//       {/* Image */}
//       <button
//         onClick={() => {
//           const url = window.prompt('Enter an image URL');
//           if (url) editor.chain().focus().setImage({ src: url }).run();
//         }}
//       >
//         <FaImage />
//       </button>
//     </div>
//   );
// };
