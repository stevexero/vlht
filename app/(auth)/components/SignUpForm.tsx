'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { signUpAction, SignUpState } from '@/app/lib/actions/userActions';
import InputField from '@/app/ui/text/InputField';
import Button from '@/app/ui/buttons/Button';
import ErrorMessage from '@/app/ui/messages/ErrorMessage';

export default function SignUpForm() {
  const initialState: SignUpState = { message: '' };
  const [state, formAction, isPending] = useActionState(
    signUpAction,
    initialState
  );

  return (
    <div className='w-2xl flex flex-col gap-4 mx-auto mt-20 p-4 xl:p-12'>
      {state.message && (
        <div className='mt-11 -mb-20'>
          <ErrorMessage message={state.message} />
        </div>
      )}
      <form
        className='w-full flex flex-col gap-4 mx-auto mt-20 p-4 xl:p-12'
        action={formAction}
        aria-label='Sign up form'
      >
        <InputField
          label='Email'
          name='email'
          id='email'
          type='email'
          required
          light={false}
        />
        <InputField
          label='Password'
          name='password'
          id='password'
          type='password'
          required
          light={false}
        />
        <InputField
          label='Verify Password'
          name='verifyPassword'
          id='verifyPassword'
          type='password'
          required
          light={false}
        />
        <Button
          label={isPending ? 'Creating account...' : 'Create Account'}
          type='submit'
          ariaLabel={isPending ? 'Creating account...' : 'Create account'}
          disabled={isPending}
          className='mt-6'
        />
        <div className='inline-block text-right'>
          <Link
            className='text-sm text-gray-400 underline hover:text-gray-300 transition-all duration-300 focus:outline-none focus:text-gray-300'
            href='/login'
            aria-label='Go to login page'
          >
            Already have an account?
          </Link>
        </div>
      </form>
    </div>
  );
}
