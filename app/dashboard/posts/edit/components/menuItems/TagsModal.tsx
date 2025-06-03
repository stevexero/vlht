'use client';

import { useState } from 'react';
import {
  addUniqueTagsAction,
  updatePostTagsAction,
} from '@/app/lib/actions/postActions';
import { usePostsStore } from '@/app/store/postsStore';
import Button from '@/app/ui/buttons/Button';
import toast from 'react-hot-toast';
import { FaTimesCircle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function TagsModal({
  postId,
  tagsList,
  params,
}: {
  postId: string;
  tagsList: string[];
  params: { id: string; viewonly: boolean; newpost: boolean };
}) {
  const { setShowTagsModal, setTempTagsList, tempTagsList } = usePostsStore();
  const router = useRouter();
  const [tag, setTag] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);

  const sanitizeTag = (tag: string) => {
    return tag
      .replace(/[^a-zA-Z0-9\s]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase();
  };

  const handleAddTag = () => {
    if (tag.trim() && !tags.includes(sanitizeTag(tag))) {
      setTags([...tags, sanitizeTag(tag)]);
      setTag('');
    } else {
      toast.error('Tag already exists');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const promises = tags.map((tag) => addUniqueTagsAction(tag));
    const results = await Promise.all(promises);

    const success = results.every((result) => result.success);
    const error = results.find((result) => !result.success)?.error;

    if (success) {
      if (params?.newpost) {
        setTempTagsList([...tempTagsList, ...tags]);
        setShowTagsModal(false);
        toast.success('Tags staged successfully');
        router.refresh();
      } else {
        const promises = tags.map((tag) => updatePostTagsAction(postId, tag));
        const results = await Promise.all(promises);

        if (results.every((result) => result.success)) {
          setShowTagsModal(false);
          toast.success('Tags added successfully');
          router.refresh();
        } else {
          toast.error(
            results.find((result) => !result.success)?.error ||
              'Failed to add tags'
          );
        }
      }
    } else {
      toast.error(error || 'Failed to add tags');
    }
  };

  return (
    <div className='bg-white p-4 rounded-lg w-full max-w-[836px]'>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <label htmlFor='tags' className='font-bold text-sm'>
          Tags
        </label>
        <div className='flex flex-row items-center gap-2 -mt-2'>
          <input
            type='text'
            id='tags'
            name='tags'
            placeholder='Enter tags'
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
          />
          <Button
            type='button'
            label='Add Tag'
            className='w-24'
            onClick={handleAddTag}
          />
        </div>
        <label htmlFor='tags-list' className='font-bold text-sm mt-2'>
          Tags List
        </label>
        <select
          id='tags-list'
          name='tags-list'
          className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 -mt-2'
          value={tag}
          onChange={(e) => setTags([...tags, e.target.value])}
        >
          <option value=''>Select a tag</option>
          {tagsList.map((tag) => (
            <option key={tag} value={tag} className='text-gray-500'>
              {tag}
            </option>
          ))}
        </select>
        <div className='flex flex-wrap gap-2'>
          {tags &&
            tags.length > 0 &&
            tags.map((tag) => (
              <div
                key={tag}
                className='bg-gray-200 p-2 rounded-md flex items-center gap-2'
              >
                {tag}
                <button onClick={() => handleRemoveTag(tag)}>
                  <FaTimesCircle className='text-red-500 cursor-pointer hover:text-red-700' />
                </button>
              </div>
            ))}
        </div>
        <div className='flex justify-end gap-2'>
          <Button type='submit' label='Save Tags' />
          <Button
            type='button'
            buttonType='secondary'
            label='Cancel'
            onClick={() => setShowTagsModal(false)}
          />
        </div>
      </form>
    </div>
  );
}
