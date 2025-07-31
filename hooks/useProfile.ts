// hooks/useProfile.ts
import { ProfileService } from '@/services/profile-service';
import { Book, UserInfo } from '@/types/profile';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';

export const useProfile = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    id: '',
    name: '',
    city: '',
    phone: '',
    instagram: '',
    telegram: '',
    primaryContactType: 'phone',
    joinDate: ''
  });

  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    const [profile, books] = await Promise.all([
      ProfileService.fetchUserProfile(),
      ProfileService.fetchUserBooks()
    ]);

    if (profile) {
      setUserInfo(profile);
    }
    setUserBooks(books);
  };

  const saveProfile = async () => {
    const validation = ProfileService.validateContactInfo(userInfo);
    
    if (!validation.isValid) {
      Alert.alert('Contact Information Required', validation.message);
      return;
    }

    setLoading(true);
    
    try {
      const result = await ProfileService.updateUserProfile(userInfo);
      
      if (result.success) {
        setIsEditing(false);
        Alert.alert('Success', 'Profile updated successfully!');
        // Refresh profile data
        const updatedProfile = await ProfileService.fetchUserProfile();
        if (updatedProfile) {
          setUserInfo(updatedProfile);
        }
      } else {
        Alert.alert('Error', result.error || 'Failed to update profile. Please try again.');
      }
    } catch (error) {
      console.error('Error in saveProfile:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = (updates: Partial<UserInfo>) => {
    setUserInfo(prev => ({ ...prev, ...updates }));
  };

  return {
    userInfo,
    userBooks,
    loading,
    isEditing,
    setIsEditing,
    updateUserInfo,
    saveProfile,
    refreshData: loadProfileData
  };
};