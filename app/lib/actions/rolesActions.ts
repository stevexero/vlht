'use server';

import { createClient } from '@/app/lib/supabase/server';

export async function addRoleLevel(formData: FormData) {
  const currentUserRole = formData.get('currentUserRole') as string;
  const name = formData.get('name') as string;

  if (currentUserRole !== 'super_admin') {
    return {
      success: false,
      error: 'You are not authorized to add a role level',
      data: null,
    };
  }

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('role_levels')
    .insert({ name })
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: error.message,
      data: null,
    };
  }

  return { success: true, error: null, data: data };
}
