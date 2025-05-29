'use client';

import { useState, useEffect, useCallback } from 'react';
import { Editor } from '@tiptap/react';

interface TodosProps {
  editor: Editor | null;
}

export default function Todos({ editor }: TodosProps) {
  const [hasH1, setHasH1] = useState(false);
  const [hasImg, setHasImg] = useState(false);
  const [hasParagraph, setHasParagraph] = useState(false);

  const scanDocument = useCallback(() => {
    if (!editor) return;

    let foundH1 = false;
    let foundImg = false;
    let foundParagraph = false;

    editor.state.doc.descendants((node) => {
      if (
        node.type.name === 'heading' &&
        node.attrs.level === 1 &&
        node.textContent.trim()
      ) {
        foundH1 = true;
      }
      if (node.type.name === 'image') {
        foundImg = true;
      }
      if (node.type.name === 'paragraph' && node.textContent.trim()) {
        foundParagraph = true;
      }
    });

    setHasH1(foundH1);
    setHasImg(foundImg);
    setHasParagraph(foundParagraph);
  }, [editor]);

  useEffect(() => {
    if (!editor) return;

    scanDocument();

    const handleTransaction = () => {
      scanDocument();
    };

    editor.on('transaction', handleTransaction);

    return () => {
      editor.off('transaction', handleTransaction);
    };
  }, [editor, scanDocument]);

  return (
    <div className='flex flex-wrap items-center justify-center gap-2 p-2'>
      {!hasH1 && (
        <div
          className='bg-red-300/50 rounded-3xl text-red-600 border border-red-600 py-1 px-3 text-xs font-bold'
          aria-label='Todo: Add a title'
        >
          Add Title
        </div>
      )}
      {!hasImg && (
        <div
          className='bg-red-300/50 rounded-3xl text-red-600 border border-red-600 py-1 px-3 text-xs font-bold'
          aria-label='Todo: Add an image'
        >
          Add Image
        </div>
      )}
      {!hasParagraph && (
        <div
          className='bg-red-300/50 rounded-3xl text-red-600 border border-red-600 py-1 px-3 text-xs font-bold'
          aria-label='Todo: Add a paragraph'
        >
          Add a Paragraph
        </div>
      )}
    </div>
  );
}
