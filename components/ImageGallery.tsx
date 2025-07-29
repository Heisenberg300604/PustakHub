import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

type ImageGalleryProps = {
  images: string[];
  currentImageIndex: number;
  onChangeImage: (index: number) => void;
  price: string;
  isFree: boolean;
  condition: string;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images, currentImageIndex, onChangeImage, price, isFree, condition
}) => {
  return (
    <View className="mb-6">
      {/* Main Image */}
      <View className="relative">
        <Image
          source={{ uri: images[currentImageIndex] }}
          className="w-full h-80 bg-gray-100"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Price Badge */}
        <View className="absolute top-4 right-4">
          <View className={`px-4 py-2 rounded-full ${
            isFree ? 'bg-emerald-500' : 'bg-orange-500'
          } shadow-lg`}>
            <Text className="text-white font-bold text-lg">{price}</Text>
          </View>
        </View>

        {/* Condition Badge */}
        <View className="absolute top-4 left-4">
          <View className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <Text className="text-gray-800 font-semibold text-sm">{condition}</Text>
          </View>
        </View>
      </View>

      {/* Thumbnails */}
      {images.length > 1 && (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="mt-4 px-5"
          contentContainerStyle={{ gap: 12 }}
        >
          {images.map((image, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onChangeImage(index)}
              className={`w-16 h-20 rounded-xl overflow-hidden border-2 ${
                currentImageIndex === index ? 'border-orange-500' : 'border-gray-200'
              }`}
            >
              <Image
                source={{ uri: image }}
                className="w-full h-full"
                style={{ resizeMode: 'cover' }}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default ImageGallery;
