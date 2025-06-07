import LogoLink from '@/app/ui/links/LogoLink';
import UserMenu from './components/UserMenu';
import { User } from '@supabase/supabase-js';

interface AuthNavProps {
  pathname: string;
  user: User | null;
}

export default function AuthNav({ pathname, user }: AuthNavProps) {
  return (
    <nav
      className={`absolute top-0 left-0 w-full px-2 py-1 ${
        pathname.startsWith('/dashboard')
          ? 'border-b border-gray-400 bg-white'
          : 'bg-gray-100'
      } flex justify-between items-center z-20`}
    >
      <LogoLink pathname='/' className='w-8' />
      <div>{user && <UserMenu user={user} />}</div>
    </nav>
  );
}
