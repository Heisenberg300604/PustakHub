// SellerInfo.tsx (Fixed)
import { Calendar, Instagram, MapPin, MessageCircle, Phone, User } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface Seller {
  name: string;
  city: string;
  phone: string | null;
  instagram: string | null;
  telegram: string | null;
  memberSince: string;
  rating: number;
  totalBooks: number;
  avatar: string;
}

type SellerInfoProps = {
  seller: Seller;
  onContact: (method: 'phone' | 'instagram' | 'telegram') => void;
};

const SellerInfo: React.FC<SellerInfoProps> = ({ seller, onContact }) => {
  // Get available contact methods
  const getAvailableContactMethods = () => {
    const methods = [];
    
    if (seller.phone) {
      methods.push({
        type: 'phone' as const,
        label: 'Call',
        icon: Phone,
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        iconColor: '#10b981'
      });
    }
    
    if (seller.instagram) {
      methods.push({
        type: 'instagram' as const,
        label: 'Instagram',
        icon: Instagram,
        bgColor: 'bg-pink-50',
        borderColor: 'border-pink-200',
        textColor: 'text-pink-700',
        iconColor: '#ec4899'
      });
    }
    
    if (seller.telegram) {
      methods.push({
        type: 'telegram' as const,
        label: 'Telegram',
        icon: MessageCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-700',
        iconColor: '#3b82f6'
      });
    }
    
    return methods;
  };

  const contactMethods = getAvailableContactMethods();

  return (
    <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50 mb-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Seller Information</Text>
      
      <View className="flex-row items-center mb-4">
        <View className="w-16 h-16 bg-orange-100 rounded-2xl justify-center items-center mr-4">
          {seller.avatar && seller.avatar !== 'https://via.placeholder.com/150x150?text=User' ? (
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
          {/* Removed rating display as requested */}
        </View>
      </View>

      <View className="bg-gray-50 rounded-xl p-4 mb-4">
        <View className="flex-row items-center">
          <Calendar color="#6b7280" size={16} />
          <Text className="text-sm text-gray-600 ml-2">Member since {seller.memberSince}</Text>
        </View>
      </View>

      {/* Contact Options - Only show if methods are available */}
      {contactMethods.length > 0 ? (
        <>
          <Text className="text-base font-semibold text-gray-900 mb-3">Contact Seller</Text>
          <View className="flex-row gap-3">
            {contactMethods.map((method) => {
              const IconComponent = method.icon;
              return (
                <TouchableOpacity
                  key={method.type}
                  onPress={() => onContact(method.type)}
                  className={`flex-1 ${method.bgColor} border ${method.borderColor} rounded-xl p-4 items-center`}
                >
                  <IconComponent color={method.iconColor} size={20} />
                  <Text className={`${method.textColor} font-semibold text-sm mt-2`}>
                    {method.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </>
      ) : (
        /* No Contact Methods Available */
        <View className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <View className="flex-row items-center justify-center">
            <User color="#f59e0b" size={20} />
            <View className="ml-3 flex-1">
              <Text className="text-yellow-800 font-semibold text-sm">
                Contact information not available
              </Text>
              <Text className="text-yellow-700 text-xs mt-1">
                This seller hasn't provided contact details yet.
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default SellerInfo;