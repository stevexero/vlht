'use client';

import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';

interface RoleLevel {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
}

export default function CurrentRolesCard({
  roleLevels,
}: {
  roleLevels: RoleLevel[];
}) {
  function sanitizeRoleLevel(roleLevelName: string) {
    return roleLevelName
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <DashboardCard title='Current Roles'>
      {roleLevels.map((roleLevel) => (
        <div key={roleLevel.id}>
          <h2 className='text-gray-800'>{sanitizeRoleLevel(roleLevel.name)}</h2>
        </div>
      ))}
    </DashboardCard>
  );
}
