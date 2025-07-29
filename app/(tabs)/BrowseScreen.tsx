import { BookCard } from '@/components/common/BookCard';
import { FilterChip } from '@/components/common/FilterChip';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Book } from '../../types/books';

// Mock data
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'HC Verma Physics Part 1',
    image: 'https://m.media-amazon.com/images/I/41CY8KjPVQL._UF1000,1000_QL80_.jpg',
    price: '₹450',
    seller: 'Rahul Kumar',
    examType: 'JEE',
    rating: 4.8,
    reviewCount: 245
  },
  {
    id: '2',
    title: 'NCERT Chemistry Class 12',
    image: 'https://m.media-amazon.com/images/I/41CY8KjPVQL._UF1000,1000_QL80_.jpg',
    price: 'Free',
    seller: 'Priya Singh',
    examType: 'NEET',
    rating: 4.6,
    reviewCount: 189
  },
  {
    id: '3',
    title: 'NCERT Chemistry Class 12',
    image: 'https://m.media-amazon.com/images/I/41CY8KjPVQL._UF1000,1000_QL80_.jpg',
    price: 'Free',
    seller: 'Priya Singh',
    examType: 'NEET',
    rating: 4.6,
    reviewCount: 189
  },
  // Add more books as needed
];

const BrowseScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const filters = ['All', 'JEE', 'NEET', 'CAT', 'UPSC', 'Free'];

  const navigateToBookDetail = (id: string) => {
    // For React Native with Expo Router:
    router.push(`/books/${id}`);
  
    
    console.log('Navigate to book detail:', id);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 px-5 pt-4">
          <Text className="text-3xl font-bold text-gray-900 mb-4">
            Welcome Back, User
          </Text>
          
          {/* Search Bar */}
          <View className="relative">
            <View className="h-12 rounded-xl flex-row items-center px-4 bg-white border border-gray-200 shadow-sm">
              <Search color="#9ca3af" size={20} className="mr-3" />
              <TextInput
                placeholder="Search books, exams, authors..."
                className="flex-1 text-gray-900 text-base"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>
        </View>

         <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingRight: 40 , paddingVertical: 3 }}
            className="flex-grow-0"
          >
            <View className="flex-row gap-2">
              {filters.map((filter) => (
                <FilterChip
                  key={filter}
                  label={filter}
                  isSelected={selectedFilter === filter}
                  onPress={() => setSelectedFilter(filter)}
                />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Books Grid */}
        <View className="flex-row flex-wrap justify-between px-5">
          {mockBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onPress={() => navigateToBookDetail(book.id)}
              onBuyPress={() => navigateToBookDetail(book.id)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default BrowseScreen;