import SubPageHeading from '@/app/ui/pageHeadings/SubPageHeading';
import PostEditorWrapper from './components/PostEditorWrapper';
import { createClient } from '@/app/lib/supabase/server';

const AddPost = async ({
  searchParams,
}: {
  searchParams: Promise<{ id: string; viewonly: boolean; newpost: boolean }>;
}) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const id = await searchParams;

  return (
    <div className='w-full ml-8 md:ml-72 mt-24 md:mt-16'>
      <SubPageHeading href='/dashboard/posts' title='Add/Edit Post' />
      <PostEditorWrapper user={user!} params={id} />
    </div>
  );
};

export default AddPost;
