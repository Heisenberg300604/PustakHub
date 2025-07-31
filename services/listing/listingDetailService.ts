// src/services/listings/listingDetailService.ts (Updated)
import { supabase } from '@/lib/supabase';

export interface ListingDetail {
  id: string;
  title: string;
  author: string;
  edition: string;
  year?: string;
  price: number;
  primary_image_url: string | null;
  images: string[];
  condition: string;
  description: string;
  additional_info: string | null;
  exam_type: string;
  subject_category: string;
  custom_exam_category?: string;
  custom_subject_category?: string;
  type: 'sell' | 'donation';
  status: string;
  created_at: string;
  donation_preference?: string;
  user_id: string;
  profiles: {
    id: string;
    full_name: string;
    avatar_url: string | null;
    city: string | null;
    phone: string | null;
    instagram: string | null;
    telegram: string | null;
    created_at: string;
  };
}

// Updated Seller interface to match your BookDetail types
export interface Seller {
  name: string;
  city: string;
  phone: string | null;
  instagram: string | null;
  telegram: string | null;
  memberSince: string;
  rating: number;
  totalBooks: number;
  avatar: string;
}

// Updated BookDetail interface to match components
export interface BookDetail {
  id: string;
  title: string;
  author: string;
  edition: string;
  year: string;
  publisher: string;
  price: string;
  originalPrice: string;
  images: string[];
  condition: string;
  description: string;
  examType: string;
  subject: string;
  postedDate: string;
  location: string;
  includeAnswerKey: boolean;
  isNegotiable: boolean;
  isFree: boolean;
  type: 'sell' | 'donation';
  donationPreference?: string;
  seller: Seller;
}

export const getListingDetail = async (id: string): Promise<ListingDetail | null> => {
  try {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        profiles:user_id (
          id,
          name,
          city,
          phone,
          instagram,
          telegram,
          created_at
        )
      `)
      .eq('id', id)
      .eq('status', 'available')
      .single();

    if (error) {
      console.error('Error fetching listing detail:', error);
      return null;
    }

    return data as ListingDetail;
  } catch (error) {
    console.error('Error in getListingDetail:', error);
    return null;
  }
};

// Helper function to format listing data for the UI
export const formatListingForUI = (listing: ListingDetail): BookDetail => {
  // Parse additional_info if it exists
  let additionalInfo = {};
  try {
    if (listing.additional_info) {
      additionalInfo = JSON.parse(listing.additional_info);
    }
  } catch (e) {
    console.warn('Failed to parse additional_info:', e);
  }

  // Format member since date
  const memberSince = new Date(listing.profiles.created_at).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });

  // Format posted date
  const postedDate = new Date(listing.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Calculate days ago
  const daysDiff = Math.floor((Date.now() - new Date(listing.created_at).getTime()) / (1000 * 60 * 60 * 24));
  const postedAgo = daysDiff === 0 ? 'Today' : daysDiff === 1 ? '1 day ago' : `${daysDiff} days ago`;

  return {
    id: listing.id,
    title: listing.title,
    author: listing.author || 'Unknown Author',
    edition: listing.edition || '',
    year: listing.year || '',
    publisher: (additionalInfo as any)?.publisher || '',
    price: listing.price === 0 ? 'Free' : `₹${listing.price}`,
    originalPrice: '', // You might want to add this field to your schema
    images: listing.images.length > 0 ? listing.images : [
      listing.primary_image_url || 'https://via.placeholder.com/600x800?text=No+Image'
    ],
    condition: listing.condition || 'Not specified',
    description: listing.description || 'No description available.',
    examType: listing.exam_type || listing.custom_exam_category || 'General',
    subject: listing.subject_category || listing.custom_subject_category || 'General',
    postedDate: postedAgo,
    location: listing.profiles.city || 'Location not specified',
    includeAnswerKey: (additionalInfo as any)?.include_answer_key || false,
    isNegotiable: listing.type === 'sell' ? (additionalInfo as any)?.negotiable_price || false : false,
    isFree: listing.price === 0,
    type: listing.type,
    donationPreference: listing.donation_preference,
    seller: {
      name: listing.profiles.full_name || 'Anonymous User',
      city: listing.profiles.city || 'City not specified',
      phone: listing.profiles.phone || null,
      instagram: listing.profiles.instagram || null,
      telegram: listing.profiles.telegram || null,
      memberSince: memberSince,
      rating: 0, // Remove seller rating system
      totalBooks: 0, // You might want to calculate this separately
      avatar: listing.profiles.avatar_url || 'https://via.placeholder.com/150x150?text=User',
    },
  };
};