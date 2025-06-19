'use client';

import StoryCard from './components/StoryCard';
import StoryCardPhoto from './components/StoryCardPhoto';
import StoryCardMobile from './components/StoryCardMobile';

const Story = () => {
  return (
    <div className='w-full'>
      <div className='md:hidden'>
        <div className='w-full'>
          <StoryCardMobile
            image='/images/story_img_1.jpeg'
            heading='Ride In Luxury'
            story='A luxury vehicle will whisk you away beyond the famous strip!'
            r='236'
            g='207'
            b='129'
            textColor='text-gray-600'
          />
        </div>
        <div className='w-full'>
          <StoryCardMobile
            image='/images/story_img_2.jpeg'
            heading='Snack In Style'
            story='Drinks and snacks will be served as you enjoy a magnificent ride through the surrounding areas that often go unnoticed to tourists.'
            r='96'
            g='97'
            b='103'
            textColor='text-amber-400'
          />
        </div>
        <div className='w-full'>
          <StoryCardMobile
            image='/images/story_img_3.jpeg'
            heading='Lavish Homes'
            story='Throughout the tour we will make stops at carefully selected luxury homes and allow you to walk through them to take in the amazing workmanship and creativity'
            r='236'
            g='207'
            b='129'
            textColor='text-gray-600'
          />
        </div>
        <div className='w-full'>
          <StoryCardMobile
            image='/images/story_img_4.jpeg'
            heading='Stunning Views'
            story='Your guide will provide you with interesting information about the various areas and the fabulous homes we tour.'
            r='96'
            g='97'
            b='103'
            textColor='text-amber-400'
          />
        </div>
        <div className='w-full'>
          <StoryCardMobile
            image='/images/story_img_5.jpeg'
            heading='Be a VIP'
            story="Everyone likes to feel like a VIP and that's my goal! You will leave with a greater knowledge and appreciation of the lesser known areas and architecture of Las Vegas that are worthy of sightseeing."
            r='236'
            g='207'
            b='129'
            textColor='text-gray-600'
          />
        </div>
      </div>
      <div className='hidden md:block'>
        <div className='w-full flex items-center even:flex-row-reverse'>
          <StoryCardPhoto image='/images/story_img_1.jpeg' />
          <StoryCard
            heading='Ride In Luxury'
            story='A luxury vehicle will whisk you away beyond the famous strip!'
          />
        </div>
        <div className='w-full flex items-center even:flex-row-reverse'>
          <StoryCard
            heading='Snack In Style'
            story='Drinks and snacks will be served as you enjoy a magnificent ride through the surrounding areas that often go unnoticed to tourists.'
          />
          <StoryCardPhoto image='/images/story_img_2.jpeg' />
        </div>
        <div className='w-full flex items-center even:flex-row-reverse'>
          <StoryCardPhoto image='/images/story_img_3.jpeg' />
          <StoryCard
            heading='Lavish Homes'
            story='Throughout the tour we will make stops at carefully selected luxury homes and allow you to walk through them to take in the amazing workmanship and creativity'
          />
        </div>
        <div className='w-full flex items-center even:flex-row-reverse'>
          <StoryCard
            heading='Stunning Views'
            story='Your guide will provide you with interesting information about the various areas and the fabulous homes we tour.'
          />
          <StoryCardPhoto image='/images/story_img_4.jpeg' />
        </div>
        <div className='w-full flex items-center even:flex-row-reverse'>
          <StoryCardPhoto image='/images/story_img_5.jpeg' />
          <StoryCard
            heading='Be a VIP'
            story="Everyone likes to feel like a VIP and that's my goal! You will leave with a greater knowledge and appreciation of the lesser known areas and architecture of Las Vegas that are worthy of sightseeing."
          />
        </div>
      </div>
    </div>
  );
};

export default Story;
