// src/services/listings/uploadService.ts
import { supabase } from '@/lib/supabase';

export const uploadImages = async (images: (string | null)[], userId: string): Promise<string[]> => {
  const urls: string[] = [];

  // Filter out null images before processing
  const validImages = images.filter((img): img is string => img !== null);

  if (validImages.length === 0) {
    throw new Error('No valid images to upload');
  }

  for (let i = 0; i < validImages.length; i++) {
    const img = validImages[i];
    
    // Generate unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2);
    const filename = `${userId}/${timestamp}-${i}-${randomId}.jpg`;

    try {
      console.log(`Uploading image ${i + 1}/${validImages.length}: ${filename}`);
      
      // Fetch the image from the local URI
      const response = await fetch(img);
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status} ${response.statusText}`);
      }
      
      // Convert to blob
      const blob = await response.blob();
      
      // Check blob size (optional - add size limit if needed)
      console.log(`Image blob size: ${blob.size} bytes`);
      
      // Upload to Supabase Storage
      const { data, error } = await supabase.storage
        .from('book-images')
        .upload(filename, blob, {
          contentType: 'image/jpeg',
          upsert: false, // Don't overwrite if exists
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
      
      // Clean up any partially uploaded files
      try {
        await supabase.storage
          .from('book-images')
          .remove([filename]);
      } catch (cleanupError) {
        console.error('Cleanup error:', cleanupError);
      }
      
      throw new Error(`Failed to upload image ${i + 1}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  console.log(`Successfully uploaded ${urls.length} images`);
  return urls;
};

// Helper function to validate image URI
export const validateImageUri = (uri: string): boolean => {
  if (!uri) return false;
  
  // Check if it's a valid URI format
  try {
    new URL(uri);
    return true;
  } catch {
    // For local file URIs on mobile, URL constructor might fail
    // Check for common mobile file URI patterns
    return uri.startsWith('file://') || uri.startsWith('content://') || uri.includes('file:///');
  }
};

// Helper function to get image file info
export const getImageInfo = async (uri: string) => {
  try {
    const response = await fetch(uri);
    const blob = await response.blob();
    
    return {
      size: blob.size,
      type: blob.type,
      uri: uri
    };
  } catch (error) {
    console.error('Error getting image info:', error);
    return null;
  }
};