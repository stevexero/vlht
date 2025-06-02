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

export async function getPublishedPosts(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', userId)
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Posts fetched successfully', data: data };
}

export async function getAllPosts(userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', userId);

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Posts fetched successfully', data: data };
}

export async function getEveryPost() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('posts').select('*');

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Posts fetched successfully', data: data };
}

export async function fetchAllPosts() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('status', 'published')
    .eq('published_to_blog', true)
    .order('published_at', { ascending: false });

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Posts fetched successfully', data: data };
}
