'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { useBookingStore } from '@/app/store/store';

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

export default function Calendar({
  daysOfAvailability,
}: {
  daysOfAvailability: DaysOfAvailabilityProps[];
}) {
  const { setIsDateSelected, setSelectedDate, selectedDate } =
    useBookingStore();
  const [currentDate, setCurrentDate] = useState(new Date());

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setIsDateSelected(true);
    setSelectedDate(newDate.toLocaleDateString());
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    const today = new Date();
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);

    // Check if date is in the past or too soon
    if (date < minDate) {
      return true;
    }

    // Get the day of the week (0 = Sunday, 1 = Monday, etc.)
    const dayOfWeek = date.getDay();

    // Check if any user has this day available
    const isDayAvailable = daysOfAvailability.some((availability) => {
      switch (dayOfWeek) {
        case 0: // Sunday
          return availability.sunday;
        case 1: // Monday
          return availability.monday;
        case 2: // Tuesday
          return availability.tuesday;
        case 3: // Wednesday
          return availability.wednesday;
        case 4: // Thursday
          return availability.thursday;
        case 5: // Friday
          return availability.friday;
        case 6: // Saturday
          return availability.saturday;
        default:
          return false;
      }
    });

    return !isDayAvailable;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className='h-16 md:h-24'></div>);
    }

    // Add cells for each day of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const isDisabled = isDateDisabled(day);
      const isSelected =
        selectedDate ===
        new Date(
          currentDate.getFullYear(),
          currentDate.getMonth(),
          day
        ).toLocaleDateString();

      days.push(
        <motion.div
          key={day}
          whileHover={!isDisabled ? { scale: 1.05 } : {}}
          className={`
            h-16 md:h-24 p-2 border border-gray-200 rounded-lg
            ${
              isDisabled
                ? 'opacity-50 bg-gray-200 cursor-not-allowed'
                : 'hover:bg-amber-50 cursor-pointer'
            }
            ${isSelected ? 'bg-amber-100 border-amber-300' : 'bg-white'}
          `}
          onClick={() => !isDisabled && handleDateClick(day)}
        >
          <div className='text-sm font-semibold text-gray-700'>{day}</div>
        </motion.div>
      );
    }

    return days;
  };

  return (
    <div className='bg-gray-100 rounded-xl shadow-lg p-1 md:p-6 border border-gray-300 mt-48 md:mt-0 sticky top-32'>
      <div className='flex items-center justify-between mb-6'>
        <button
          onClick={handlePrevMonth}
          className='p-2 bg-white border border-gray-300 rounded-xl transition-colors cursor-pointer'
        >
          <BsChevronLeft className='w-6 h-6 text-gray-600' />
        </button>
        <h3 className='text-2xl font-bold text-gray-800'>
          {months[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <button
          onClick={handleNextMonth}
          className='p-2 bg-white border border-gray-300 rounded-xl transition-colors cursor-pointer'
        >
          <BsChevronRight className='w-6 h-6 text-gray-600' />
        </button>
      </div>

      <div className='grid grid-cols-7 gap-2 mb-4'>
        {days.map((day) => (
          <div
            key={day}
            className='text-center text-sm font-semibold text-gray-600 py-2'
          >
            {day}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-7 gap-0 md:gap-2'>
        {renderCalendarDays()}
      </div>
    </div>
  );
}
