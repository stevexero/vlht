import CurrentRolesCard from '@/app/dashboard/roles/components/CurrentRolesCard';
import { getRoleLevels } from '@/app/lib/data/rolesData';
import MainPageHeading from '@/app/ui/dashboard/pageHeadings/MainPageHeading';

export default async function page() {
  const roleLevels = await getRoleLevels();
  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <MainPageHeading title='Roles' />
      <CurrentRolesCard roleLevels={roleLevels.data || []} />
    </div>
  );
}
