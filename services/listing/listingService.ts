// src/services/listings/listingService.ts
import { supabase } from '@/lib/supabase';
import { uploadImages } from './uploadService';

export interface ListingFormData {
  title: string;
  author: string;
  edition: string;
  selectedExam: string;
  selectedCategory: string;
  selectedCondition: string;
  price: number;
  description: string;
  includeAnswerKey: boolean;
  negotiablePrice: boolean;
  images: (string | null)[]; // Keep as is - will be filtered in uploadImages
}

export const createListing = async (formData: ListingFormData) => {
  try {
    // Get logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Not logged in');

    // Upload images (will filter out null values internally)
    const imageUrls = await uploadImages(formData.images, user.id);

    // Insert into DB
    const { error } = await supabase.from('listings').insert({
      title: formData.title,
      author: formData.author,
      edition: formData.edition,
      exam_type: formData.selectedExam,
      subject_category: formData.selectedCategory,
      condition: formData.selectedCondition,
      price: formData.price, // Already a number from form validation
      description: formData.description,
      include_answer_key: formData.includeAnswerKey,
      negotiable_price: formData.negotiablePrice,
      images: imageUrls,
      user_id: user.id,
      status: 'available',
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};