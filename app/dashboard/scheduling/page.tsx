import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import MainPageHeading from '@/app/ui/dashboard/pageHeadings/MainPageHeading';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import { getAllSchedules, getUserSchedules } from '@/app/lib/data/scheduleData';
import { fetchUserProfileByUserId } from '@/app/lib/data/userData';
import Link from 'next/link';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  const [userSchedules, allSchedules] = await Promise.all([
    getUserSchedules(user.id),
    getAllSchedules(),
  ]);

  const otherSchedules = allSchedules.data?.filter(
    (schedule) => schedule.user_id !== user.id
  );

  // Fetch profiles for all other schedule users
  const userProfiles = new Map();
  if (otherSchedules) {
    const uniqueUserIds = [
      ...new Set(otherSchedules.map((schedule) => schedule.user_id)),
    ];

    const profilePromises = uniqueUserIds.map(async (userId) => {
      const profileResult = await fetchUserProfileByUserId(userId);
      if (profileResult.success && profileResult.data) {
        return { userId, profile: profileResult.data };
      }
      return { userId, profile: null };
    });

    const profileResults = await Promise.all(profilePromises);
    profileResults.forEach(({ userId, profile }) => {
      if (profile) {
        userProfiles.set(userId, profile);
      }
    });
  }

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <MainPageHeading
        title='Scheduling'
        link='/dashboard/scheduling/add'
        linkText='Add Schedule'
      />

      {allSchedules.data && allSchedules.data.length <= 0 ? (
        <div className='mt-4'>
          <div className='flex flex-row items-center gap-4'>
            <p className='text-lg font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
              No schedules created yet.
            </p>
            <Link
              href='/dashboard/scheduling/add'
              className='text-lg font-bold text-blue-600 text-shadow-2xs text-shadow-white underline'
            >
              Create one now!
            </Link>
          </div>
        </div>
      ) : (
        <div className='mt-4 mr-8'>
          <div className='flex flex-col gap-8'>
            {/* <DashboardCard title='My Schedules' containerStyles='mt-4'> */}
            {userSchedules.data && userSchedules.data.length > 0 ? (
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {userSchedules.data.map((schedule) => (
                  // <div
                  //   key={schedule.id}
                  //   className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                  // >
                  <DashboardCard
                    key={schedule.id}
                    title={schedule.name}
                    containerStyles='mt-4'
                  >
                    {/* <h3 className='font-semibold text-lg text-gray-800'>
                      {schedule.name}
                    </h3> */}
                    <div className='mt-2 space-y-1 text-sm text-gray-600'>
                      <p>Duration: {schedule.duration} minutes</p>
                      <p>
                        Time:{' '}
                        {new Date(
                          `1970-01-01T${schedule.start_time}`
                        ).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}{' '}
                        -{' '}
                        {new Date(
                          `1970-01-01T${schedule.end_time}`
                        ).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                      <div className='mt-2'>
                        <p className='font-medium'>Days:</p>
                        <div className='flex flex-wrap gap-2 mt-1'>
                          {Object.entries({
                            monday: schedule.monday,
                            tuesday: schedule.tuesday,
                            wednesday: schedule.wednesday,
                            thursday: schedule.thursday,
                            friday: schedule.friday,
                            saturday: schedule.saturday,
                            sunday: schedule.sunday,
                          })
                            .filter(([, isAvailable]) => isAvailable)
                            .map(([day]) => (
                              <span
                                key={day}
                                className='px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs'
                              >
                                {day.charAt(0).toUpperCase() + day.slice(1)}
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </DashboardCard>
                  // </div>
                ))}
              </div>
            ) : (
              <div className='flex flex-row items-center gap-4'>
                <p className='text-lg font-bold text-gray-600 text-shadow-2xs text-shadow-white'>
                  No schedules created yet.
                </p>
                <Link
                  href='/dashboard/scheduling/add'
                  className='text-lg font-bold text-blue-600 text-shadow-2xs text-shadow-white underline'
                >
                  Create one now!
                </Link>
              </div>
            )}
            {/* </DashboardCard> */}

            <div className='flex flex-col gap-8'>
              <h3 className='text-xl font-bold text-gray-600 text-shadow-2xs text-shadow-white -mb-8'>
                Other Schedules
              </h3>
              {otherSchedules && otherSchedules.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  {otherSchedules.map((schedule) => (
                    // <div
                    //   key={schedule.id}
                    //   className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                    // >
                    <DashboardCard
                      key={schedule.id}
                      title={schedule.name}
                      containerStyles='mt-4'
                    >
                      {/* <h3 className='font-semibold text-lg text-gray-800'>
                        {schedule.name}
                      </h3> */}
                      <div className='mt-2 space-y-1 text-sm text-gray-600'>
                        <p>
                          Tourista:{' '}
                          {userProfiles.get(schedule.user_id)?.first_name}
                        </p>
                        <p>Duration: {schedule.duration} minutes</p>
                        <p>
                          Time: {schedule.start_time} - {schedule.end_time}
                        </p>
                        <div className='mt-2'>
                          <p className='font-medium'>Days:</p>
                          <div className='flex flex-wrap gap-2 mt-1'>
                            {Object.entries({
                              monday: schedule.monday,
                              tuesday: schedule.tuesday,
                              wednesday: schedule.wednesday,
                              thursday: schedule.thursday,
                              friday: schedule.friday,
                              saturday: schedule.saturday,
                              sunday: schedule.sunday,
                            })
                              .filter(([, isAvailable]) => isAvailable)
                              .map(([day]) => (
                                <span
                                  key={day}
                                  className='px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs'
                                >
                                  {day.charAt(0).toUpperCase() + day.slice(1)}
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </DashboardCard>
                  ))}
                </div>
              ) : (
                <p className='text-gray-500 text-center py-4'>
                  No other schedules available.
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
