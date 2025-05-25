'use server';

import { createClient } from '@/app/lib/supabase/server';

/*****************/
/* Get all posts */
/*****************/
export const getAllPostsAction = async (userId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('author_id', userId) // Updated to profile_id
    .order('created_at', { ascending: false });

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/*********************/
/* Get a single post */
/*********************/
export const getPostAction = async (userId: string, postId: string) => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('id', postId)
    .eq('author_id', userId) // Updated to author_id
    .single();

  if (error) {
    return { success: false, error: error.message, data: null };
  }

  return { success: true, error: null, data };
};

/********************/
/* Create/Update a post */
/********************/
export const createPostAction = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: 'User not authenticated', data: null };
  }

  const author_id = user.id;
  const title = formData.get('title')?.toString();
  const content = formData.get('content')?.toString();
  const status = formData.get('status')?.toString();
  const published_at = formData.get('published_at')?.toString() || null;
  const metadata = JSON.parse(formData.get('metadata')?.toString() || '{}');

  // Validate inputs
  if (!title?.trim()) {
    return { success: false, error: 'Title cannot be empty', data: null };
  }
  if (!content?.trim()) {
    return { success: false, error: 'Content cannot be empty', data: null };
  }
  if (!status || !['draft', 'published'].includes(status)) {
    return { success: false, error: 'Invalid status', data: null };
  }

  try {
    const { data, error } = await supabase
      .from('posts')
      .upsert({
        author_id,
        title,
        content,
        status,
        published_at: published_at
          ? new Date(published_at).toISOString()
          : null,
        metadata,
      })
      .select('id')
      .single();

    if (error) {
      throw new Error(`Failed to save post: ${error.message}`);
    }

    return { success: true, error: null, data: { id: data.id } };
  } catch (error) {
    console.error('Error in createPostAction:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: null,
    };
  }
};
