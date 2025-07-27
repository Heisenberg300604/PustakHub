import { CheckboxField } from '@/components/common/CheckboxField';
import { CustomButton } from '@/components/common/CustomButton';
import { CustomDropdown } from '@/components/common/CustomDropdown';
import { CustomInput } from '@/components/common/CustomInput';
import { ImageUpload } from '@/components/common/ImageUpload';
import { BookOpen, FileText, Gift, Heart, Info, Package, Tag } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DropdownOption } from '../../types/dropdown';

const DonateScreen: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    edition: '',
    publisher: '',
    selectedExam: '',
    selectedCondition: '',
    selectedCategory: '',
    description: '',
    message: '',
    includeAnswerKey: false,
    allowPickup: false,
  });

  const examTypes: DropdownOption[] = [
    { label: 'JEE Main', value: 'jee_main' },
    { label: 'JEE Advanced', value: 'jee_advanced' },
    { label: 'NEET', value: 'neet' },
    { label: 'UPSC', value: 'upsc' },
    { label: 'GATE', value: 'gate' },
    { label: 'CAT', value: 'cat' },
    { label: 'SSC', value: 'ssc' },
    { label: 'Board Exam', value: 'board' },
    { label: 'Other', value: 'other' },
  ];

  const bookConditions: DropdownOption[] = [
    { label: 'Like New', value: 'like_new' },
    { label: 'Good', value: 'good' },
    { label: 'Fair', value: 'fair' },
    { label: 'Poor', value: 'poor' },
  ];

  const categories: DropdownOption[] = [
    { label: 'Physics', value: 'physics' },
    { label: 'Chemistry', value: 'chemistry' },
    { label: 'Mathematics', value: 'mathematics' },
    { label: 'Biology', value: 'biology' },
    { label: 'General Studies', value: 'general_studies' },
    { label: 'Reasoning', value: 'reasoning' },
    { label: 'English', value: 'english' },
    { label: 'Current Affairs', value: 'current_affairs' },
    { label: 'Other', value: 'other' },
  ];

  const handleSubmit = () => {
    console.log('Donation submitted:', formData);
  };

  return (
    <SafeAreaView className="flex-1 bg-emerald-50" edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-5 pb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Donate Your Book</Text>
          <Text className="text-base text-gray-600">
            Help fellow students achieve their dreams
          </Text>
        </View>

        <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50">
          {/* Image Upload Section */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-1">Book Photos</Text>
            <Text className="text-sm text-gray-600 mb-4">
              Clear photos help students identify the right book
            </Text>

            <View className="gap-3">
              <ImageUpload
                onPress={() => console.log('Main photo pressed')}
                isMain={true}
                variant="donate"
              />

              <View className="flex-row gap-2">
                {[1, 2, 3].map((item) => (
                  <ImageUpload
                    key={item}
                    onPress={() => console.log(`Additional photo ${item} pressed`)}
                  />
                ))}
              </View>
            </View>
          </View>

          {/* Book Information */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Book Information</Text>

            <CustomInput
              label="Book Title"
              placeholder="e.g., HC Verma Physics Part 1"
              icon={BookOpen}
              required
              value={formData.title}
              onChangeText={(text) => setFormData({ ...formData, title: text })}
            />

            <CustomInput
              label="Author Name"
              placeholder="e.g., H.C. Verma"
              value={formData.author}
              onChangeText={(text) => setFormData({ ...formData, author: text })}
            />

            <CustomInput
              label="Edition/Year"
              placeholder="e.g., 2023 Edition"
              value={formData.edition}
              onChangeText={(text) => setFormData({ ...formData, edition: text })}
            />

            <CustomInput
              label="Publisher"
              placeholder="e.g., Bharti Bhawan"
              value={formData.publisher}
              onChangeText={(text) => setFormData({ ...formData, publisher: text })}
            />
          </View>

          {/* Category & Exam */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Category & Exam</Text>

            <CustomDropdown
              label="Exam Type"
              value={formData.selectedExam}
              placeholder="Select exam type"
              options={examTypes}
              onSelect={(value) => setFormData({ ...formData, selectedExam: value })}
              icon={Tag}
              required
            />

            <CustomDropdown
              label="Subject Category"
              value={formData.selectedCategory}
              placeholder="Select subject"
              options={categories}
              onSelect={(value) => setFormData({ ...formData, selectedCategory: value })}
              icon={BookOpen}
              required
            />
          </View>

          {/* Book Condition */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Book Condition</Text>

            <CustomDropdown
              label="Condition"
              value={formData.selectedCondition}
              placeholder="Select condition"
              options={bookConditions}
              onSelect={(value) => setFormData({ ...formData, selectedCondition: value })}
              icon={Package}
              required
            />
          </View>

          {/* Description */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Description</Text>

            <CustomInput
              label="Book Details"
              placeholder="Describe the book condition, any highlights, notes, or special features. This helps students understand what they're getting."
              icon={FileText}
              multiline
              numberOfLines={4}
              style={{ height: 120, textAlignVertical: 'top' }}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
          </View>

          {/* Donation Preferences */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Donation Preferences</Text>

            <CheckboxField
              label="Include solutions/answer key"
              description="If available with the book"
              checked={formData.includeAnswerKey}
              onToggle={() =>
                setFormData({ ...formData, includeAnswerKey: !formData.includeAnswerKey })
              }
            />

            <CheckboxField
              label="Available for pickup"
              description="Students can collect directly from you"
              checked={formData.allowPickup}
              onToggle={() =>
                setFormData({ ...formData, allowPickup: !formData.allowPickup })
              }
            />
          </View>

          {/* Motivational Message */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">
              Message for Students (Optional)
            </Text>

            <CustomInput
              label="Motivational Message"
              placeholder="Write an encouraging message for the student who will receive this book..."
              icon={Heart}
              multiline
              numberOfLines={3}
              style={{ height: 100, textAlignVertical: 'top' }}
              value={formData.message}
              onChangeText={(text) => setFormData({ ...formData, message: text })}
            />
          </View>

          {/* Submit Button */}
          <CustomButton
            title="Donate Book"
            onPress={handleSubmit}
            variant="success"
            size="lg"
            icon={Gift}
            fullWidth
          />

          {/* Info Box */}
          <View className="flex-row bg-emerald-50 rounded-xl p-4 items-start mt-4">
            <Info color="#10b981" size={16} />
            <Text className="flex-1 text-sm text-emerald-700 ml-2 leading-5">
              Your donation will help a fellow student in their exam preparation journey. All donations are completely free and help build our student community.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DonateScreen;