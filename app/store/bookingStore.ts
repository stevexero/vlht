import { create } from 'zustand';

interface BookingStoreProps {
  isDateSelected: boolean;
  setIsDateSelected: (isDateSelected: boolean) => void;

  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;

  selectedTime: string;
  setSelectedTime: (selectedTime: string) => void;

  guestCount: number;
  setGuestCount: (guestCount: number) => void;
}

export const useBookingStore = create<BookingStoreProps>((set) => ({
  isDateSelected: false,
  setIsDateSelected: (isDateSelected) => set({ isDateSelected }),

  selectedDate: '',
  setSelectedDate: (selectedDate) => set({ selectedDate }),

  selectedTime: '',
  setSelectedTime: (selectedTime) => set({ selectedTime }),

  guestCount: 1,
  setGuestCount: (guestCount) => set({ guestCount }),
}));
