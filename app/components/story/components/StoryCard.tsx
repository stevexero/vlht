'use client';

import { FC } from 'react';

interface StoryCardProps {
  heading: string;
  story: string;
}

const StoryCard: FC<StoryCardProps> = ({ heading, story }) => {
  return (
    <div className='w-full md:w-1/2 bg-white flex items-center justify-center aspect-square relative'>
      <div className='p-8 md:p-32 text-center flex flex-col items-center justify-evenly'>
        <h1 className='font-cinzel text-[56px] text-gray-600'>{heading}</h1>
        <p className='font-montserrat text-sm text-gray-600 mt-8'>{story}</p>
      </div>
    </div>
  );
};

export default StoryCard;
