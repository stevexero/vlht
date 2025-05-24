'use client';

import { Color } from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import TextStyle from '@tiptap/extension-text-style';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import '../styles.css';
import ZMenuBar from './ZMenuBar';
import { usePostsStore } from '../postsStore';

const extensions = [
  Color.configure({ types: [TextStyle.name, ListItem.name] }),
  TextStyle.configure(),
  StarterKit.configure({
    bulletList: {
      keepMarks: true,
      keepAttributes: false,
    },
    orderedList: {
      keepMarks: true,
      keepAttributes: false,
    },
  }),
  Link.configure({
    openOnClick: false,
    autolink: true,
  }),
  Image.configure({
    inline: true,
  }),
  TextAlign.configure({
    types: ['heading', 'paragraph'],
    alignments: ['left', 'right', 'center', 'justify'],
  }),
];

const content = `
<h1 style="text-align: left;">
  (h1) Welcome to the content editor!,
</h1>
<h2 style="text-align: right;">
  (h2) This is a h2 heading,
</h2>
<h3 style="text-align: left;">
  (h3) This is a h3 heading,
</h3>
<h4 style="text-align: left;">
  (h4) This is a h4 heading,
</h4>
<h5 style="text-align: left;">
  (h5) This is a h5 heading,
</h5>
<h6 style="text-align: left;">
  (h6) This is a h6 heading,
</h6>
<p style="text-align: left;">
  This is a paragraph.
</p>
<p style="text-align: left;">
  This is <strong>bold and strong</strong>.
</p>
<p style="text-align: left;">
  This is <em>italic and em</em>.
</p>    
<p style="text-align: left;">
  This is <strong><em>bold and italic</em></strong>.
</p>
<ul style="text-align: left;">
  <li>
    This is a bullet list item.
  </li>
  <li>
    This is another bullet list item.
  </li>
</ul>
<ol style="text-align: left;">
  <li>
    This is a numbered list item.
  </li>
  <li>
    This is another numbered list item.
  </li>
</ol>
<a href="https://google.com" target="_blank">This is a link</a>
<p style="text-align: left;">
<pre><code class="language-css">// This is a code block
body {
  display: none;
}</code></pre>
<p style="text-align: left;">
  Give it a <strong>try</strong> and <em>click around</em> a little bit.
</p>
<blockquote style="text-align: left;">
  Wow, that's amazing! 👏
  <br />
  — RSDNT ONE
</blockquote>
`;

export const PostEditor = () => {
  const { isFullScreen } = usePostsStore();

  const editor = useEditor({
    extensions: extensions,
    content: content,
  });
  return (
    <div
      className={`${
        isFullScreen
          ? 'absolute top-0 left-0 z-10 w-screen h-screen'
          : 'w-full ml-2 md:ml-72 mt-24 md:mt-16'
      } transition-all duration-300`}
    >
      <div
        className={`${
          isFullScreen
            ? ''
            : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mr-2 md:mr-8'
        } transition-all duration-300`}
      >
        <div
          className={`col-span-3 bg-white rounded-lg ${
            isFullScreen ? 'h-[100vh]' : 'max-h-[500px] md:max-h-[700px]'
          }  flex flex-col transition-all duration-300`}
        >
          <div className='sticky top-0 border-gray-300'>
            <ZMenuBar editor={editor} />
          </div>
          <div className='flex-1 overflow-y-auto p-4'>
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
