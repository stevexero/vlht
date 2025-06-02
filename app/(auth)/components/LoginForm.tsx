'use client';

import { useActionState } from 'react';
// import Link from 'next/link';
import { loginAction, LoginState } from '@/app/lib/actions/actions';
import InputField from '@/app/ui/text/InputField';
import Button from '@/app/ui/buttons/Button';
import ErrorMessage from '@/app/ui/messages/ErrorMessage';

export default function LoginForm() {
  const initialState: LoginState = { message: '' };
  const [state, formAction, isPending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <div className='max-w-2xl flex flex-col gap-4 mx-auto mt-20 p-4 xl:p-12'>
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
        <Button
          label={isPending ? 'Logging in...' : 'Login'}
          type='submit'
          ariaLabel={isPending ? 'Logging in...' : 'Login'}
          disabled={isPending}
          className='mt-6'
        />
        {/* <div className='inline-block text-right'>
          <Link
            className='text-sm text-gray-400 underline hover:text-gray-300 transition-all duration-300 focus:outline-none focus:text-gray-300'
            href='/signup'
            aria-label='Go to signup page'
          >
            Don&apos;t have an account?
          </Link>
        </div> */}
      </form>
    </div>
  );
}
