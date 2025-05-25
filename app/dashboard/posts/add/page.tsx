import { PostEditor } from './components/PostEditor';
import { createClient } from '@/app/lib/supabase/server';

export default async function AddPost() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <PostEditor user={user!} />
    </>
  );
}
