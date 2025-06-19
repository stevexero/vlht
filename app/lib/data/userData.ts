import { createClient } from '@/app/lib/supabase/server';

export async function fetchUserProfileByUserId(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return {
    success: true,
    message: 'User profile fetched successfully',
    data: data,
  };
}

/***************************/
/* Fetch All User Profiles */
/***************************/
export async function fetchAllUserProfiles() {
  const supabase = await createClient();

  const { data, error } = await supabase.from('profiles').select('*');

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'User profiles fetched successfully', data };
}
