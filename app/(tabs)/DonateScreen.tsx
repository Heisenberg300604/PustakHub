import { LinearGradient } from 'expo-linear-gradient';
import { BookOpen, Camera, ChevronDown, FileText, Gift, Heart, Info, Star, Tag } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DonateScreen: React.FC = () => {
  const [selectedExam, setSelectedExam] = useState<string>('');
  const [selectedCondition, setSelectedCondition] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [includeAnswerKey, setIncludeAnswerKey] = useState<boolean>(false);
  const [allowPickup, setAllowPickup] = useState<boolean>(false);

  const examTypes = ['JEE Main', 'JEE Advanced', 'NEET', 'UPSC', 'GATE', 'CAT', 'SSC', 'Board Exam', 'Other'];
  const bookConditions = ['Like New', 'Good', 'Fair', 'Poor'];
  const categories = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Studies', 'Reasoning', 'English', 'Current Affairs', 'Other'];

  const renderDropdown = (value: string, placeholder: string, options: string[], onSelect: (value: string) => void, icon: React.ReactNode) => (
    <View className="relative">
      <View className="absolute left-4 top-4 z-10">
        {icon}
      </View>
      <TouchableOpacity 
        className="h-13 bg-[#f8fafc] border border-[#e2e8f0] rounded-3 pl-12 pr-4 justify-between items-center flex-row"
        onPress={() => {
          Alert.alert('Select Option', 'Dropdown functionality to be implemented');
        }}
      >
        <Text className={value ? "text-base text-[#1e293b]" : "text-base text-[#9ca3af]"}>
          {value || placeholder}
        </Text>
        <ChevronDown color="#9ca3af" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#f0fdf4]" edges={['top', 'left', 'right']}>
      <LinearGradient 
        colors={['#f0fdf4', '#ecfdf5']}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="px-5 pt-5 pb-4">
            <Text className="text-[28px] font-bold text-[#1e293b] mb-2">Donate Your Book</Text>
            <Text className="text-base text-[#64748b]">Help fellow students achieve their dreams</Text>
          </View>

          <View 
            className="bg-white mx-5 rounded-5 p-6"
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 4,
            }}
          >
            {/* Image Upload Section */}
            <View className="mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-1">Book Photos</Text>
              <Text className="text-sm text-[#64748b] mb-4">Clear photos help students identify the right book</Text>
              
              <View className="gap-3">
                <TouchableOpacity className="h-35 bg-[#d1fae5] border-2 border-[#a7f3d0] border-dashed rounded-4 justify-center items-center">
                  <Camera color="#10b981" size={32} />
                  <Text className="text-[#047857] text-base font-semibold mt-2">Add Main Photo</Text>
                  <Text className="text-[#10b981] text-xs mt-1">Required</Text>
                </TouchableOpacity>
                
                <View className="flex-row gap-2">
                  {[1, 2, 3].map((item) => (
                    <TouchableOpacity key={item} className="flex-1 h-20 bg-[#f8fafc] border border-[#e2e8f0] border-dashed rounded-3 justify-center items-center">
                      <Camera color="#9ca3af" size={20} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Book Details */}
            <View className="mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-4">Book Information</Text>
              
              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Book Title *</Text>
                <View className="relative flex-row items-center">
                  <TextInput
                    placeholder="e.g., HC Verma Physics Part 1"
                    className="h-13 bg-[#f8fafc] border border-[#e2e8f0] rounded-3 px-4 text-base text-[#1e293b]"
                    placeholderTextColor="#9ca3af"
                  />
                  <BookOpen color="#9ca3af" size={20} className="absolute right-4" />
                </View>
              </View>

              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Author Name</Text>
                <TextInput
                  placeholder="e.g., H.C. Verma"
                  className="h-13 bg-[#f8fafc] border border-[#e2e8f0] rounded-3 px-4 text-base text-[#1e293b]"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Edition/Year</Text>
                <TextInput
                  placeholder="e.g., 2023 Edition"
                  className="h-13 bg-[#f8fafc] border border-[#e2e8f0] rounded-3 px-4 text-base text-[#1e293b]"
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Publisher</Text>
                <TextInput
                  placeholder="e.g., Bharti Bhawan"
                  className="h-13 bg-[#f8fafc] border border-[#e2e8f0] rounded-3 px-4 text-base text-[#1e293b]"
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Category Selection */}
            <View className="mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-4">Category & Exam</Text>
              
              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Exam Type *</Text>
                {renderDropdown(selectedExam, 'Select exam type', examTypes, setSelectedExam, <Tag color="#9ca3af" size={20} />)}
              </View>

              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Subject Category *</Text>
                {renderDropdown(selectedCategory, 'Select subject', categories, setSelectedCategory, <BookOpen color="#9ca3af" size={20} />)}
              </View>
            </View>

            {/* Condition */}
            <View className="mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-4">Book Condition</Text>
              
              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Condition *</Text>
                {renderDropdown(selectedCondition, 'Select condition', bookConditions, setSelectedCondition, <Star color="#9ca3af" size={20} />)}
              </View>
            </View>

            {/* Description */}
            <View className="mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-4">Description</Text>
              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Book Details</Text>
                <View className="relative">
                  <TextInput
                    placeholder="Describe the book condition, any highlights, notes, or special features. This helps students understand what they're getting."
                    className="h-25 bg-[#f8fafc] border border-[#e2e8f0] rounded-3 p-4 pt-4 text-base text-[#1e293b]"
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    placeholderTextColor="#9ca3af"
                  />
                  <FileText color="#9ca3af" size={20} className="absolute right-4 top-4 z-10" />
                </View>
              </View>
            </View>

            {/* Donation Preferences */}
            <View className="mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-4">Donation Preferences</Text>
              
              <View className="flex-row items-start mb-4">
                <TouchableOpacity 
                  className="w-5 h-5 border-2 border-[#d1d5db] rounded-1 mr-3 mt-0.5 justify-center items-center"
                  onPress={() => setIncludeAnswerKey(!includeAnswerKey)}
                >
                  {includeAnswerKey && <View className="w-2 h-2 bg-[#10b981] rounded-0.5" />}
                </TouchableOpacity>
                <View className="flex-1">
                  <Text className="text-base font-medium text-[#374151] mb-0.5">Include solutions/answer key</Text>
                  <Text className="text-sm text-[#64748b]">If available with the book</Text>
                </View>
              </View>

              <View className="flex-row items-start mb-4">
                <TouchableOpacity 
                  className="w-5 h-5 border-2 border-[#d1d5db] rounded-1 mr-3 mt-0.5 justify-center items-center"
                  onPress={() => setAllowPickup(!allowPickup)}
                >
                  {allowPickup && <View className="w-2 h-2 bg-[#10b981] rounded-0.5" />}
                </TouchableOpacity>
                <View className="flex-1">
                  <Text className="text-base font-medium text-[#374151] mb-0.5">Available for pickup</Text>
                  <Text className="text-sm text-[#64748b]">Students can collect directly from you</Text>
                </View>
              </View>
            </View>

            {/* Target Student Message */}
            <View className="mb-8">
              <Text className="text-xl font-bold text-[#1e293b] mb-4">Message for Students (Optional)</Text>
              <View className="mb-5">
                <Text className="text-base font-semibold text-[#374151] mb-2">Motivational Message</Text>
                <View className="relative">
                  <TextInput
                    placeholder="Write an encouraging message for the student who will receive this book..."
                    className="h-20 bg-[#f8fafc] border border-[#e2e8f0] rounded-3 p-4 pt-4 text-base text-[#1e293b]"
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholderTextColor="#9ca3af"
                  />
                  <Heart color="#9ca3af" size={20} className="absolute right-4 top-4 z-10" />
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity className="rounded-4 overflow-hidden mb-4" activeOpacity={0.9}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                className="h-14 flex-row justify-center items-center gap-2"
              >
                <Gift color="white" size={20} className="mr-1" />
                <Text className="text-white text-lg font-bold">Donate Book</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Info Box */}
            <View className="flex-row bg-[#ecfdf5] rounded-3 p-4 items-start">
              <Info color="#10b981" size={16} />
              <Text className="flex-1 text-sm text-[#047857] ml-2 leading-5">
                Your donation will help a fellow student in their exam preparation journey. All donations are completely free and help build our student community.
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default DonateScreen;