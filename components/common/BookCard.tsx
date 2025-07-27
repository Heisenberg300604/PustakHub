import { ShoppingCart, Star } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Book } from '../../types/books';
import { CustomButton } from './CustomButton';

interface BookCardProps {
  book: Book;
  onPress?: () => void;
  onBuyPress?: () => void;
}

export const BookCard: React.FC<BookCardProps> = ({ book, onPress, onBuyPress }) => {
  return (
    <TouchableOpacity
      className="w-[48%] mb-5 bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden"
      onPress={onPress}
      activeOpacity={0.9}
    >
      {/* Book Image */}
      <View className="bg-gray-100 relative" style={{ aspectRatio: 3/4 }}>
        <Image
          source={{ uri: book.image }}
          className="w-full h-full"
          style={{ resizeMode: 'cover' }}
        />
        
        {/* Price Badge */}
        <View className="absolute top-3 right-3">
          <View
            className={`px-3 py-1.5 rounded-full ${
              book.price === 'Free' ? 'bg-emerald-500' : 'bg-orange-500'
            }`}
          >
            <Text className="text-white text-xs font-bold">{book.price}</Text>
          </View>
        </View>
      </View>

      {/* Book Info */}
      <View className="p-4">
        <Text className="text-sm font-bold text-gray-900 mb-1 leading-5" numberOfLines={2}>
          {book.title}
        </Text>
        <Text className="text-xs text-gray-500 mb-2">by {book.seller}</Text>
        
        {/* Rating */}
        <View className="flex-row items-center mb-3 gap-1">
          <Star color="#fbbf24" size={12} fill="#fbbf24" />
          <Text className="text-xs text-gray-900 font-semibold">
            {book.rating || 4.5}
          </Text>
          <Text className="text-xs text-gray-500">
            ({book.reviewCount || Math.floor(Math.random() * 500) + 50})
          </Text>
        </View>
        
        <View className="flex-row justify-between items-center">
          <View className="bg-orange-50 rounded-lg px-2.5 py-1.5 border border-orange-100">
            <Text className="text-xs text-orange-600 font-semibold">{book.examType}</Text>
          </View>
          
          <CustomButton
            title={book.price === 'Free' ? 'Get' : 'Buy'}
            variant={book.price === 'Free' ? 'success' : 'primary'}
            size="sm"
            icon={ShoppingCart}
            onPress={onBuyPress || (() => {})}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};