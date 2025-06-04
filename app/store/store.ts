export * from './postsStore';
export * from './bookingStore';

import { create } from 'zustand';

interface GuestInfo {
  firstName: string;
  lastName: string;
  age: string;
  email?: string;
}

interface BookingStoreProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTime: string;
  setSelectedTime: (time: string) => void;
  guestCount: number;
  setGuestCount: (count: number) => void;
  isDateSelected: boolean;
  setIsDateSelected: (isSelected: boolean) => void;
  guests: GuestInfo[];
  setGuests: (guests: GuestInfo[]) => void;
}

export const useBookingStore = create<BookingStoreProps>((set) => ({
  selectedDate: '',
  setSelectedDate: (date) => set({ selectedDate: date }),
  selectedTime: '',
  setSelectedTime: (time) => set({ selectedTime: time }),
  guestCount: 0,
  setGuestCount: (count) => set({ guestCount: count }),
  isDateSelected: false,
  setIsDateSelected: (isSelected) => set({ isDateSelected: isSelected }),
  guests: [],
  setGuests: (guests) => set({ guests }),
}));
