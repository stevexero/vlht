'use client';

import { useState } from 'react';
import Button from '@/app/ui/buttons/Button';
import { resendVerificationEmailAction } from '@/app/lib/actions/actions';

export default function ResendForm({ email }: { email: string }) {
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    const result = await resendVerificationEmailAction(email);
    if (result.error) {
      setError(result.error);
    } else {
      setMessage(result.message || '');
    }
  };

  return (
    <form action={handleSubmit}>
      <Button
        label='Resend Verification Email'
        className='w-full'
        buttonType='secondary'
        type='submit'
      />
      {error && <p className='text-red-500 text-center mt-4'>{error}</p>}
      {message && <p className='text-green-500 text-center mt-4'>{message}</p>}
    </form>
  );
}
