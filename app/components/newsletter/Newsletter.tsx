'use client';

import { FC, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CompactBookingForm from '../compactBookingForm/CompactBookingForm';
import Image from 'next/image';
import toast from 'react-hot-toast';
import { subscribeToMailchimp } from '@/app/lib/actions/subscribeActions';

interface DaysOfAvailabilityProps {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
  user_id: string;
}

interface TimeSlotReferenceProps {
  id: string;
  slot_time: string;
  available: boolean;
}

interface ScheduleProps {
  id: string;
  user_id: string;
  name: string;
  days: string;
  time_interval: number;
  duration: number;
  start_time: string;
  end_time: string;
}

interface ScheduleTimeSlotProps {
  id: string;
  schedule_id: string;
  day: string;
  slot_time_id: number;
}

const Newsletter: FC<{
  daysOfAvailability: DaysOfAvailabilityProps[];
  timeSlotsReference?: TimeSlotReferenceProps[];
  schedules?: ScheduleProps[];
  scheduleTimeSlots?: ScheduleTimeSlotProps[][];
}> = ({
  daysOfAvailability,
  timeSlotsReference = [],
  schedules = [],
  scheduleTimeSlots = [],
}) => {
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 50000], [0, -2000]);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const result = await subscribeToMailchimp(formData);

    if (result.success) {
      toast.success(result.message);
      (e.target as HTMLFormElement).reset();
    } else {
      toast.error(result.message);
    }

    setIsSubmitting(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url('/images/newsletter_bg2.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
      className='w-full border-y-8 border-y-yellow-600'
    >
      <div className='w-full max-w-7xl mx-auto relative -mt-8 xl:mt-0'>
        <CompactBookingForm
          daysOfAvailability={daysOfAvailability}
          timeSlotsReference={timeSlotsReference}
          schedules={schedules}
          scheduleTimeSlots={scheduleTimeSlots}
        />
      </div>
      <motion.div
        className='mt-0 xl:mt-48 w-full max-w-7xl mx-auto relative flex flex-col-reverse xl:flex-row items-center justify-between px-4 py-24 md:py-48'
        style={{
          y: yBg,
        }}
      >
        {/* Left - Newsletter Signup */}
        <div className='w-full xl:w-1/2 mt-8 md:mt-0'>
          <h3 className='text-4xl font-bold text-amber-200'>
            STAY IN THE LOOP OF LUXURY
          </h3>
          <p className='text-amber-200 mt-4 text-lg text-shadow-lg'>
            Sign up for our newsletter to keep up to date with the latest of
            High Society Happenings in Vegas.
          </p>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col sm:flex-row items-center mt-8'
          >
            <input
              type='email'
              name='email'
              placeholder='Enter your email'
              className='w-full p-4 rounded-l-none sm:rounded-l-md border-2 border-amber-200 text-amber-200 bg-transparent focus:outline-none'
            />
            <button
              type='submit'
              className='w-full sm:w-auto bg-amber-200 text-black px-6 py-4 rounded-r-none sm:rounded-r-md border-2 border-amber-200 cursor-pointer hover:bg-amber-300 transition-all duration-300 focus:outline-none'
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </div>
        {/* Right - Image */}
        <div className='w-full xl:w-1/2 flex justify-center xl:justify-end mt-96 md:mt-64 xl:mt-0'>
          <Image
            src='/images/news.png'
            alt='Newsletter'
            width={500}
            height={500}
            className='transform -scale-x-100 max-w-full h-auto'
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Newsletter;
