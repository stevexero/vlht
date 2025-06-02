import { getPostAction } from '@/app/lib/actions/postActions';
import PostEditor from './PostEditor';
import { User } from '@supabase/supabase-js';

const defaultContent = `
<h1 style="text-align: left;">
  (h1) Welcome to the content editor!,
</h1>
<h2 style="text-align: right;">
  (h2) This is a h2 heading,
</h2>
<h3 style="text-align: left;">
  (h3) This is a h3 heading,
</h3>
<h4 style="text-align: left;">
  (h4) This is a h4 heading,
</h4>
<h5 style="text-align: left;">
  (h5) This is a h5 heading,
</h5>
<h6 style="text-align: left;">
  (h6) This is a h6 heading,
</h6>
<p style="text-align: left;">
  This is a paragraph.
</p>
<p style="text-align: left;">
  This is <strong>bold and strong</strong>.
</p>
<p style="text-align: left;">
  This is <em>italic and em</em>.
</p>    
<p style="text-align: left;">
  This is <strong><em>bold and italic</em></strong>.
</p>
<ul style="text-align: left;">
  <li>
    This is a bullet list item.
  </li>
  <li>
    This is another bullet list item.
  </li>
</ul>
<ol style="text-align: left;">
  <li>
    This is a numbered list item.
  </li>
  <li>
    This is another numbered list item.
  </li>
</ol>
<a href="https://google.com" target="_blank">This is a link</a>
<p style="text-align: left;">
<pre><code class="language-css">// This is a code block
body {
  display: none;
}</code></pre>
<p style="text-align: left;">
  Give it a <strong>try</strong> and <em>click around</em> a little bit.
</p>
<blockquote style="text-align: left;">
  Wow, that's amazing! 👏
  <br />
  — RSDNT ONE
</blockquote>
`;

export default async function PostEditorWrapper({
  user,
  params,
}: {
  user: User;
  params?: { id: string; viewonly: boolean } | null;
}) {
  let initialContent = defaultContent;

  const response = await getPostAction(user.id, params?.id || '');
  if (response.success && response.data) {
    initialContent = response.data.content;
  }

  return (
    <PostEditor
      user={user}
      initialContent={initialContent}
      params={params}
      author={response?.data?.author_id}
    />
  );
}
