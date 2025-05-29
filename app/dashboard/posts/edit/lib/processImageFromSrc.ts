import { processImage } from './processImage';

export const processImageFromSrc = async (
  imageTag: string
): Promise<{ originalSrc: string; processedFile: File } | null> => {
  try {
    const srcMatch = imageTag.match(/src="([^"]+)"/);
    if (!srcMatch || !srcMatch[1]) {
      console.error('Invalid image tag:', imageTag);
      return null;
    }
    const src = srcMatch[1];
    const originalSrc = src;

    let file: File;

    if (src.startsWith('data:image/')) {
      const response = await fetch(src);
      const blob = await response.blob();
      const mimeType = blob.type;
      const extension = mimeType.split('/')[1] || 'png';
      file = new File([blob], `image-${Date.now()}.${extension}`, {
        type: mimeType,
      });
    } else if (src.startsWith('https://') || src.startsWith('http://')) {
      const response = await fetch(src, { mode: 'cors' });
      if (!response.ok) {
        console.error(
          'Failed to fetch external image:',
          src,
          response.statusText
        );
        return null;
      }
      const blob = await response.blob();
      const extension = src.split('.').pop()?.split('?')[0] || 'jpg';
      file = new File([blob], `image-${Date.now()}.${extension}`, {
        type: blob.type || 'image/jpeg',
      });
    } else {
      console.error('Unsupported image source:', src);
      return null;
    }

    const processedFile = await processImage(file);
    return { originalSrc, processedFile };
  } catch (error) {
    console.error('Error processing image from src:', imageTag, error);
    return null;
  }
};
