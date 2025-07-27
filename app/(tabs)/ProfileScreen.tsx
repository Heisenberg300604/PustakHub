import { CustomButton } from '@/components/common/CustomButton';
import { CustomInput } from '@/components/common/CustomInput';
import {
  Bell,
  Calendar,
  ChevronRight,
  Edit3,
  HelpCircle,
  Instagram,
  LogOut,
  MapPin,
  MessageCircle,
  Phone,
  Settings,
  User
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface UserInfo {
  name: string;
  city: string;
  phone: string;
  instagram: string;
  telegram: string;
  joinDate: string;
  avatar?: string;
}

interface Book {
  id: number;
  title: string;
  examType: string;
  price: string;
  image: string;
  status: 'Active' | 'Sold';
}

const ProfileScreen: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: 'Priya Sharma',
    city: 'Delhi',
    phone: '+91 98765 43210',
    instagram: '@priya_studies',
    telegram: '@priyasharma',
    joinDate: 'January 2024'
  });

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

  const menuItems = [
    { icon: Settings, title: 'Account Settings', action: () => console.log('Settings') },
    { icon: Bell, title: 'Notifications', action: () => console.log('Notifications') },
    { icon: HelpCircle, title: 'Help & Support', action: () => console.log('Help') },
    { icon: LogOut, title: 'Sign Out', action: () => Alert.alert('Sign Out', 'Are you sure?') },
  ];

  const handleSaveProfile = () => {
    setIsEditing(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  const ProfileHeader = () => (
    <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50 mb-6">
      <View className="flex-row items-start">
        {/* Avatar */}
        <View className="relative mr-4">
          <View className="w-20 h-20 bg-orange-100 rounded-2xl justify-center items-center">
            {userInfo.avatar ? (
              <Image source={{ uri: userInfo.avatar }} className="w-20 h-20 rounded-2xl" />
            ) : (
              <User color="#f97316" size={32} />
            )}
          </View>
          <TouchableOpacity className="absolute -bottom-2 -right-2 w-8 h-8 bg-orange-500 rounded-full justify-center items-center shadow-lg shadow-orange-500/25">
            <Edit3 color="white" size={14} />
          </TouchableOpacity>
        </View>
        
        {/* User Info */}
        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-900 mb-1">{userInfo.name}</Text>
          <View className="flex-row items-center mb-2">
            <MapPin color="#6b7280" size={16} />
            <Text className="text-base text-gray-600 ml-1">{userInfo.city}</Text>
          </View>
          <View className="flex-row items-center">
            <Calendar color="#6b7280" size={16} />
            <Text className="text-sm text-gray-500 ml-1">Joined {userInfo.joinDate}</Text>
          </View>
        </View>

        {/* Edit Button */}
        <TouchableOpacity 
          className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center"
          onPress={() => setIsEditing(!isEditing)}
        >
          <Edit3 color="#6b7280" size={18} />
        </TouchableOpacity>
      </View>
    </View>
  );

  const ContactInfo = () => (
    <View className="mx-5 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Contact Information</Text>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Edit3 color="#6b7280" size={18} />
          </TouchableOpacity>
        )}
      </View>

      <View className="bg-white rounded-2xl p-6 shadow-lg shadow-gray-200/50">
        {isEditing ? (
          <View>
            <CustomInput
              label="Full Name"
              value={userInfo.name}
              onChangeText={(text) => setUserInfo({...userInfo, name: text})}
              icon={User}
            />
            
            <CustomInput
              label="City"
              value={userInfo.city}
              onChangeText={(text) => setUserInfo({...userInfo, city: text})}
              icon={MapPin}
            />
            
            <CustomInput
              label="Phone Number"
              value={userInfo.phone}
              onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
              icon={Phone}
              keyboardType="phone-pad"
            />
            
            <CustomInput
              label="Instagram"
              value={userInfo.instagram}
              onChangeText={(text) => setUserInfo({...userInfo, instagram: text})}
              icon={Instagram}
            />
            
            <CustomInput
              label="Telegram"
              value={userInfo.telegram}
              onChangeText={(text) => setUserInfo({...userInfo, telegram: text})}
              icon={MessageCircle}
            />

            <View className="flex-row gap-3 mt-2">
              <CustomButton
                title="Cancel"
                onPress={() => setIsEditing(false)}
                variant="outline"
                size="md"
                fullWidth
              />
              <CustomButton
                title="Save Changes"
                onPress={handleSaveProfile}
                variant="primary"
                size="md"
                fullWidth
              />
            </View>
          </View>
        ) : (
          <View>
            <ContactInfoRow icon={Phone} label="Phone" value={userInfo.phone} />
            <ContactInfoRow icon={Instagram} label="Instagram" value={userInfo.instagram} />
            <ContactInfoRow icon={MessageCircle} label="Telegram" value={userInfo.telegram} isLast />
          </View>
        )}
      </View>
    </View>
  );

  const ContactInfoRow = ({ icon: Icon, label, value, isLast = false }: {
    icon: any;
    label: string;
    value: string;
    isLast?: boolean;
  }) => (
    <View className={`flex-row items-center py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}>
      <View className="w-10 h-10 bg-gray-50 rounded-xl justify-center items-center mr-3">
        <Icon color="#6b7280" size={18} />
      </View>
      <View className="flex-1">
        <Text className="text-sm text-gray-500 mb-1">{label}</Text>
        <Text className="text-base text-gray-900 font-medium">{value}</Text>
      </View>
    </View>
  );

  const MyBooks = () => (
    <View className="mx-5 mb-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">My Books</Text>
        <TouchableOpacity>
          <Text className="text-base text-orange-500 font-semibold">View All</Text>
        </TouchableOpacity>
      </View>

      <View className="bg-white rounded-2xl p-4 shadow-lg shadow-gray-200/50">
        {userBooks.slice(0, 3).map((book, index) => (
          <TouchableOpacity 
            key={book.id} 
            className={`flex-row items-center py-4 ${index !== userBooks.slice(0, 3).length - 1 ? 'border-b border-gray-100' : ''}`}
          >
            <Image 
              source={{ uri: book.image }}
              className="w-16 h-20 rounded-xl bg-gray-100"
            />
            <View className="flex-1 ml-4">
              <Text className="text-base font-semibold text-gray-900 mb-2" numberOfLines={2}>
                {book.title}
              </Text>
              <View className="flex-row items-center justify-between">
                <View className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-1">
                  <Text className="text-xs text-orange-600 font-semibold">{book.examType}</Text>
                </View>
                <Text className="text-lg font-bold text-orange-500">{book.price}</Text>
              </View>
              <View className="flex-row justify-between items-center mt-2">
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
        ))}
      </View>
    </View>
  );

  const MenuSection = () => (
    <View className="mx-5 mb-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Settings</Text>
      
      <View className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`flex-row items-center px-6 py-4 ${
              index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
            } ${item.title === 'Sign Out' ? 'bg-red-50' : ''}`}
            onPress={item.action}
          >
            <View className={`w-10 h-10 rounded-xl justify-center items-center mr-4 ${
              item.title === 'Sign Out' ? 'bg-red-100' : 'bg-gray-50'
            }`}>
              <item.icon 
                color={item.title === 'Sign Out' ? '#dc2626' : '#6b7280'} 
                size={18} 
              />
            </View>
            <Text className={`flex-1 text-base font-medium ${
              item.title === 'Sign Out' ? 'text-red-600' : 'text-gray-900'
            }`}>
              {item.title}
            </Text>
            <ChevronRight 
              color={item.title === 'Sign Out' ? '#dc2626' : '#9ca3af'} 
              size={20} 
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="pt-4">
          <ProfileHeader />
          <ContactInfo />
          <MyBooks />
          <MenuSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;