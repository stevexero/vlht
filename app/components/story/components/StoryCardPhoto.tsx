'use client';

import { FC } from 'react';
import Image from 'next/image';

interface StoryCardPhotoProps {
  image: string;
}

const StoryCardPhoto: FC<StoryCardPhotoProps> = ({ image }) => {
  return (
    <div className='w-full md:w-1/2 flex items-center justify-center aspect-square relative'>
      <Image src={image} alt='Story image' fill className='object-cover' />
    </div>
  );
};

export default StoryCardPhoto;
