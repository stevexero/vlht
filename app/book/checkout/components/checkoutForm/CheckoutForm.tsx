'use client';

import React, { useMemo } from 'react';
import { useBookingStore } from '@/app/store/store';

interface GuestInfo {
  firstName: string;
  lastName: string;
  age: string;
  email?: string;
}

export default function CheckoutForm() {
  const { selectedDate, selectedTime, guestCount, guests } = useBookingStore();

  const totalAmount = useMemo(() => {
    return guests.reduce((total, guest) => {
      const age = parseInt(guest.age);
      if (age >= 4 && age <= 12) {
        return total + 78;
      } else if (age >= 13) {
        return total + 84;
      }
      return total;
    }, 0);
  }, [guests]);

  return (
    <div className='w-full max-w-4xl mx-auto p-2 md:p-6'>
      <div className='bg-white rounded-xl shadow-lg p-4 md:p-6 border border-gray-300'>
        <h2 className='text-2xl font-bold text-gray-800 mb-6'>
          Booking Summary
        </h2>

        {/* Booking Details */}
        <div className='mb-8'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            Booking Details
          </h3>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600'>Date</p>
              <p className='font-semibold text-gray-800'>{selectedDate}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600'>Time</p>
              <p className='font-semibold text-gray-800'>{selectedTime}</p>
            </div>
            <div className='bg-gray-50 p-4 rounded-lg'>
              <p className='text-sm text-gray-600'>Number of Guests</p>
              <p className='font-semibold text-gray-800'>{guestCount}</p>
            </div>
          </div>
        </div>

        {/* Guest Information */}
        <div className='mb-8'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>
            Guest Information
          </h3>
          <div className='space-y-4'>
            {guests.map((guest: GuestInfo, index: number) => {
              const age = parseInt(guest.age);
              const price = age >= 4 && age <= 12 ? 78 : age >= 13 ? 84 : 0;

              return (
                <div key={index} className='bg-gray-50 p-4 rounded-lg'>
                  <div className='flex flex-col md:flex-row justify-between items-start md:items-center mb-2'>
                    <h4 className='font-semibold text-gray-800'>
                      {index === 0 ? 'Primary Guest' : `Guest ${index + 1}`}
                    </h4>
                    {index === 0 && (
                      <span className='text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full'>
                        Contact Person
                      </span>
                    )}
                  </div>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <div>
                      <p className='text-sm text-gray-600'>Name</p>
                      <p className='font-medium text-gray-800'>
                        {guest.firstName} {guest.lastName}
                      </p>
                    </div>
                    <div>
                      <p className='text-sm text-gray-600'>Age</p>
                      <p className='font-medium text-gray-800'>{guest.age}</p>
                    </div>
                    {index === 0 && (
                      <div className='col-span-2'>
                        <p className='text-sm text-gray-600'>Email</p>
                        <p className='font-medium text-gray-800'>
                          {guest.email}
                        </p>
                      </div>
                    )}
                    <div className='col-span-2'>
                      <p className='text-sm text-gray-600'>Price</p>
                      <p className='font-medium text-gray-800'>
                        {price > 0 ? `$${price}` : 'Free (under 4)'}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Payment Section */}
        <div className='border-t border-gray-200 pt-6'>
          <h3 className='text-lg font-semibold text-gray-700 mb-4'>Payment</h3>
          <div className='bg-gray-50 p-4 rounded-lg'>
            <div className='flex justify-between items-center mb-2'>
              <p className='text-gray-600'>Total Amount</p>
              <p className='font-bold text-gray-800'>${totalAmount}</p>
            </div>
            <p className='text-sm text-gray-500'>
              Payment details will be added here
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className='mt-8 flex justify-end gap-4'>
          <button
            onClick={() => window.history.back()}
            className='px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors'
          >
            Back
          </button>
          <button className='px-6 py-2 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-colors'>
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
}
