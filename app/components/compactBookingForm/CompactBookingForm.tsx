'use client';

import { useBookingStore } from '@/app/store/store';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

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

export default function CompactBookingForm({
  daysOfAvailability,
  timeSlotsReference = [],
  schedules = [],
  scheduleTimeSlots = [],
}: {
  daysOfAvailability: DaysOfAvailabilityProps[];
  timeSlotsReference?: TimeSlotReferenceProps[];
  schedules?: ScheduleProps[];
  scheduleTimeSlots?: ScheduleTimeSlotProps[][];
}) {
  const {
    setIsDateSelected,
    setSelectedDate,
    selectedDate,
    setSelectedTime,
    setGuestCount,
    setSelectedTourista,
  } = useBookingStore();
  const [month, setMonth] = useState('');
  const [dates, setDates] = useState<{ date: number; day: string }[]>([]);
  const [availableTimes, setAvailableTimes] = useState<
    TimeSlotReferenceProps[]
  >([]);
  const [selectedTime, setLocalSelectedTime] = useState('');
  const [selectedGuestCount, setSelectedGuestCount] = useState(1);
  const [currentDate] = useState(new Date());
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Persist the booking information to the store
    if (selectedDate && selectedTime) {
      setSelectedTime(selectedTime);
      setGuestCount(selectedGuestCount);

      // Auto-select the first available tourista for the selected time
      if (availableTimes.length > 0 && schedules.length > 0) {
        const selectedDateObj = new Date(selectedDate);
        const dayOfWeek = selectedDateObj.getDay();
        const dayNames = [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ];
        const selectedDayName = dayNames[dayOfWeek];

        // Find all schedules that have the selected time slot
        const allScheduleTimeSlots = scheduleTimeSlots.flat();
        const timeSlotId = timeSlotsReference.find(
          (slot) => slot.slot_time === selectedTime
        )?.id;

        if (timeSlotId) {
          const schedulesWithTimeSlot = allScheduleTimeSlots.filter(
            (slot) =>
              slot.slot_time_id === parseInt(timeSlotId) &&
              (slot.day === selectedDayName || slot.day === 'all')
          );

          if (schedulesWithTimeSlot.length > 0) {
            // Get the first schedule's user_id
            const firstScheduleId = schedulesWithTimeSlot[0].schedule_id;
            const firstSchedule = schedules.find(
              (s) => s.id === firstScheduleId
            );
            if (firstSchedule) {
              setSelectedTourista(firstSchedule.user_id);
            }
          }
        }
      }
    }

    // Redirect to booking page
    router.push('/book#guest-info');
  };

  const handleDateChange = (day: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    );
    setIsDateSelected(true);
    setSelectedDate(newDate.toLocaleDateString());
    // Clear selected time when date changes
    setLocalSelectedTime('');
  };

  const handleTimeChange = (time: string) => {
    setLocalSelectedTime(time);
  };

  const handleGuestCountChange = (count: number) => {
    setSelectedGuestCount(count);
  };

  // Get the currently selected day number from the store
  const getSelectedDayNumber = () => {
    if (!selectedDate) return '';

    const selectedDateObj = new Date(selectedDate);
    const currentMonth = currentDate.getMonth();
    const selectedMonth = selectedDateObj.getMonth();

    // Only return the day if it's from the current month
    if (selectedMonth === currentMonth) {
      return selectedDateObj.getDate().toString();
    }

    return '';
  };

  // Filter available times based on selected date
  useEffect(() => {
    if (!selectedDate || schedules.length === 0) {
      setAvailableTimes([]);
      return;
    }

    const selectedDateObj = new Date(selectedDate);
    const dayOfWeek = selectedDateObj.getDay();
    const dayNames = [
      'sunday',
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
    ];
    const selectedDayName = dayNames[dayOfWeek];

    // Flatten all schedule time slots into a single array
    const allScheduleTimeSlots = scheduleTimeSlots.flat();

    // Get all available slot_time_ids for the selected day
    const availableSlotTimeIds = allScheduleTimeSlots
      .filter((slot) => slot.day === selectedDayName || slot.day === 'all')
      .map((slot) => slot.slot_time_id);

    // Filter time slots that are actually available
    const availableTimeSlots = timeSlotsReference
      .filter((slot) => availableSlotTimeIds.includes(parseInt(slot.id)))
      .map((slot) => ({
        ...slot,
        available: true,
      }));

    setAvailableTimes(availableTimeSlots);
  }, [selectedDate, schedules, timeSlotsReference, scheduleTimeSlots]);

  useEffect(() => {
    const today = new Date();
    const month = today.getMonth();
    // Get month name
    const monthName = new Date(0, month).toLocaleString('en-US', {
      month: 'long',
    });
    setMonth(monthName);

    // Get dates and days for the month
    const year = today.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Calculate the minimum date (2 days from now)
    const minDate = new Date(today);
    minDate.setDate(today.getDate() + 2);

    const datesWithDays = Array.from({ length: daysInMonth }, (_, i) => {
      const date = new Date(year, month, i + 1);
      return {
        date: i + 1,
        day: date.toLocaleString('en-US', { weekday: 'long' }),
        fullDate: date,
      };
    }).filter(({ fullDate }) => {
      // Filter out dates before minimum date
      if (fullDate < minDate) return false;

      // Get the day of week (0 = Sunday, 1 = Monday, etc.)
      const dayOfWeek = fullDate.getDay();

      // Check if this day is available based on daysOfAvailability
      if (daysOfAvailability.length > 0) {
        const availability = daysOfAvailability[0]; // Assuming single availability record
        const dayNames = [
          'sunday',
          'monday',
          'tuesday',
          'wednesday',
          'thursday',
          'friday',
          'saturday',
        ];
        const dayName = dayNames[dayOfWeek] as keyof DaysOfAvailabilityProps;

        return availability[dayName];
      }

      return true; // If no availability data, show all dates
    });

    setDates(datesWithDays);
  }, [daysOfAvailability]);

  return (
    <div className='absolute -top-0 xl:-top-16 w-full max-w-7xl bg-gradient-to-r from-amber-200 via-amber-100 via-60% to-amber-200 shadow-2xl shadow-blue-950/50 rounded-md z-10 border-2 border-yellow-300'>
      <form className='flex flex-col gap-2 p-4' onSubmit={handleSubmit}>
        <label className='text-blue-950 text-sm text-center font-semibold'>
          BOOK A TOUR FOR {month.toUpperCase()}
        </label>
        <div className='w-full flex flex-col md:flex-row items-end gap-2'>
          <div className='w-full flex flex-col gap-2'>
            <label
              htmlFor='date'
              className='text-blue-950 text-sm font-semibold -mb-1'
            >
              Date
            </label>
            <select
              name='date'
              id='date'
              className='w-full p-2 rounded-md border border-blue-950 focus:outline-none bg-white shadow-md shadow-blue-950/50 cursor-pointer'
              onChange={(e) => handleDateChange(Number(e.target.value))}
              value={getSelectedDayNumber()}
            >
              <option value=''>Select a date</option>
              {dates.map(({ date, day }, index) => (
                <option key={index} value={date}>
                  {day}, {month} {date}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label
              htmlFor='time'
              className='text-blue-950 text-sm font-semibold -mb-1'
            >
              Time
            </label>
            <select
              name='time'
              id='time'
              className='w-full p-2 rounded-md border border-blue-950 focus:outline-none bg-white shadow-md shadow-blue-950/50 cursor-pointer'
              onChange={(e) => handleTimeChange(e.target.value)}
              value={selectedTime}
              disabled={!selectedDate || availableTimes.length === 0}
            >
              <option value=''>
                {!selectedDate
                  ? 'Select a date first'
                  : availableTimes.length === 0
                  ? 'No times available'
                  : 'Select a time'}
              </option>
              {availableTimes.map((timeSlot, index) => (
                <option key={index} value={timeSlot.slot_time}>
                  {timeSlot.slot_time}
                </option>
              ))}
            </select>
          </div>
          <div className='w-full flex flex-col gap-2'>
            <label
              htmlFor='numguests'
              className='text-blue-950 text-sm font-semibold -mb-1'
            >
              Number of Guests
            </label>
            <select
              name='numguests'
              id='numguests'
              className='w-full p-2 rounded-md border border-blue-950 focus:outline-none bg-white shadow-md shadow-blue-950/50 cursor-pointer'
              onChange={(e) => handleGuestCountChange(Number(e.target.value))}
              value={selectedGuestCount}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
            </select>
          </div>
          <button
            type='submit'
            disabled={!selectedDate || !selectedTime}
            className={`w-full md:w-1/2 mt-2 md:mt-0 shadow-md shadow-blue-950/50 text-white p-2 rounded-md focus:outline-none transition-all duration-300 ${
              !selectedDate || !selectedTime
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-blue-950 via-blue-800 to-blue-900 hover:bg-blue-900 focus:bg-blue-900 cursor-pointer hover:scale-105 hover:shadow-lg hover:shadow-blue-950/50'
            }`}
          >
            Book
          </button>
        </div>
      </form>
    </div>
  );
}
