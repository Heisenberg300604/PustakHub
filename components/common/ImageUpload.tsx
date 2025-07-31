import { Camera, X } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Props {
  onPress: () => void;
  onRemove?: () => void;
  isMain?: boolean;
  variant?: 'sell' | 'donate';
  imageUri?: string | null;
}

export const ImageUpload: React.FC<Props> = ({ 
  onPress, 
  onRemove,
  isMain = false, 
  variant = 'sell',
  imageUri = null
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
      <View className="relative">
        <TouchableOpacity
          className={`h-40 ${colorScheme.bg} border-2 ${colorScheme.border} border-dashed rounded-2xl justify-center items-center overflow-hidden`}
          onPress={onPress}
          activeOpacity={0.7}
        >
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              className="w-full h-full"
              style={{ borderRadius: 16 }}
              resizeMode="cover"
            />
          ) : (
            <>
              <Camera color={colorScheme.icon} size={32} />
              <Text className={`${colorScheme.text} text-base font-semibold mt-2`}>
                Add Main Photo
              </Text>
              <Text className={`${colorScheme.subtext} text-xs mt-1`}>Required</Text>
            </>
          )}
        </TouchableOpacity>
        
        {/* Remove button for main image */}
        {imageUri && onRemove && (
          <TouchableOpacity
            className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full justify-center items-center shadow-lg"
            onPress={onRemove}
            activeOpacity={0.7}
          >
            <X color="white" size={16} />
          </TouchableOpacity>
        )}
      </View>
    );
  }

  return (
    <View className="relative flex-1">
      <TouchableOpacity
        className="h-20 bg-gray-50 border border-gray-200 border-dashed rounded-xl justify-center items-center overflow-hidden"
        onPress={onPress}
        activeOpacity={0.7}
      >
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            className="w-full h-full"
            resizeMode="cover"
            style={{ borderRadius: 12 }}
          />
        ) : (
          <Camera color="#9ca3af" size={20} />
        )}
      </TouchableOpacity>
      
      {/* Remove button for additional images */}
      {imageUri && onRemove && (
        <TouchableOpacity
          className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full justify-center items-center shadow-lg"
          onPress={onRemove}
          activeOpacity={0.7}
        >
          <X color="white" size={12} />
        </TouchableOpacity>
      )}
    </View>
  );
};