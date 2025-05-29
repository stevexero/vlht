import { uploadImageAction } from '@/app/lib/actions/postActions';
import { processImageFromSrc } from './processImageFromSrc';

export const processAndUploadImages = async (
  content: string,
  userId: string
) => {
  const imageTags = content.match(/<img[^>]+src="([^">]+)"/g) || [];
  let updatedContent = content;
  const imageUrls: { originalSrc: string; publicUrl: string }[] = [];

  if (imageTags.length === 0) {
    console.log('No images found in content');
    return { updatedContent, imageUrls };
  }

  const processedImages = await Promise.all(
    imageTags.map(async (imageTag) => {
      const result = await processImageFromSrc(imageTag);
      if (!result) return null;

      const { originalSrc, processedFile } = result;
      const uploadResult = await uploadImageAction(processedFile, userId);

      if (!uploadResult.success || !uploadResult.data?.url) {
        console.error(
          'Failed to upload image:',
          originalSrc,
          uploadResult.error
        );
        return null;
      }

      return { originalSrc, publicUrl: uploadResult.data.url };
    })
  );

  const validImages = processedImages.filter(
    (img): img is { originalSrc: string; publicUrl: string } => img !== null
  );

  validImages.forEach(({ originalSrc, publicUrl }) => {
    updatedContent = updatedContent.replace(
      new RegExp(
        `src="${originalSrc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`,
        'g'
      ),
      `src="${publicUrl}"`
    );
  });

  return { updatedContent, imageUrls: validImages };
};
