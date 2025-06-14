import { Suspense } from 'react';
// import { fetchUserProfileByUserId } from '@/app/lib/data/data';
import { createClient } from '@/app/lib/supabase/server';
import PostsOverviewCard from '../components/PostsOverviewCard';
import { fetchAllPosts } from '@/app/lib/data/postData';
import { fetchTrafficData } from '@/app/lib/data/trafficData';
import TrafficOverviewCard from '../components/TrafficOverviewCard';
// import ProfileCard from '@/app/dashboard/components/ProfileCard';
export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Error: User not found</div>;
  }

  // const userProfile = await fetchUserProfileByUserId(user!.id);
  const posts = await fetchAllPosts();
  let traffic;
  try {
    traffic = await fetchTrafficData();
  } catch (error) {
    console.error('Traffic data fetch failed:', error);
    traffic = {
      stats: {
        pageviews: { value: 0 },
        visitors: { value: 0 },
        bounces: { value: 0 },
        visits: { value: 0 },
      },
      pageviews: [],
      referrers: [],
    };
  }

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 mr-8'>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <ProfileCard user={user!} userProfile={userProfile} />
        </Suspense> */}
        <Suspense fallback={<div>Loading...</div>}>
          <TrafficOverviewCard traffic={traffic} />
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          <PostsOverviewCard posts={posts.data || []} user={user} />
        </Suspense>
      </div>
    </div>
  );
}
