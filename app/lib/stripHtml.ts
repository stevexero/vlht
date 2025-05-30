// app/lib/stripHtml.ts
export function stripHtml(
  html: string,
  options: { excludeH1?: boolean } = {}
): string {
  let cleaned = html;

  // Remove <h1> tags and their content if excludeH1 is true
  if (options.excludeH1) {
    cleaned = cleaned.replace(/<h1[^>]*>[\s\S]*?<\/h1>/gi, '');
  }

  // Remove all other HTML tags and normalize whitespace
  return cleaned
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}
