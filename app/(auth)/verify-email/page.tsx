import React from 'react';
import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import ResendForm from '@/app/(auth)/components/ResendForm';

export default async function VerifyEmail() {
  const cookieStore = await cookies();
  const email = cookieStore.get('vlht_signup_email')?.value;

  if (!email) {
    redirect('/signup');
  }

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session?.user?.email_confirmed_at) {
    redirect('/dashboard');
  }

  return (
    <div className='w-screen min-h-screen flex justify-center bg-white'>
      <div className='w-full max-w-lg mt-4 sm:mt-28 p-10'>
        <div className='text-center flex flex-col items-center'>
          <h2 className='mt-6 text-4xl font-bold text-gray-900 font-rubik-dirt'>
            Verify Your Email
          </h2>
          <p className='mt-2 text-sm text-gray-800'>
            We&apos;ve sent a verification link to {email}
          </p>
        </div>
        <div className='mt-8 space-y-6'>
          <p className='text-sm text-gray-800 text-center'>
            Please check your email and click the verification link to continue.
            If you don&apos;t see the email, check your spam folder.
          </p>
          {email && <ResendForm email={email} />}
        </div>
      </div>
    </div>
  );
}
