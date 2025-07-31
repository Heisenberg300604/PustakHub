// components/profile/MyBooks.tsx
import { Book } from '@/types/profile';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface MyBooksProps {
  books: Book[];
  onBookPress: (bookId: number) => void;
  onViewAllPress: () => void;
}

export const MyBooks: React.FC<MyBooksProps> = ({ books, onBookPress, onViewAllPress }) => {
  return (
    <View className="mx-5 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">My Books</Text>
        <TouchableOpacity onPress={onViewAllPress}>
          <Text className="text-base text-orange-500 font-semibold">View All</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-2xl p-4 shadow-lg shadow-gray-200/50">
        {books.length > 0 ? (
          books.slice(0, 3).map((book, index) => (
            <TouchableOpacity 
              key={book.id} 
              className={`flex-row items-center py-4 ${index !== books.slice(0, 3).length - 1 ? 'border-b border-gray-100' : ''}`}
              onPress={() => onBookPress(book.id)}
            >
              <Image 
                source={{ uri: book.image }}
                className="w-16 h-20 rounded-xl bg-gray-100"
              />
              <View className="flex-1 ml-4">
                <Text className="text-base font-semibold text-gray-900 mb-1" numberOfLines={2}>
                  {book.title}
                </Text>
                <Text className="text-sm text-gray-600 mb-2">
                  {book.subject}
                </Text>
                <View className="flex-row items-center justify-between">
                  <Text className="text-lg font-bold text-orange-500">{book.price}</Text>
                  <View className={`px-3 py-1 rounded-full ${
                    book.status === 'Active' 
                      ? 'bg-emerald-50 border border-emerald-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}>
                    <Text className={`text-xs font-semibold ${
                      book.status === 'Active' ? 'text-emerald-600' : 'text-gray-600'
                    }`}>
                      {book.status}
                    </Text>
                  </View>
                </View>
              </View>
              <ChevronRight color="#9ca3af" size={20} />
            </TouchableOpacity>
          ))
        ) : (
          <View className="py-8 items-center">
            <Text className="text-gray-500 text-center">
              No books listed yet.{'\n'}
              Start by adding your first book!
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};