import { useState, useEffect } from 'react';

const IMAGE_SAMPLE = 'path/to/your/sample/image.jpg'; // Replace with your sample image path

export function useImageLoader(imageURI: string) {
  const [imageSrc, setImageSrc] = useState<string>(IMAGE_SAMPLE);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setIsLoading(true);
        setError(null);

        if (!imageURI) {
          setImageSrc(IMAGE_SAMPLE);
          return;
        }

        const src = imageURI.includes('//')
          ? ` https://ipfs.io/ipfs/${imageURI.split('//')[1]}`
          : IMAGE_SAMPLE;
    

        // Pre-load the image
        const img = new Image();
        img.src = src;
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
        });

        setImageSrc(src);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load image'));
        setImageSrc(IMAGE_SAMPLE);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [imageURI]);

  return { imageSrc, isLoading, error };
}
