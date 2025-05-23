import { User } from '@supabase/supabase-js';
import Image from 'next/image';
// import AvatarUploader from './AvatarUploader';
// import ProfileUpdateForm from '../../components/ProfileUpdateForm';

export default function ProfileCard({
  user,
  userProfile,
}: {
  user: User;
  userProfile: {
    success: boolean;
    message: string;
    data: { profile_id: string; avatar_url: string };
  };
}) {
  if (!userProfile.success) {
    return (
      <div className='w-full flex flex-col items-center p-12 max-h-[566px] border border-slate-300 shadow-2xl shadow-slate-700 rounded-2xl'>
        <p>Error: {userProfile.message}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center p-12 max-h-[566px] border border-slate-300 shadow-2xl shadow-slate-700 rounded-2xl'>
      {userProfile?.data?.avatar_url ? (
        <Image
          src={userProfile?.data?.avatar_url}
          width={300}
          height={300}
          alt={'profile'}
          className='w-64 h-64 object-cover rounded-full border-8 border-black shadow-lg shadow-slate-700'
        />
      ) : (
        <Image
          src={
            'https://christopherscottedwards.com/wp-content/uploads/2018/07/Generic-Profile.jpg'
          }
          width={300}
          height={300}
          alt={'Generic User'}
          className='w-64 h-64 object-cover rounded-full border-8 border-black shadow-lg shadow-slate-700'
        />
      )}
      {/* <AvatarUploader userId={userProfile?.profile_id} /> */}
      <p className='w-full mt-8 text-sm'>
        <span className='font-bold'>Email:</span> {user?.email}
      </p>
      {/* <ProfileUpdateForm userProfile={userProfile} /> */}
    </div>
  );
}
