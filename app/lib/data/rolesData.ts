import { createClient } from '@/app/lib/supabase/server';

export const getRoleLevels = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.from('role_levels').select('*');
  if (error) {
    return { success: false, message: error.message, data: null };
  }
  return {
    success: true,
    message: 'Role levels fetched successfully',
    data: data,
  };
};
