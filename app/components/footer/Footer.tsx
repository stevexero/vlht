'use client';

import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

type FormStatus = 'sending' | 'success' | 'error' | null;
type SubscribeCallback = (data: FormData) => void;

// Mailchimp subscription URL
const MAILCHIMP_URL =
  'https://lasvegasluxuryhometours.us14.list-manage.com/subscribe/post?u=4162acfdfb221e625d155873c&id=9aa38a9c41';

// Interface for Mailchimp form data
interface FormData {
  EMAIL: string;
}

// Interface for Mailchimp render props
interface MailchimpRenderProps {
  subscribe: SubscribeCallback;
  status: FormStatus | null;
  message: string | Error | null;
}

// Simple form component for Mailchimp
const SimpleForm: FC<{ onSubmitted: (formData: FormData) => void }> = ({
  onSubmitted,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      onSubmitted({ EMAIL: formData.get('EMAIL') as string });
    }}
    className='flex flex-col md:flex-row max-w-5xl w-full mx-auto gap-4 md:gap-0'
  >
    <input
      type='email'
      name='EMAIL'
      placeholder='Enter your email'
      className='w-full md:flex-1 h-12 px-6 rounded-full border-4 border-t-gray-200 border-b-black text-gray-600 text-base focus:outline-none'
      required
    />
    <button
      type='submit'
      className='w-full md:w-80 h-12 bg-gradient-to-r from-gray-600 to-gray-200 text-white border-2 border-amber-400 rounded-full shadow-[0_4px_0_black] font-alfa text-lg tracking-widest hover:scale-105 transition-transform'
    >
      SUBSCRIBE
    </button>
  </form>
);

// Footer component
const Footer: FC = () => {
  return (
    <footer className='bg-gray-600 py-20 flex flex-col items-center'>
      {/* Mailchimp Subscription */}
      <MailchimpSubscribe
        url={MAILCHIMP_URL}
        render={({ subscribe, status, message }: MailchimpRenderProps) => (
          <div className='w-full max-w-5xl mx-auto mb-20 relative'>
            <SimpleForm onSubmitted={(formData) => subscribe(formData)} />
            {status === 'sending' && (
              <div className='absolute -top-8 left-8 text-white'>
                Sending...
              </div>
            )}
            {status === 'error' && (
              <div
                className='absolute -top-8 left-8 text-white'
                dangerouslySetInnerHTML={{ __html: message as string }}
              />
            )}
            {status === 'success' && (
              <div className='absolute -top-8 left-8 text-white'>
                Subscribed!
              </div>
            )}
          </div>
        )}
      />

      {/* Footer Body */}
      <div className='w-full max-w-5xl mx-auto flex flex-col md:flex-row md:justify-between gap-8 md:gap-0 py-20'>
        <div className='md:w-1/2'>
          <h3 className='font-rajdhani font-bold text-lg text-white'>
            FOLLOW US!
          </h3>
          <a
            href='https://www.instagram.com/lasvegasluxuryhometours/'
            target='_blank'
            rel='noreferrer'
            className='mt-4 inline-block'
          >
            <Image
              src='/images/ig.png'
              alt='Instagram'
              width={29}
              height={29}
              priority
            />
          </a>
        </div>
        <div className='md:w-5/12'>
          <h3 className='font-rajdhani font-bold text-lg text-white'>
            COMPANY
          </h3>
          <Link
            href='/about'
            className='font-montserrat font-light text-sm text-white mt-4 block hover:text-amber-400'
          >
            About
          </Link>
        </div>
        <div className='md:w-2/12'>
          <h3 className='font-rajdhani font-bold text-lg text-white'>
            SUPPORT
          </h3>
          <Link
            href='/contact'
            className='font-montserrat font-light text-sm text-white mt-4 block hover:text-amber-400'
          >
            Contact
          </Link>
          <Link
            href='/attributions'
            className='font-montserrat font-light text-sm text-white block hover:text-amber-400'
          >
            Attributions
          </Link>
        </div>
      </div>

      {/* Footer Foot */}
      <div className='w-full max-w-5xl mx-auto border-t border-gray-200 text-center pt-8'>
        <p className='font-montserrat font-light text-sm text-white'>
          COPYRIGHT © 2021 - {new Date().getFullYear()}{' '}
          <span className='md:inline hidden'>-</span>
          <br className='md:hidden' /> VEGAS LUXURY HOME TOURS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
