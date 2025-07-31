import { BookCard } from '@/components/common/BookCard';
import { FilterChip } from '@/components/common/FilterChip';
import { supabase } from '@/lib/supabase';
import { getListings } from '@/services/listing/listingService';
import { router } from 'expo-router';
import { Search } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Updated Book interface to match your database structure
interface DatabaseListing {
  id: string;
  title: string;
  author: string;
  edition: string;
  exam_type: string;
  subject_category: string;
  condition: string;
  price: number;
  description: string;
  primary_image_url: string | null;
  images: string[];
  user_id: string;
  type: 'sell' | 'donation';
  status: string;
  created_at: string;
  profiles?: {
    name: string;
    avatar_url: string | null;
  };
}

// Transform database listing to match BookCard component expectations
interface Book {
  id: string;
  title: string;
  image: string;
  price: string;
  seller: string;
  examType: string;
  // Remove rating and reviewCount as requested
}

const BrowseScreen: React.FC = () => {
  const [userName, setUserName] = useState('User');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const filters = ['All', 'JEE', 'NEET', 'CAT', 'UPSC', 'Free'];

  const navigateToBookDetail = (id: string) => {
    router.push(`/books/${id}`);
    console.log('Navigate to book detail:', id);
  };

  // Transform database listing to Book format
  const transformListing = (listing: DatabaseListing): Book => {
    return {
      id: listing.id,
      title: listing.title,
      image: listing.primary_image_url || 'https://via.placeholder.com/200x280?text=No+Image',
      price: listing.price === 0 ? 'Free' : `₹${listing.price}`,
      seller: listing.profiles?.name || 'Unknown User',
      examType: listing.exam_type,
    };
  };

  // Fetch listings from database
  const fetchListings = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const listings = await getListings(); // This gets both sell and donation listings
      
      if (listings) {
        const transformedBooks = listings.map(transformListing);
        setBooks(transformedBooks);
      }
    } catch (err) {
      console.error('Error fetching listings:', err);
      setError('Failed to load books. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Filter books based on selected filter
  const filteredBooks = books.filter(book => {
    if (selectedFilter === 'All') return true;
    if (selectedFilter === 'Free') return book.price === 'Free';
    return book.examType === selectedFilter;
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserName(user?.user_metadata?.name || user?.user_metadata?.name || 'User');
    };
    
    fetchUser();
    fetchListings();
  }, []);

  // Refresh function for pull-to-refresh if needed
  const refreshListings = () => {
    fetchListings();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="mb-6 px-5 pt-4">
          <Text className="text-2xl font-bold text-gray-900 mb-4">
            Welcome Back, {userName}!
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

        {/* Filter Chips */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20, paddingRight: 40, paddingVertical: 3 }}
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

        {/* Loading State */}
        {loading && (
          <View className="flex-1 justify-center items-center py-20">
            <ActivityIndicator size="large" color="#3b82f6" />
            <Text className="text-gray-600 mt-2">Loading books...</Text>
          </View>
        )}

        {/* Error State */}
        {error && !loading && (
          <View className="flex-1 justify-center items-center py-20 px-5">
            <Text className="text-red-500 text-center mb-4">{error}</Text>
            <Text 
              className="text-blue-500 underline"
              onPress={refreshListings}
            >
              Tap to retry
            </Text>
          </View>
        )}

        {/* Empty State */}
        {!loading && !error && filteredBooks.length === 0 && (
          <View className="flex-1 justify-center items-center py-20">
            <Text className="text-gray-600 text-center">
              {selectedFilter === 'All' ? 'No books available yet.' : `No books found for ${selectedFilter}.`}
            </Text>
          </View>
        )}

        {/* Books Grid */}
        {!loading && !error && filteredBooks.length > 0 && (
          <View className="flex-row flex-wrap justify-between px-5">
            {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => navigateToBookDetail(book.id)}
                onBuyPress={() => navigateToBookDetail(book.id)}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default BrowseScreen;