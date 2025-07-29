import { Calendar, Instagram, MapPin, MessageCircle, Phone, Shield, Star, User } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Seller } from '../types/BookDetail';

type SellerInfoProps = {
  seller: Seller;
  onContact: (method: 'phone' | 'instagram' | 'telegram') => void;
};

const SellerInfo: React.FC<SellerInfoProps> = ({ seller, onContact }) => {
  return (
    <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50 mb-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Seller Information</Text>
      
      <View className="flex-row items-center mb-4">
        <View className="w-16 h-16 bg-orange-100 rounded-2xl justify-center items-center mr-4">
          {seller.avatar ? (
            <Image source={{ uri: seller.avatar }} className="w-16 h-16 rounded-2xl" />
          ) : (
            <User color="#f97316" size={24} />
          )}
        </View>
        
        <View className="flex-1">
          <Text className="text-lg font-bold text-gray-900 mb-1">{seller.name}</Text>
          <View className="flex-row items-center mb-1">
            <MapPin color="#6b7280" size={14} />
            <Text className="text-sm text-gray-600 ml-1">{seller.city}</Text>
          </View>
          <View className="flex-row items-center">
            <Star color="#fbbf24" size={14} fill="#fbbf24" />
            <Text className="text-sm font-semibold text-gray-900 ml-1">{seller.rating}</Text>
            <Text className="text-sm text-gray-500 ml-1">• {seller.totalBooks} books</Text>
          </View>
        </View>
        
        <View className="items-center">
          <View className="w-10 h-10 bg-green-50 rounded-xl justify-center items-center mb-1">
            <Shield color="#10b981" size={18} />
          </View>
          <Text className="text-xs text-green-600 font-semibold">Verified</Text>
        </View>
      </View>

      <View className="bg-gray-50 rounded-xl p-4 mb-4">
        <View className="flex-row items-center">
          <Calendar color="#6b7280" size={16} />
          <Text className="text-sm text-gray-600 ml-2">Member since {seller.memberSince}</Text>
        </View>
      </View>

      {/* Contact Options */}
      <Text className="text-base font-semibold text-gray-900 mb-3">Contact Seller</Text>
      <View className="flex-row gap-3">
        <TouchableOpacity
          onPress={() => onContact('phone')}
          className="flex-1 bg-green-50 border border-green-200 rounded-xl p-4 items-center"
        >
          <Phone color="#10b981" size={20} />
          <Text className="text-green-700 font-semibold text-sm mt-2">Call</Text>
        </TouchableOpacity>
        
        {seller.instagram && (
          <TouchableOpacity
            onPress={() => onContact('instagram')}
            className="flex-1 bg-pink-50 border border-pink-200 rounded-xl p-4 items-center"
          >
            <Instagram color="#ec4899" size={20} />
            <Text className="text-pink-700 font-semibold text-sm mt-2">Instagram</Text>
          </TouchableOpacity>
        )}
        
        {seller.telegram && (
          <TouchableOpacity
            onPress={() => onContact('telegram')}
            className="flex-1 bg-blue-50 border border-blue-200 rounded-xl p-4 items-center"
          >
            <MessageCircle color="#3b82f6" size={20} />
            <Text className="text-blue-700 font-semibold text-sm mt-2">Telegram</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SellerInfo;
