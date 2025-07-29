import { ChevronLeft, Heart, Share2 } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

type HeaderProps = {
  onBack: () => void;
  isWishlisted: boolean;
  toggleWishlist: () => void;
  onShare: () => void;
};

const Header: React.FC<HeaderProps> = ({ onBack, isWishlisted, toggleWishlist, onShare }) => {
  return (
    <View className="flex-row items-center justify-between px-5 py-4 bg-white">
      <TouchableOpacity
        onPress={onBack}
        className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center"
      >
        <ChevronLeft color="#6b7280" size={24} />
      </TouchableOpacity>
      
      <Text className="text-lg font-semibold text-gray-900">Book Details</Text>
      
      <View className="flex-row gap-2">
        <TouchableOpacity
          onPress={toggleWishlist}
          className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center"
        >
          <Heart 
            color={isWishlisted ? "#ef4444" : "#6b7280"} 
            size={20} 
            fill={isWishlisted ? "#ef4444" : "none"}
          />
        </TouchableOpacity>
        
        <TouchableOpacity
          onPress={onShare}
          className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center"
        >
          <Share2 color="#6b7280" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Header;
