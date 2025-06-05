'use client';

import { useState } from 'react';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import TextInput from '@/app/ui/dashboard/input/TextInput';

export default function ScheduleName() {
  const [scheduleName, setScheduleName] = useState('');

  return (
    <DashboardCard title='Schedule Name' containerStyles='mt-4'>
      <TextInput
        value={scheduleName}
        onChange={(e) => setScheduleName(e.target.value)}
      />
    </DashboardCard>
  );
}
