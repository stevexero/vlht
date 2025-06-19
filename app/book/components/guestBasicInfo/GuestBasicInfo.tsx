'use client';

import { useState, useEffect, useRef } from 'react';
import { useBookingStore } from '@/app/store/store';
import { useRouter } from 'next/navigation';

interface GuestInfo {
  firstName: string;
  lastName: string;
  age: string;
  email?: string;
}

export default function GuestBasicInfo() {
  const { guestCount, setGuests, selectedTime } = useBookingStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [guests, setLocalGuests] = useState<GuestInfo[]>([]);
  const [emailError, setEmailError] = useState('');
  const emailInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Check if we should autofocus the email input
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.location.hash === '#guest-info'
    ) {
      console.log('Hash detected, attempting to autofocus email input');
      // Use setTimeout to ensure the component is fully rendered
      const timer = setTimeout(() => {
        console.log('Timer fired, checking conditions:', {
          hasRef: !!emailInputRef.current,
          currentStep,
          guestsLength: guests.length,
        });
        if (emailInputRef.current && currentStep === 0 && guests.length > 0) {
          console.log('Focusing email input');
          emailInputRef.current.focus();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [currentStep, guests.length]);

  // Initialize guests when guestCount changes
  useEffect(() => {
    if (guestCount > 0) {
      setLocalGuests(
        Array.from({ length: guestCount }, () => ({
          email: '',
          firstName: '',
          lastName: '',
          age: '',
        }))
      );
    }
  }, [guestCount]);

  // Reset current step if it's greater than guest count
  useEffect(() => {
    if (currentStep >= guestCount) {
      setCurrentStep(Math.max(0, guestCount - 1));
    }
  }, [guestCount, currentStep]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleInputChange = (
    index: number,
    field: keyof GuestInfo,
    value: string
  ) => {
    if (index >= 0 && index < guests.length) {
      const newGuests = [...guests];
      newGuests[index] = { ...newGuests[index], [field]: value };
      setLocalGuests(newGuests);

      // Validate email when it changes
      if (field === 'email') {
        if (!value.trim()) {
          setEmailError('Email is required');
        } else if (!validateEmail(value)) {
          setEmailError('Please enter a valid email address');
        } else {
          setEmailError('');
        }
      }
    }
  };

  const handleNext = () => {
    if (currentStep < guestCount - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // This is the last step, handle submission
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Set the guests in the store
    setGuests(guests);

    // Log the complete guest information
    console.log('Guest Information Submission:', {
      primaryGuest: {
        ...guests[0],
        isPrimary: true,
      },
      additionalGuests: guests.slice(1).map((guest, index) => ({
        ...guest,
        guestNumber: index + 2,
      })),
      totalGuests: guestCount,
      submissionTime: new Date().toISOString(),
    });

    router.push('/book/checkout');
  };

  const isStepValid = (step: number) => {
    if (step < 0 || step >= guests.length) return false;

    const guest = guests[step];
    if (!guest) return false;

    if (step === 0) {
      return (
        guest.firstName?.trim() !== '' &&
        guest.lastName?.trim() !== '' &&
        guest.age?.trim() !== '' &&
        guest.email?.trim() !== '' &&
        validateEmail(guest.email || '') &&
        !emailError
      );
    }
    return (
      guest.firstName?.trim() !== '' &&
      guest.lastName?.trim() !== '' &&
      guest.age?.trim() !== ''
    );
  };

  // Don't render if no guests
  //   if (guestCount <= 0 || guests.length === 0) {
  //     return null;
  //   }

  const currentGuest = guests[currentStep];
  //   if (!currentGuest) return null;
  //   if (!currentGuest) {
  //     return (
  //       <div className='w-full bg-gray-100 rounded-xl shadow-lg p-6 border border-gray-300 relative'>
  //         <p className='text-red-900/50 text-center font-semibold text-lg'>
  //           Please select a number of guests
  //         </p>
  //       </div>
  //     );
  //   }

  return (
    <div
      id='guest-info'
      className='w-full bg-gray-100 rounded-xl shadow-lg p-6 border border-gray-300 relative'
    >
      <div
        className={`${
          !selectedTime
            ? 'absolute top-0 left-0 w-full h-full bg-gray-100/90 cursor-not-allowed flex items-center justify-center z-10 rounded-xl'
            : ''
        }`}
      >
        {!selectedTime ? (
          <p className='text-red-900/50 text-center font-semibold text-lg'>
            Please select a number of guests
          </p>
        ) : null}
      </div>
      <div className='mb-6'>
        <h3 className='text-xl font-bold text-gray-800 text-center'>
          Guest Information
        </h3>
        <p className='text-sm text-center mt-2'>
          {currentStep === 0
            ? 'Please provide your contact information'
            : `Guest ${currentStep + 1} Information`}
        </p>
      </div>

      <div className='space-y-4'>
        {currentStep === 0 && (
          <div>
            <label className='block text-xs font-medium text-gray-700 mb-1'>
              Email<span className='text-red-500'>*</span>
            </label>
            <input
              type='email'
              value={currentGuest?.email || ''}
              onChange={(e) =>
                handleInputChange(currentStep, 'email', e.target.value)
              }
              className={`w-full p-2 bg-white border rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 ${
                emailError ? 'border-red-500' : 'border-gray-300'
              }`}
              autoFocus={currentStep === 0}
              ref={emailInputRef}
              disabled={!selectedTime}
              required
            />
            {emailError && (
              <p className='mt-1 text-xs text-red-500'>{emailError}</p>
            )}
          </div>
        )}
        <div>
          <label className='block text-xs font-medium text-gray-700 mb-1'>
            First Name<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={currentGuest?.firstName || ''}
            onChange={(e) =>
              handleInputChange(currentStep, 'firstName', e.target.value)
            }
            className='w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
          />
        </div>

        <div>
          <label className='block text-xs font-medium text-gray-700 mb-1'>
            Last Name<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            value={currentGuest?.lastName || ''}
            onChange={(e) =>
              handleInputChange(currentStep, 'lastName', e.target.value)
            }
            className='w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
          />
        </div>

        <div>
          <label className='block text-xs font-medium text-gray-700 mb-1'>
            Age<span className='text-red-500'>*</span>
          </label>
          <input
            type='number'
            min='0'
            max='120'
            value={currentGuest?.age || ''}
            onChange={(e) =>
              handleInputChange(currentStep, 'age', e.target.value)
            }
            className='w-full p-2 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500'
          />
        </div>
      </div>

      <div className='flex justify-between mt-6'>
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`
            px-4 py-2 rounded-lg border transition-colors
            ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-amber-50 border-gray-300'
            }
          `}
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={!isStepValid(currentStep)}
          className={`
            px-4 py-2 rounded-lg border transition-colors
            ${
              !isStepValid(currentStep)
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-blue-900 text-white hover:bg-blue-600 border-blue-900 cursor-pointer'
            }
          `}
        >
          {currentStep === guestCount - 1 ? 'Complete' : 'Next'}
        </button>
      </div>

      <div className='mt-4 flex justify-center gap-2'>
        {Array(guestCount)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                currentStep === index ? 'bg-amber-500' : 'bg-gray-300'
              }`}
            />
          ))}
      </div>
    </div>
  );
}
