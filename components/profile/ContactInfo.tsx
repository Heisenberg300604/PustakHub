// components/profile/ContactInfo.tsx
import { CustomButton } from '@/components/common/CustomButton';
import { CustomInput } from '@/components/common/CustomInput';
import { UserInfo } from '@/types/profile';
import { Edit3, Instagram, MapPin, MessageCircle, Phone, User } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ContactInfoRow } from './ContactInfoRow';

interface ContactInfoProps {
  userInfo: UserInfo;
  isEditing: boolean;
  loading: boolean;
  onEditPress: () => void;
  onUpdateUserInfo: (updates: Partial<UserInfo>) => void;
  onSave: () => void;
  onCancel: () => void;
}

export const ContactInfo: React.FC<ContactInfoProps> = ({
  userInfo,
  isEditing,
  loading,
  onEditPress,
  onUpdateUserInfo,
  onSave,
  onCancel
}) => {
  return (
    <View className="mx-5 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Contact Information</Text>
        {!isEditing && (
          <TouchableOpacity onPress={onEditPress}>
            <Edit3 color="#6b7280" size={18} />
          </TouchableOpacity>
        )}
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50">
        {isEditing ? (
          <View>
            <CustomInput
              label="Full Name *"
              value={userInfo.name}
              onChangeText={(text) => onUpdateUserInfo({ name: text })}
              icon={User}
              placeholder="Enter your full name"
            />
            
            <CustomInput
              label="City *"
              value={userInfo.city}
              onChangeText={(text) => onUpdateUserInfo({ city: text })}
              icon={MapPin}
              placeholder="Enter your city"
            />
            
            <Text className="text-sm text-gray-600 mb-3 mt-2">
              * Please provide at least one contact method below:
            </Text>
            
            <CustomInput
              label="Phone Number"
              value={userInfo.phone || ''}
              onChangeText={(text) => onUpdateUserInfo({ phone: text })}
              icon={Phone}
              keyboardType="phone-pad"
              placeholder="+91 98765 43210"
            />
            
            <CustomInput
              label="Instagram Handle"
              value={userInfo.instagram || ''}
              onChangeText={(text) => onUpdateUserInfo({ instagram: text })}
              icon={Instagram}
              placeholder="@your_username"
            />
            
            <CustomInput
              label="Telegram Handle"
              value={userInfo.telegram || ''}
              onChangeText={(text) => onUpdateUserInfo({ telegram: text })}
              icon={MessageCircle}
              placeholder="@your_username"
            />

            <View className="flex-row gap-3 mt-4">
              <CustomButton
                title="Cancel"
                onPress={onCancel}
                variant="outline"
                size="md"
                fullWidth
                disabled={loading}
              />
              <CustomButton
                title={loading ? "Saving..." : "Save Changes"}
                onPress={onSave}
                variant="primary"
                size="md"
                fullWidth
                disabled={loading}
              />
            </View>
          </View>
        ) : (
          <View>
            {/* Show only provided contact methods */}
            {userInfo.phone && (
              <ContactInfoRow 
                icon={Phone} 
                label="Phone" 
                value={userInfo.phone}
                isPrimary={userInfo.primaryContactType === 'phone'}
              />
            )}
            {userInfo.instagram && (
              <ContactInfoRow 
                icon={Instagram} 
                label="Instagram" 
                value={userInfo.instagram}
                isPrimary={userInfo.primaryContactType === 'instagram'}
              />
            )}
            {userInfo.telegram && (
              <ContactInfoRow 
                icon={MessageCircle} 
                label="Telegram" 
                value={userInfo.telegram}
                isPrimary={userInfo.primaryContactType === 'telegram'}
                isLast={true}
              />
            )}
            
            {!userInfo.phone && !userInfo.instagram && !userInfo.telegram && (
              <View className="py-8 items-center">
                <Text className="text-gray-500 text-center">
                  No contact information provided.{'\n'}
                  Tap edit to add your contact details.
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
    </View>
  );
};