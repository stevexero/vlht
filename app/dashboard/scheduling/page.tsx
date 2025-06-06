import { createClient } from '@/app/lib/supabase/server';
import { redirect } from 'next/navigation';
import MainPageHeading from '@/app/ui/dashboard/pageHeadings/MainPageHeading';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import { getAllSchedules, getUserSchedules } from '@/app/lib/data/scheduleData';

export default async function page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }

  // Fetch both personal and all schedules
  const [userSchedules, allSchedules] = await Promise.all([
    getUserSchedules(user.id),
    getAllSchedules(),
  ]);

  // Filter out user's schedules from all schedules
  const otherSchedules = allSchedules.data?.filter(
    (schedule) => schedule.user_id !== user.id
  );

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <MainPageHeading
        title='Scheduling'
        link='/dashboard/scheduling/add'
        linkText='Add Schedule'
      />

      <div className='flex flex-col gap-8 p-4'>
        {/* My Schedules */}
        <DashboardCard title='My Schedules' containerStyles='mt-4'>
          {userSchedules.data && userSchedules.data.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {userSchedules.data.map((schedule) => (
                <div
                  key={schedule.id}
                  className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                >
                  <h3 className='font-semibold text-lg text-gray-800'>
                    {schedule.name}
                  </h3>
                  <div className='mt-2 space-y-1 text-sm text-gray-600'>
                    <p>Duration: {schedule.duration} minutes</p>
                    <p>Interval: {schedule.time_interval} minutes</p>
                    <p>
                      Time: {schedule.start_time} - {schedule.end_time}
                    </p>
                    <div className='mt-2'>
                      <p className='font-medium'>Available Days:</p>
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
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 text-center py-4'>
              No schedules created yet. Click &quot;Add Schedule&quot; to create
              one.
            </p>
          )}
        </DashboardCard>

        {/* Other Schedules */}
        <DashboardCard title='Other Schedules' containerStyles='mt-4'>
          {otherSchedules && otherSchedules.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {otherSchedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className='border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow'
                >
                  <h3 className='font-semibold text-lg text-gray-800'>
                    {schedule.name}
                  </h3>
                  <div className='mt-2 space-y-1 text-sm text-gray-600'>
                    <p>Duration: {schedule.duration} minutes</p>
                    <p>Interval: {schedule.time_interval} minutes</p>
                    <p>
                      Time: {schedule.start_time} - {schedule.end_time}
                    </p>
                    <div className='mt-2'>
                      <p className='font-medium'>Available Days:</p>
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
                </div>
              ))}
            </div>
          ) : (
            <p className='text-gray-500 text-center py-4'>
              No other schedules available.
            </p>
          )}
        </DashboardCard>
      </div>
    </div>
  );
}
