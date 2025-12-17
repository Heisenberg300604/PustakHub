import { supabase } from '@/lib/supabase';
import * as FileSystem from 'expo-file-system/legacy';

export const uploadImages = async (images: (string | null)[], userId: string): Promise<string[]> => {
  const urls: string[] = [];

  // Filter out null images before processing
  const validImages = images.filter((img): img is string => img !== null);

  if (validImages.length === 0) {
    throw new Error('No valid images to upload');
  }

  for (let i = 0; i < validImages.length; i++) {
    const img = validImages[i];
    
    // Generate unique identifiers
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2);
    let mimeType: string = 'image/jpeg'; // Initialize outside try block for error handling
    let filename: string = '';

    try {
      console.log(`Uploading image ${i + 1}/${validImages.length}`);
      console.log("Original URI:", img);

      let imageData: string;

      // Check if it's a local file URI (starts with file://)
      if (img.startsWith('file://')) {
        // Read the file as base64 using Expo FileSystem (legacy API)
        const fileInfo = await FileSystem.getInfoAsync(img);
        
        if (!fileInfo.exists) {
          throw new Error('Image file does not exist');
        }

        console.log('File size:', fileInfo.size);
        
        // Read file as base64
        imageData = await FileSystem.readAsStringAsync(img, {
          encoding: FileSystem.EncodingType.Base64,
        });

        // Determine MIME type from file extension or default to JPEG
        const extension = img.split('.').pop()?.toLowerCase();
        switch (extension) {
          case 'png':
            mimeType = 'image/png';
            break;
          case 'jpg':
          case 'jpeg':
            mimeType = 'image/jpeg';
            break;
          case 'webp':
            mimeType = 'image/webp';
            break;
          case 'heic':
          case 'heif':
            mimeType = 'image/heic';
            break;
          default:
            mimeType = 'image/jpeg';
        }
      } else {
        // Handle remote URLs (though less common in this use case)
        const response = await fetch(img);
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        mimeType = blob.type || 'image/jpeg';
        
        // Convert blob to base64
        const reader = new FileReader();
        imageData = await new Promise((resolve, reject) => {
          reader.onload = () => {
            const result = reader.result as string;
            // Remove data URL prefix to get just the base64 data
            const base64 = result.split(',')[1];
            resolve(base64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }

      console.log("MIME type:", mimeType);
      console.log("Base64 data length:", imageData.length);

      // Convert base64 to ArrayBuffer for Supabase
      const binaryString = atob(imageData);
      const bytes = new Uint8Array(binaryString.length);
      for (let j = 0; j < binaryString.length; j++) {
        bytes[j] = binaryString.charCodeAt(j);
      }

      // Determine file extension from MIME type
      const extension = mimeType.split('/')[1] === 'jpeg' ? 'jpg' : mimeType.split('/')[1];
      filename = `${userId}/${timestamp}-${i}-${randomId}.${extension}`;

      console.log("Uploading filename:", filename);
      console.log("File size in bytes:", bytes.length);

      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('book-images')
        .upload(filename, bytes, {
          contentType: mimeType,
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }

      if (!data) {
        throw new Error('Upload succeeded but no data returned');
      }

      console.log('Upload successful:', data.path);

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('book-images')
        .getPublicUrl(filename);

      if (!urlData?.publicUrl) {
        throw new Error('Failed to get public URL');
      }

      urls.push(urlData.publicUrl);
      console.log(`Image ${i + 1} uploaded successfully: ${urlData.publicUrl}`);

    } catch (error) {
      console.error(`Error uploading image ${i + 1}:`, error);

      // Cleanup any partially uploaded file
      try {
        if (filename) {
          await supabase.storage
            .from('book-images')
            .remove([filename]);
        }
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }

      throw new Error(
        `Failed to upload image ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`
      );
    }
  }

  console.log(`Successfully uploaded ${urls.length} images`);
  return urls;
};