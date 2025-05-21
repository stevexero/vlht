'use client';

import { FC } from 'react';
import Image from 'next/image';

interface StoryCardMobileProps {
  image: string;
  heading: string;
  story: string;
  r: string;
  g: string;
  b: string;
  textColor: string;
}

const StoryCardMobile: FC<StoryCardMobileProps> = ({
  image,
  heading,
  story,
  r,
  g,
  b,
  textColor,
}) => {
  return (
    <div className='w-full relative aspect-square'>
      <Image src={image} alt={heading} fill className='object-cover' />
      <div
        className={`absolute inset-0 p-8 flex flex-col items-center justify-evenly ${textColor}`}
        style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, 0.8)` }}
      >
        <h1 className='font-cinzel text-[48px] text-center'>{heading}</h1>
        <p className='font-montserrat text-sm text-center'>{story}</p>
      </div>
    </div>
  );
};

export default StoryCardMobile;
