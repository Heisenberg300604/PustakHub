import { LinearGradient } from 'expo-linear-gradient';
import { Search, ShoppingCart, Star } from 'lucide-react-native';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data interface
interface Book {
  id: string;
  title: string;
  image: string;
  price: string;
  seller: string;
  examType: string;
}

// Mock books data - replace with your actual data
const mockBooks: Book[] = [
  {
    id: '1',
    title: 'HC Verma Physics Part 1',
    image: 'https://via.placeholder.com/200x300',
    price: '₹450',
    seller: 'Rahul Kumar',
    examType: 'JEE'
  },
  {
    id: '2',
    title: 'NCERT Chemistry Class 12',
    image: 'https://via.placeholder.com/200x300',
    price: 'Free',
    seller: 'Priya Singh',
    examType: 'NEET'
  },
  // Add more books as needed
];

const BrowseScreen: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f8fafc]" edges={['top', 'left', 'right']}>
      <LinearGradient 
        colors={['#f8fafc', '#fff7ed', '#fef3c7']}
        className="flex-1"
      >
        <ScrollView 
          contentContainerStyle={{ paddingBottom: 100 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Simple Header */}
          <View className="mb-5 px-4 pt-4">
            <Text className="text-2xl font-bold text-[#1e293b] mb-4">Welcome Back, User</Text>
            {/* Enhanced Search Bar */}
            <View className="mx-0">
              <View 
                className="h-14 rounded-[18px] flex-row items-center px-5 bg-white border-2 border-[#e2e8f0]"
                style={{
                  shadowColor: '#f97316',
                  shadowOffset: { width: 0, height: 6 },
                  shadowOpacity: 0.15,
                  shadowRadius: 15,
                  elevation: 8,
                }}
              >
                <Search color="#64748b" size={20} className="mr-3" />
                <Text className="flex-1 text-[#64748b] text-base font-medium">Search books, exams, authors...</Text>
              </View>
            </View>
          </View>

          {/* Enhanced Filter Chips */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-4"
            contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
          >
            {['All', 'JEE', 'NEET', 'CAT', 'UPSC', 'Free'].map((filter, index) => (
              <TouchableOpacity
                key={filter}
                className="rounded-3 overflow-hidden"
              >
                {filter === 'All' ? (
                  <LinearGradient
                    colors={['#f97316', '#fb923c']}
                    className="px-4 py-2.5 rounded-3"
                  >
                    <Text className="text-white text-sm font-semibold">{filter}</Text>
                  </LinearGradient>
                ) : (
                  <View 
                    className="bg-white px-4 py-2.5 rounded-3"
                    style={{
                      shadowColor: '#000',
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.05,
                      shadowRadius: 4,
                      elevation: 1,
                    }}
                  >
                    <Text className="text-[#64748b] text-sm font-medium">{filter}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Enhanced Books Grid */}
          <View className="flex-row flex-wrap justify-between px-4">
            {mockBooks.map((book, index) => (
              <TouchableOpacity 
                key={book.id} 
                className="w-[48%] mb-5 rounded-5 overflow-hidden"
                activeOpacity={0.9}
              >
                <LinearGradient
                  colors={['#ffffff', '#f8fafc']}
                  className="rounded-5"
                  style={{
                    shadowColor: '#f97316',
                    shadowOffset: { width: 0, height: 8 },
                    shadowOpacity: 0.15,
                    shadowRadius: 16,
                    elevation: 6,
                  }}
                >
                  {/* Book Image Container */}
                  <View className="bg-[#f1f5f9] relative overflow-hidden" style={{ aspectRatio: 3/4 }}>
                    <Image 
                      source={{ uri: book.image }}
                      className="w-full h-full"
                      style={{ resizeMode: 'cover' }}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.1)']}
                      className="absolute bottom-0 left-0 right-0 h-7"
                    />
                    
                    {/* Price Badge */}
                    <View className="absolute top-2 right-2">
                      <View className="bg-white/90 rounded-4 p-0.5">
                        <LinearGradient
                          colors={book.price === 'Free' ? ['#10b981', '#059669'] : ['#f97316', '#ea580c']}
                          className="px-2.5 py-1.5 rounded-3"
                        >
                          <Text className="text-white text-xs font-bold">{book.price}</Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>

                  {/* Book Info */}
                  <View className="p-4">
                    <Text className="text-[15px] font-bold text-[#1e293b] mb-1.5 leading-5" numberOfLines={2}>
                      {book.title}
                    </Text>
                    <Text className="text-[13px] text-[#64748b] mb-2">by {book.seller}</Text>
                    
                    {/* Rating */}
                    <View className="flex-row items-center mb-3 gap-1">
                      <Star color="#fbbf24" size={12} fill="#fbbf24" />
                      <Text className="text-xs text-[#1e293b] font-semibold">
                        4.{Math.floor(Math.random() * 9) + 1}
                      </Text>
                      <Text className="text-xs text-[#64748b]">
                        ({Math.floor(Math.random() * 500) + 50})
                      </Text>
                    </View>
                    
                    <View className="flex-row justify-between items-center">
                      <View className="bg-[#fff7ed] rounded-2.5 px-2.5 py-1.5 border border-[#fed7aa]">
                        <Text className="text-xs text-[#ea580c] font-semibold">{book.examType}</Text>
                      </View>
                      
                      {/* Buy Button */}
                      <TouchableOpacity className="rounded-2.5 overflow-hidden" activeOpacity={0.8}>
                        <LinearGradient
                          colors={book.price === 'Free' ? ['#10b981', '#059669'] : ['#f97316', '#ea580c']}
                          className="flex-row items-center px-3 py-2 gap-1"
                        >
                          <ShoppingCart color="white" size={12} className="mr-0.5" />
                          <Text className="text-white text-xs font-bold">
                            {book.price === 'Free' ? 'Get' : 'Buy'}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default BrowseScreen;