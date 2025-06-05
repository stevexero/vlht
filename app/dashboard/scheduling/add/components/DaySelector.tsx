'use client';

import { useSchedulingStore } from '@/app/store/schedulingStore';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import Selector from '@/app/ui/dashboard/dropdowns/Selector';

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
] as const;

export default function DaySelector() {
  const { days, selectedDay, setSelectedDay } = useSchedulingStore();

  const availableDays = DAYS.filter(({ key }) => days[key]);

  return (
    <DashboardCard title='Day Selector' containerStyles='mt-4'>
      <Selector
        id='days'
        options={availableDays}
        selectedValue={selectedDay}
        setSelectedValue={setSelectedDay}
        defaultOptionValue=''
        defaultOptionLabel='No days selected'
      />
    </DashboardCard>
  );
}
