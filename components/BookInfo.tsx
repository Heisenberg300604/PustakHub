import { Clock, MapPin } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

type BookInfoProps = {
  title: string;
  author: string;
  edition: string;
  originalPrice?: string;
  price: string;
  examType: string;
  subject: string;
  includeAnswerKey: boolean;
  isNegotiable: boolean;
  location: string;
  postedDate: string;
};

const BookInfo: React.FC<BookInfoProps> = (props) => {
  const discount = props.originalPrice
    ? Math.round(((parseInt(props.originalPrice.replace('₹', '')) - parseInt(props.price.replace('₹', ''))) /
      parseInt(props.originalPrice.replace('₹', ''))) * 100)
    : 0;

  return (
    <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50 mb-6">
      {/* Title & Price */}
      <View className="flex-row justify-between items-start mb-4">
        <View className="flex-1 mr-4">
          <Text className="text-2xl font-bold text-gray-900 mb-2" numberOfLines={2}>{props.title}</Text>
          <Text className="text-lg text-gray-600 mb-1">by {props.author}</Text>
          <Text className="text-base text-gray-500">{props.edition}</Text>
        </View>
        
        {props.originalPrice && (
          <View className="items-end">
            <Text className="text-sm text-gray-400 line-through">{props.originalPrice}</Text>
            <View className="bg-green-100 px-2 py-1 rounded-lg mt-1">
              <Text className="text-green-700 font-semibold text-xs">{discount}% OFF</Text>
            </View>
          </View>
        )}
      </View>

      {/* Rating and Reviews */}
      <View className="flex-row items-center mb-4">
        
        
        <View className="flex-row items-center">
          <Clock color="#6b7280" size={16} />
          <Text className="text-sm text-gray-500 ml-1">{props.postedDate}</Text>
        </View>
      </View>

      {/* Tags */}
      <View className="flex-row flex-wrap gap-2 mb-4">
        <View className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-1.5">
          <Text className="text-orange-600 font-semibold text-sm">{props.examType}</Text>
        </View>
        <View className="bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
          <Text className="text-blue-600 font-semibold text-sm">{props.subject}</Text>
        </View>
        {props.includeAnswerKey && (
          <View className="bg-purple-50 border border-purple-200 rounded-lg px-3 py-1.5">
            <Text className="text-purple-600 font-semibold text-sm">Includes Solutions</Text>
          </View>
        )}
        {props.isNegotiable && (
          <View className="bg-green-50 border border-green-200 rounded-lg px-3 py-1.5">
            <Text className="text-green-600 font-semibold text-sm">Negotiable</Text>
          </View>
        )}
      </View>

      {/* Location */}
      <View className="flex-row items-center">
        <MapPin color="#6b7280" size={16} />
        <Text className="text-base text-gray-600 ml-2">{props.location}</Text>
      </View>
    </View>
  );
};

export default BookInfo;
