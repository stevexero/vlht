import { Suspense } from 'react';
import { fetchUserProfileByUserId } from '@/app/lib/data/data';
import { createClient } from '@/app/lib/supabase/server';
import ProfileCard from '@/app/dashboard/components/ProfileCard';
export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Error: User not found</div>;
  }

  const userProfile = await fetchUserProfileByUserId(user!.id);

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <Suspense fallback={<div>Loading...</div>}>
        <ProfileCard user={user!} userProfile={userProfile} />
      </Suspense>
    </div>
  );
}
