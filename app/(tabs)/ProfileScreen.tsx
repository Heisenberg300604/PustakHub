import { LinearGradient } from 'expo-linear-gradient';
import {
  BookOpen,
  Calendar,
  ChevronRight,
  Edit3,
  Heart,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
  ShoppingBag,
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserInfo {
  name: string;
  city: string;
  phone: string;
  instagram: string;
  telegram: string;
  joinDate: string;
}

interface Book {
  id: number;
  title: string;
  examType: string;
  price: string;
  image: string;
  status: 'Active' | 'Sold';
}

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Priya Sharma',
    city: 'Delhi',
    phone: '+91 98765 43210',
    instagram: '@priya_studies',
    telegram: '@priyasharma',
    joinDate: 'January 2024'
  });

  const stats = {
    booksSold: 12,
    booksDonated: 8,
    booksBought: 15
  };

  const userBooks: Book[] = [
    { 
      id: 1, 
      title: 'HC Verma Physics Part 1', 
      examType: 'JEE',
      price: '₹450', 
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      status: 'Active'
    },
    { 
      id: 2, 
      title: 'NCERT Biology Class 12', 
      examType: 'NEET',
      price: '₹320', 
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
      status: 'Active'
    },
    { 
      id: 3, 
      title: 'Arihant Chemistry', 
      examType: 'JEE',
      price: '₹280', 
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      status: 'Sold'
    },
  ];

  const ProfileHeader = () => (
    <View className="mb-5">
      <LinearGradient
        colors={['#fb923c', '#f97316']}
        className="pt-5 pb-6 px-5"
      >
        <View className="flex-row items-start mb-6">
          <View className="relative mr-4">
            <View className="w-18 h-18 bg-white/20 rounded-full justify-center items-center border-3 border-white/30">
              <User color="white" size={32} />
            </View>
            <TouchableOpacity className="absolute -bottom-1 -right-1 w-7 h-7 bg-amber-50 rounded-full justify-center items-center shadow shadow-black/10">
              <Edit3 color="#3b82f6" size={14} />
            </TouchableOpacity>
          </View>
          
          <View className="flex-1">
            <Text className="text-2xl font-bold text-white mb-1">{userInfo.name}</Text>
            <View className="flex-row items-center mb-1">
              <MapPin color="rgba(255,255,255,0.8)" size={14} />
              <Text className="text-sm text-white/90 ml-1">{userInfo.city}</Text>
            </View>
            <View className="flex-row items-center">
              <Calendar color="rgba(255,255,255,0.8)" size={14} />
              <Text className="text-sm text-white/80 ml-1">Joined {userInfo.joinDate}</Text>
            </View>
          </View>

          <TouchableOpacity 
            className="w-10 h-10 bg-white/20 rounded-full justify-center items-center"
            onPress={() => setIsEditing(!isEditing)}
          >
            <Edit3 color="white" size={16} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View className="flex-row bg-white/15 rounded-xl p-4">
          <View className="flex-1 items-center">
            <ShoppingBag color="white" size={20} />
            <Text className="text-xl font-bold text-white mt-1">{stats.booksSold}</Text>
            <Text className="text-xs text-white/80 mt-0.5">Sold</Text>
          </View>
          <View className="w-px bg-white/20 mx-4" />
          <View className="flex-1 items-center">
            <Heart color="white" size={20} />
            <Text className="text-xl font-bold text-white mt-1">{stats.booksDonated}</Text>
            <Text className="text-xs text-white/80 mt-0.5">Donated</Text>
          </View>
          <View className="w-px bg-white/20 mx-4" />
          <View className="flex-1 items-center">
            <BookOpen color="white" size={20} />
            <Text className="text-xl font-bold text-white mt-1">{stats.booksBought}</Text>
            <Text className="text-xs text-white/80 mt-0.5">Bought</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const ContactInfo = () => (
    <View className="mx-5 mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-bold text-slate-800">Contact Information</Text>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Edit3 color="#64748b" size={16} />
          </TouchableOpacity>
        )}
      </View>

      <View className="bg-white rounded-2xl p-5 shadow shadow-black/5">
        <View className="flex-row items-center py-3 border-b border-slate-100">
          <Phone color="#64748b" size={18} />
          <View className="flex-1 ml-3">
            <Text className="text-sm text-slate-500 mb-0.5">Phone Number</Text>
            {isEditing ? (
              <TextInput
                value={userInfo.phone}
                onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
                className="text-base text-slate-800 font-medium border-b border-blue-500 pb-0.5"
              />
            ) : (
              <Text className="text-base text-slate-800 font-medium">{userInfo.phone}</Text>
            )}
          </View>
        </View>

        <View className="flex-row items-center py-3 border-b border-slate-100">
          <Instagram color="#64748b" size={18} />
          <View className="flex-1 ml-3">
            <Text className="text-sm text-slate-500 mb-0.5">Instagram</Text>
            {isEditing ? (
              <TextInput
                value={userInfo.instagram}
                onChangeText={(text) => setUserInfo({...userInfo, instagram: text})}
                className="text-base text-slate-800 font-medium border-b border-blue-500 pb-0.5"
              />
            ) : (
              <Text className="text-base text-slate-800 font-medium">{userInfo.instagram}</Text>
            )}
          </View>
        </View>

        <View className="flex-row items-center py-3">
          <MessageCircle color="#64748b" size={18} />
          <View className="flex-1 ml-3">
            <Text className="text-sm text-slate-500 mb-0.5">Telegram</Text>
            {isEditing ? (
              <TextInput
                value={userInfo.telegram}
                onChangeText={(text) => setUserInfo({...userInfo, telegram: text})}
                className="text-base text-slate-800 font-medium border-b border-blue-500 pb-0.5"
              />
            ) : (
              <Text className="text-base text-slate-800 font-medium">{userInfo.telegram}</Text>
            )}
          </View>
        </View>

        {isEditing && (
          <View className="flex-row justify-end mt-4 gap-3">
            <TouchableOpacity 
              className="px-4 py-2 rounded-lg bg-slate-100"
              onPress={() => setIsEditing(false)}
            >
              <Text className="text-slate-500 font-semibold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="px-4 py-2 rounded-lg bg-orange-500"
              onPress={() => {
                setIsEditing(false);
                Alert.alert('Success', 'Profile updated successfully!');
              }}
            >
              <Text className="text-white font-semibold">Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const MyBooks = () => (
    <View className="mx-5 mb-6">
      <View className="flex-row justify-between items-center mb-3">
        <Text className="text-xl font-bold text-slate-800">My Books ({userBooks.length})</Text>
        <TouchableOpacity>
          <Text className="text-sm text-blue-500 font-semibold">View All</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-2xl p-4 shadow shadow-black/5">
        {userBooks.map((book) => (
          <View key={book.id} className="flex-row items-center py-3 border-b border-slate-100 last:border-0">
            <Image 
              source={{ uri: book.image }}
              className="w-14 h-18 rounded-lg bg-slate-100"
            />
            <View className="flex-1 ml-3">
              <Text className="text-base font-semibold text-slate-800 mb-1.5">{book.title}</Text>
              <View className="bg-amber-50 border border-amber-200 rounded px-2 py-0.5 self-start mb-2">
                <Text className="text-xs text-orange-600 font-medium">{book.examType}</Text>
              </View>
              <View className="flex-row justify-between items-center">
                <Text className="text-base font-bold text-emerald-600">{book.price}</Text>
                <View className={`px-2 py-0.75 rounded-full ${
                  book.status === 'Active' ? 'bg-green-100' : 'bg-yellow-100'
                }`}>
                  <Text className={`text-xs font-semibold ${
                    book.status === 'Active' ? 'text-green-800' : 'text-yellow-800'
                  }`}>
                    {book.status}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity className="p-2 ml-2">
              <ChevronRight color="#9ca3af" size={16} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'left', 'right']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <ContactInfo />
        <MyBooks />
        
        <View className="h-20" />
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;