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

export async function getUserPostById(id: string, userId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', id)
    .eq('author_id', userId)
    .single();

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Post fetched successfully', data: data };
}

/*****************************/
/* Get post tags by post id */
/*****************************/
export async function getPostTagIdsByPostId(postId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('post_tags')
    .select('tag_id')
    .eq('post_id', postId);

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return {
    success: true,
    message: 'Post tags fetched successfully',
    data: data,
  };
}

/***********************/
/* Get tags by tag ids */
/***********************/
export async function getTagsByTagIds(tagIds: string[]) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('tags')
    .select('*')
    .in('id', tagIds);

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Tags fetched successfully', data: data };
}

/****************/
/* Get All Tags */
/****************/
export async function getAllTags() {
  const supabase = await createClient();
  const { data, error } = await supabase.from('tags').select('*');

  if (error) {
    return { success: false, message: error.message, data: null };
  }

  return { success: true, message: 'Tags fetched successfully', data: data };
}
