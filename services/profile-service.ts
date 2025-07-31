// services/profile-service.ts
import { supabase } from '@/lib/supabase';
import { Book, UserInfo } from '@/types/profile';

export class ProfileService {
  static async fetchUserProfile(): Promise<UserInfo | null> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (data) {
        return {
          id: data.id,
          name: data.name || '',
          city: data.city || '',
          phone: data.phone || '',
          instagram: data.instagram || '',
          telegram: data.telegram || '',
          primaryContactType: data.primary_contact_type || 'phone',
          joinDate: new Date(data.created_at).toLocaleDateString('en-US', { 
            month: 'long', 
            year: 'numeric' 
          }),
          avatar: data?.avatar_url || user.user_metadata?.avatar_url || user.user_metadata?.picture
        };
      }

      return null;
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
      return null;
    }
  }

  static async fetchUserBooks(): Promise<Book[]> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching books:', error);
        return [];
      }

      if (data) {
        return data.map(book => ({
          id: book.id,
          title: book.title,
          subject: book.subject,
          price: `₹${book.price}`,
          image: book.image_url || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
          status: book.status
        }));
      }

      return [];
    } catch (error) {
      console.error('Error in fetchUserBooks:', error);
      return [];
    }
  }

  static async updateUserProfile(userInfo: UserInfo): Promise<{ success: boolean; error?: string }> {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return { success: false, error: 'User not authenticated' };

      // Determine primary contact type based on what's provided
      let primaryContactType = userInfo.primaryContactType;
      if (userInfo.phone && userInfo.phone.trim() !== '') {
        primaryContactType = 'phone';
      } else if (userInfo.instagram && userInfo.instagram.trim() !== '') {
        primaryContactType = 'instagram';
      } else if (userInfo.telegram && userInfo.telegram.trim() !== '') {
        primaryContactType = 'telegram';
      }

      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name: userInfo.name.trim(),
          city: userInfo.city.trim(),
          phone: userInfo.phone?.trim() || null,
          instagram: userInfo.instagram?.trim() || null,
          telegram: userInfo.telegram?.trim() || null,
          primary_contact_type: primaryContactType,
          updated_at: new Date().toISOString()
        });

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating profile:', error);
      return { success: false, error: 'Failed to update profile' };
    }
  }

  static validateContactInfo(userInfo: UserInfo): { isValid: boolean; message?: string } {
    const { phone, instagram, telegram } = userInfo;
    const hasPhone = phone && phone.trim() !== '';
    const hasInstagram = instagram && instagram.trim() !== '';
    const hasTelegram = telegram && telegram.trim() !== '';

    if (!hasPhone && !hasInstagram && !hasTelegram) {
      return {
        isValid: false,
        message: 'Please provide at least one contact method (Phone, Instagram, or Telegram) so others can reach you.'
      };
    }

    return { isValid: true };
  }
}