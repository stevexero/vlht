import PostEditorWrapper from './components/PostEditorWrapper';
import { createClient } from '@/app/lib/supabase/server';

const AddPost = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = await searchParams;

  return (
    <>
      <PostEditorWrapper user={user!} params={id} />
    </>
  );
};

export default AddPost;
