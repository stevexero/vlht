'use client';

import { Editor } from '@tiptap/react';
import { User } from '@supabase/supabase-js';
import { usePostsStore } from '@/app/store/store';
import ClearText from './menuItems/ClearText';
import UndoRedo from './menuItems/UndoRedo';
import HeadingsParagraph from './menuItems/HeadingsParagraph';
import TextFormatting from './menuItems/TextFormatting';
import TextAlign from './menuItems/TextAlign';
import Lists from './menuItems/Lists';
import Preview from './menuItems/Preview';
import MinimizeToolbar from './menuItems/MinimizeToolbar';
import FullScreen from './menuItems/FullScreen';
import EmojiPickerMenu from './menuItems/EmojiPicker';
import TextColorPicker from './menuItems/TextColorPicker';
import AddImage from './menuItems/AddImage';
import AddLink from './menuItems/AddLink';
import PageFormatting from './menuItems/PageFormatting';
import BlockQuote from './menuItems/BlockQuote';
import Code from './menuItems/Code';

interface MenuBarProps {
  editor: Editor | null;
  user: User;
  params?: { id: string } | null;
}

export default function ZMenuBar({ editor, user, params }: MenuBarProps) {
  const { isFullScreen } = usePostsStore();

  if (!editor) {
    return null;
  }

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
      <Code editor={editor} />
      <BlockQuote editor={editor} />
      <PageFormatting editor={editor} />
      <AddLink editor={editor} />
      <AddImage editor={editor} />
      <TextColorPicker editor={editor} />
      <EmojiPickerMenu editor={editor} />
      <FullScreen />
      <MinimizeToolbar />
      <ClearText editor={editor} />
      <Preview editor={editor} user={user} params={params} />
    </div>
  );
}
