import { createClient } from '@/app/lib/supabase/server';

// get all posts
export async function getDraftPosts(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', userId)
    .eq('status', 'draft');

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Posts fetched successfully', data: data };
}
