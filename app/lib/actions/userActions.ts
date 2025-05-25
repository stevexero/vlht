'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server';
import { cookies } from 'next/headers';

const SignUpSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be 8+ chars' }),
  verifyPassword: z.string().min(8, { message: 'Password must be 8+ chars' }),
});

const LoginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be 8+ chars' }),
});

export type SignUpState = { message?: string };
export type LoginState = { message?: string };

/**************** */
/* Sign up action */
/**************** */
export const signUpAction = async (
  _prevState: SignUpState,
  formData: FormData
) => {
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
    verifyPassword: formData.get('verifyPassword'),
  };

  const result = SignUpSchema.safeParse(payload);

  if (!result.success) {
    const message = result.error.errors[0].message;
    return { message };
  }

  if (result.data.password !== result.data.verifyPassword) {
    return { message: 'Passwords do not match' };
  }

  const { email, password } = result.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  // Store email in cookie before redirecting
  const cookieStore = await cookies();
  cookieStore.set('vlht_signup_email', email, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60, // 1 hour
  });

  redirect('/verify-email');
};

/**************** */
/* Sign in action */
/**************** */
export const loginAction = async (
  _prevState: LoginState,
  formData: FormData
) => {
  const payload = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  const result = LoginSchema.safeParse(payload);

  if (!result.success) {
    const message = result.error.errors[0].message;
    return { message };
  }

  const { email, password } = result.data;

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
};

/******************/
/* Log out action */
/******************/
export const logoutAction = async () => {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const cookieStore = await cookies();
  cookieStore.delete('vlht_signup_email');

  redirect('/');
};

/*****************/
/* Resend action */
/*****************/
export const resendVerificationEmailAction = async (email: string) => {
  const supabase = await createClient();
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email,
  });

  if (error) {
    return { error: error.message };
  }

  return { message: 'Verification email sent' };
};

/***********************/
/* Get User by Auth ID */
/***********************/
export const getUserByAuthIdAction = async (authId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', authId)
    .single();

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};
