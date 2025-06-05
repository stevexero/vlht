'use server';

import { createClient } from '@/app/lib/supabase/server';

/****************************/
/* Add Days of Availability */
/****************************/
export const updateDaysOfAvailability = async (formData: FormData) => {
  const userId = formData.get('userId');
  const days = {
    monday: formData.get('monday') === 'true',
    tuesday: formData.get('tuesday') === 'true',
    wednesday: formData.get('wednesday') === 'true',
    thursday: formData.get('thursday') === 'true',
    friday: formData.get('friday') === 'true',
    saturday: formData.get('saturday') === 'true',
    sunday: formData.get('sunday') === 'true',
  };

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('user_days_availability')
    .upsert({ user_id: userId, ...days })
    .select('*');

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};
