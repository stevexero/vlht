'use client';

import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import TextInput from '@/app/ui/dashboard/input/TextInput';
import { useSchedulingStore } from '@/app/store/schedulingStore';

export default function ScheduleName() {
  const { scheduleName, setScheduleName } = useSchedulingStore();

  return (
    <DashboardCard title='Schedule Name' containerStyles='mt-4'>
      <TextInput
        value={scheduleName}
        onChange={(e) => setScheduleName(e.target.value)}
      />
    </DashboardCard>
  );
}
