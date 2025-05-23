'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Blockquote from '@tiptap/extension-blockquote';
import CodeBlock from '@tiptap/extension-code-block';
import BulletList from '@tiptap/extension-bullet-list';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import HardBreak from '@tiptap/extension-hard-break';
import Placeholder from '@tiptap/extension-placeholder';
import Dropcursor from '@tiptap/extension-dropcursor';
import Gapcursor from '@tiptap/extension-gapcursor';
import { MenuBar } from './MenuBar';

export default function BlogEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false }),
      Image,
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Blockquote,
      CodeBlock,
      BulletList,
      OrderedList,
      ListItem,
      HardBreak,
      Placeholder.configure({ placeholder: 'Start writing…' }),
      Dropcursor,
      Gapcursor,
    ],
    content: `
      <h2>Hi there,</h2>
      <p>
        this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there
        are all kind of basic text styles you’d probably expect from a text
        editor. But wait until you see the lists:
      </p>
      <ul>
        <li>That’s a bullet list with one …</li>
        <li>… or two list items.</li>
      </ul>
      <p>
        Isn’t that great? And all of that is editable. But wait, there’s more.
        Let’s try a code block:
      </p>
      <pre>
        <code>body {
                display: none;
            }</code>
      </pre>
      <p>
        I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
        </p>
        <blockquote>
        Wow, that’s amazing. Good work, boy! 👏
        <br />
        — Mom
        </blockquote>
    `,
  });

  return (
    <div className='w-full mt-4 border-2 border-gray-300 p-4'>
      <MenuBar editor={editor} />
      <EditorContent editor={editor} className='' />
    </div>
  );
}
