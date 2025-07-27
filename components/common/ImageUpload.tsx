import { Camera } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface ImageUploadProps {
  onPress: () => void;
  isMain?: boolean;
  variant?: 'sell' | 'donate';
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onPress, 
  isMain = false, 
  variant = 'sell' 
}) => {
  const colorScheme = variant === 'donate' ? {
    bg: 'bg-emerald-50',
    border: 'border-emerald-200',
    icon: '#10b981',
    text: 'text-emerald-700',
    subtext: 'text-emerald-600'
  } : {
    bg: 'bg-orange-50',
    border: 'border-orange-200',
    icon: '#f97316',
    text: 'text-orange-700',
    subtext: 'text-orange-600'
  };

  if (isMain) {
    return (
      <TouchableOpacity
        className={`h-40 ${colorScheme.bg} border-2 ${colorScheme.border} border-dashed rounded-2xl justify-center items-center`}
        onPress={onPress}
      >
        <Camera color={colorScheme.icon} size={32} />
        <Text className={`${colorScheme.text} text-base font-semibold mt-2`}>
          Add Main Photo
        </Text>
        <Text className={`${colorScheme.subtext} text-xs mt-1`}>Required</Text>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      className="flex-1 h-20 bg-gray-50 border border-gray-200 border-dashed rounded-xl justify-center items-center"
      onPress={onPress}
    >
      <Camera color="#9ca3af" size={20} />
    </TouchableOpacity>
  );
};