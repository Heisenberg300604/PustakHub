// components/profile/ContactInfoRow.tsx
import { ContactInfoRowProps } from '@/types/profile';
import React from 'react';
import { Text, View } from 'react-native';

export const ContactInfoRow: React.FC<ContactInfoRowProps> = ({ 
  icon: Icon, 
  label, 
  value, 
  isPrimary = false, 
  isLast = false 
}) => {
  return (
    <View className={`flex-row items-center py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <View className={`w-10 h-10 rounded-xl justify-center items-center mr-3 ${
        isPrimary ? 'bg-orange-100' : 'bg-gray-50'
      }`}>
        <Icon color={isPrimary ? "#f97316" : "#6b7280"} size={18} />
      </View>
      <View className="flex-1">
        <View className="flex-row items-center">
          <Text className="text-sm text-gray-500">{label}</Text>
          {isPrimary && (
            <View className="ml-2 bg-orange-100 px-2 py-1 rounded-full">
              <Text className="text-xs text-orange-600 font-semibold">Primary</Text>
            </View>
          )}
        </View>
        <Text className="text-base text-gray-900 font-medium mt-1">{value}</Text>
      </View>
    </View>
  );
};