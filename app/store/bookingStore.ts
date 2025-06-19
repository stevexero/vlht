import { create } from 'zustand';

interface GuestInfo {
  firstName: string;
  lastName: string;
  age: string;
  email?: string;
}

interface BookingStoreProps {
  isDateSelected: boolean;
  setIsDateSelected: (isDateSelected: boolean) => void;

  selectedDate: string;
  setSelectedDate: (selectedDate: string) => void;

  selectedTime: string;
  setSelectedTime: (selectedTime: string) => void;

  guestCount: number;
  setGuestCount: (guestCount: number) => void;

  guests: GuestInfo[];
  setGuests: (guests: GuestInfo[]) => void;

  selectedTourista: string;
  setSelectedTourista: (selectedTourista: string) => void;
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

  guests: [],
  setGuests: (guests) => set({ guests }),

  selectedTourista: '',
  setSelectedTourista: (selectedTourista) => set({ selectedTourista }),
}));
