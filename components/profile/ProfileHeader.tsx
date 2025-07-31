// components/profile/ProfileHeader.tsx
import { UserInfo } from '@/types/profile';
import { Calendar, Edit3, MapPin, User } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ProfileHeaderProps {
  userInfo: UserInfo;
  onEditPress: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ userInfo, onEditPress }) => {
  return (
    <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50 mb-6">
      <View className="flex-row items-start">
        {/* Avatar */}
        <View className="relative mr-4">
          <View className="w-20 h-20 bg-orange-100 rounded-2xl justify-center items-center">
            {userInfo.avatar ? (
              <Image source={{ uri: userInfo.avatar }} className="w-20 h-20 rounded-2xl" />
            ) : (
              <User color="#f97316" size={32} />
            )}
          </View>
          <TouchableOpacity className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full justify-center items-center shadow-lg shadow-orange-500/25">
            <Edit3 color="white" size={14} />
          </TouchableOpacity>
        </View>
        
        {/* User Info */}
        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-900 mb-1">
            {userInfo.name || 'User Name'}
          </Text>
          <View className="flex-row items-center mb-2">
            <MapPin color="#6b7280" size={16} />
            <Text className="text-base text-gray-600 ml-1">
              {userInfo.city || 'City'}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Calendar color="#6b7280" size={16} />
            <Text className="text-sm text-gray-500 ml-1">
              Joined {userInfo.joinDate || 'Recently'}
            </Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity 
          className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center"
          onPress={onEditPress}
        >
          <Edit3 color="#6b7280" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );
};