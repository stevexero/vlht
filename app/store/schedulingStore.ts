import { create } from 'zustand';

interface DaysOfAvailabilityProps {
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
  sunday: boolean;
}

interface TimeSlot {
  startTime: string;
  endTime: string;
}

interface DayTimeSlots {
  [key: string]: TimeSlot;
}

interface SelectedTimeSlots {
  [key: string]: string[];
}

interface SchedulingStoreProps {
  scheduleName: string;
  setScheduleName: (scheduleName: string) => void;

  selectedInterval: number;
  setSelectedInterval: (selectedInterval: number) => void;

  days: DaysOfAvailabilityProps;
  setDays: (days: DaysOfAvailabilityProps) => void;

  selectedDay: string;
  setSelectedDay: (selectedDay: string) => void;

  dayTimeSlots: DayTimeSlots;
  setDayTimeSlot: (day: string, timeSlot: TimeSlot) => void;
  getDayTimeSlot: (day: string) => TimeSlot;

  allAvailableDays: boolean;
  setAllAvailableDays: (allAvailableDays: boolean) => void;

  duration: number;
  setDuration: (duration: number) => void;

  selectedTimeSlots: SelectedTimeSlots;
  toggleTimeSlot: (day: string, timeValue: string) => void;
  getSelectedTimeSlots: (day: string) => string[];

  reset: () => void;
}

const DEFAULT_TIME_SLOT: TimeSlot = {
  startTime: '09:00',
  endTime: '17:00',
};

const DEFAULT_DAYS: DaysOfAvailabilityProps = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
};

export const useSchedulingStore = create<SchedulingStoreProps>((set, get) => ({
  scheduleName: '',
  setScheduleName: (scheduleName) => set({ scheduleName }),

  selectedInterval: 60,
  setSelectedInterval: (selectedInterval) => set({ selectedInterval }),

  days: DEFAULT_DAYS,
  setDays: (days) => set({ days }),

  selectedDay: '',
  setSelectedDay: (selectedDay) => set({ selectedDay }),

  dayTimeSlots: {},
  setDayTimeSlot: (day, timeSlot) =>
    set((state) => ({
      dayTimeSlots: {
        ...state.dayTimeSlots,
        [day]: timeSlot,
      },
    })),
  getDayTimeSlot: (day) => {
    const state = get();
    return state.dayTimeSlots[day] || DEFAULT_TIME_SLOT;
  },

  allAvailableDays: true,
  setAllAvailableDays: (allAvailableDays) => set({ allAvailableDays }),

  duration: 60,
  setDuration: (duration) => set({ duration }),

  selectedTimeSlots: {},
  toggleTimeSlot: (day, timeValue) =>
    set((state) => {
      const currentSlots = state.selectedTimeSlots[day] || [];
      const newSlots = currentSlots.includes(timeValue)
        ? currentSlots.filter((time) => time !== timeValue)
        : [...currentSlots, timeValue];

      return {
        selectedTimeSlots: {
          ...state.selectedTimeSlots,
          [day]: newSlots,
        },
      };
    }),
  getSelectedTimeSlots: (day) => {
    const state = get();
    return state.selectedTimeSlots[day] || [];
  },

  reset: () =>
    set({
      scheduleName: '',
      selectedInterval: 60,
      days: DEFAULT_DAYS,
      selectedDay: '',
      dayTimeSlots: {},
      allAvailableDays: true,
      duration: 60,
      selectedTimeSlots: {},
    }),
}));
