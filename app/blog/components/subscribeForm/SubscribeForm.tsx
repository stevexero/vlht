'use client';

import { subscribeToMailchimp } from '@/app/lib/actions/subscribeActions';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function SubscribeForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await subscribeToMailchimp(formData);

    if (result.success) {
      toast.success(result.message);
      (e.target as HTMLFormElement).reset(); // Clear form
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <form className='flex flex-col gap-2 p-4' onSubmit={handleSubmit}>
      <label className='text-blue-950 text-sm font-semibold'>
        Stay in the loop of luxury
      </label>
      <div className='flex items-center gap-2'>
        <input
          type='email'
          name='email'
          placeholder='Enter your email'
          className='w-full p-2 rounded-md border border-blue-950 focus:outline-none'
        />
        <button
          type='submit'
          className='bg-blue-950 text-white p-2 rounded-md hover:bg-blue-900 focus:bg-blue-900 transition-colors duration-300 cursor-pointer focus:outline-none'
        >
          {isSubmitting ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
    </form>
  );
}
