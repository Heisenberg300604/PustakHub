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

export interface DonationFormData {
  title: string;
  author: string;
  edition: string;
  publisher?: string;
  selectedExam: string;
  selectedCategory: string;
  selectedCondition: string;
  description: string;
  message?: string;
  includeAnswerKey: boolean;
  allowPickup: boolean;
  images: (string | null)[]; // Keep as is - will be filtered in uploadImages
}

export const createListing = async (formData: ListingFormData) => {
  try {
    // Get logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Not logged in');

    // Upload images (will filter out null values internally)
    const imageUrls = await uploadImages(formData.images, user.id);

    // Insert into DB - matching your actual schema
    const { error } = await supabase.from('listings').insert({
      type: 'sell', 
      title: formData.title,
      author: formData.author,
      edition: formData.edition,
      // Map to your schema fields
      exam_type: formData.selectedExam, // This matches your exam_type field
      subject_category: formData.selectedCategory, // This matches your subject_category field
      condition: formData.selectedCondition,
      price: formData.price, // Already a number from form validation
      description: formData.description,
      additional_info: JSON.stringify({
        publisher: formData.includeAnswerKey,
        allow_pickup: formData.negotiablePrice
      }),
      primary_image_url: imageUrls[0] || null, // First image as primary
      images: imageUrls, // All images array
      user_id: user.id,
      status: 'available',
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

export const createDonation = async (formData: DonationFormData) => {
  try {
    // Get logged-in user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('Not logged in');

    // Upload images (will filter out null values internally)
    const imageUrls = await uploadImages(formData.images, user.id);

    // Insert into DB - matching your actual schema
    const { error } = await supabase.from('listings').insert({
      type: 'donation', // Mark as donation
      title: formData.title,
      author: formData.author,
      edition: formData.edition,
      // Map to your schema fields
      exam_type: formData.selectedExam, // This matches your exam_type field
      subject_category: formData.selectedCategory, // This matches your subject_category field
      condition: formData.selectedCondition,
      price: 0, // Donations are free
      description: formData.description,
      // Use additional_info for donation-specific details
      additional_info: JSON.stringify({
        publisher: formData.publisher,
        motivational_message: formData.message,
        allow_pickup: formData.allowPickup
      }),
      // Use donation_preference for pickup preference
      donation_preference: formData.allowPickup ? 'pickup_allowed' : 'delivery_only',
      include_answer_key: formData.includeAnswerKey,
      negotiable_price: false, // Not applicable for donations
      primary_image_url: imageUrls[0] || null, // First image as primary
      images: imageUrls, // All images array
      user_id: user.id,
      status: 'available',
    });

    if (error) throw error;
  } catch (error) {
    console.error('Error creating donation:', error);
    throw error;
  }
};

// Utility functions to fetch listings
export const getListings = async (type?: 'sale' | 'donation') => {
  try {
    let query = supabase
      .from('listings')
      .select(`
        *,
        profiles:user_id (
          full_name,
          avatar_url
        )
      `)
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

export const getUserListings = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user listings:', error);
    throw error;
  }
};