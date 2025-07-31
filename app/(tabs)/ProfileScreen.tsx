// (tabs)/ProfileScreen.tsx
import React from 'react';
import { ScrollView, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Hooks
import { useProfile } from '@/hooks/useProfile';

// Components
import { ContactInfo } from '@/components/profile/ContactInfo';
import { MyBooks } from '@/components/profile/MyBooks';
import { ProfileHeader } from '@/components/profile/ProfileHeader';
import { SettingsMenu } from '@/components/profile/SettingsMenu';

const ProfileScreen: React.FC = () => {
  const {
    userInfo,
    userBooks,
    loading,
    isEditing,
    setIsEditing,
    updateUserInfo,
    saveProfile
  } = useProfile();

  const handleBookPress = (bookId: number) => {
    // Navigate to book detail/edit screen
    console.log('Navigate to book detail:', bookId);
    // router.push(`/book/${bookId}`);
  };

  const handleViewAllBooks = () => {
    // Navigate to all books screen
    console.log('Navigate to all books');
    // router.push('/my-books');
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="pt-4">
          <ProfileHeader
            userInfo={userInfo}
            onEditPress={() => setIsEditing(!isEditing)}
          />
          
          <ContactInfo
            userInfo={userInfo}
            isEditing={isEditing}
            loading={loading}
            onEditPress={() => setIsEditing(true)}
            onUpdateUserInfo={updateUserInfo}
            onSave={saveProfile}
            onCancel={() => setIsEditing(false)}
          />
          
          <MyBooks
            books={userBooks}
            onBookPress={handleBookPress}
            onViewAllPress={handleViewAllBooks}
          />
          
          <SettingsMenu />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;