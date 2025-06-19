import { Suspense } from 'react';
import CurrentRoleLevelsCard from '@/app/dashboard/roles/components/CurrentRoleLevelsCard';
import AddRoleLevelCard from '@/app/dashboard/roles/components/AddRoleLevelCard';
import {
  getRoleLevels,
  fetchUserProfileByUserId,
  getRoleLevelById,
} from '@/app/lib/data/data';
import MainPageHeading from '@/app/ui/dashboard/pageHeadings/MainPageHeading';
import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const roleLevels = await getRoleLevels();

  const profile = await fetchUserProfileByUserId(user.id);
  const roleLevel = await getRoleLevelById(profile.data?.role_level);

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <MainPageHeading title='Roles' />
      <div className='mt-4 mr-8'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
          {roleLevels.data && roleLevels.data.length <= 0 ? null : (
            <Suspense fallback={<div>Loading...</div>}>
              <CurrentRoleLevelsCard roleLevels={roleLevels.data || []} />
            </Suspense>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            <AddRoleLevelCard currentUserRole={roleLevel.data?.name} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
