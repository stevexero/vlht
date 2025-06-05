import { createClient } from '@/app/lib/supabase/server';

/***************************************/
/* Get Days of Availability by User ID */
/***************************************/
export const getDaysOfAvailabilityByUserId = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_days_availability')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/*******************************************/
/* Get Days of Availability (for bookings) */
/*******************************************/
export const getDaysOfAvailability = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('user_days_availability')
    .select('*');

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};
