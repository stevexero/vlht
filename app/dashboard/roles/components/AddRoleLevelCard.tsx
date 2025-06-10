'use client';

import { useState } from 'react';
import { addRoleLevel } from '@/app/lib/actions/actions';
import ButtonPrimary from '@/app/ui/dashboard/buttons/ButtonPrimary';
import DashboardCard from '@/app/ui/dashboard/card/DashboardCard';
import TextInput from '@/app/ui/dashboard/input/TextInput';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function AddRoleLevelCard({
  currentUserRole,
}: {
  currentUserRole: string;
}) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (name.length < 1) {
      toast.error('Please enter a role level name');
      setIsSubmitting(false);
      return;
    }

    const sanitizedName = name.trim().replace(/\s+/g, '_').toLowerCase();

    const formData = new FormData();
    formData.append('currentUserRole', currentUserRole);
    formData.append('name', sanitizedName);

    const response = await addRoleLevel(formData);

    if (response.success) {
      toast.success('Role level added successfully');
      setName('');
      router.refresh();
    } else {
      toast.error(response.error);
    }
    setIsSubmitting(false);
  };

  return (
    <DashboardCard title='Add Role Level'>
      <form className='flex flex-col gap-2 mt-2' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2'>
          <TextInput
            label='Role Level Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='flex justify-end mt-4'>
          <ButtonPrimary type='submit'>
            {isSubmitting ? 'Saving...' : 'Save Role Level'}
          </ButtonPrimary>
        </div>
      </form>
    </DashboardCard>
  );
}
