import { CheckboxField } from '@/components/common/CheckboxField';
import { CustomButton } from '@/components/common/CustomButton';
import { CustomDropdown } from '@/components/common/CustomDropdown';
import { CustomInput } from '@/components/common/CustomInput';
import { ImageUpload } from '@/components/common/ImageUpload';
import { createListing } from '@/services/listing/listingService';
import * as ImagePicker from 'expo-image-picker';
import { BookOpen, FileText, IndianRupee, Info, Package, Tag } from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DropdownOption } from '../../types/dropdown';

const SellScreen: React.FC = () => {
  const [images, setImages] = useState<(string | null)[]>([null, null, null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async (index: number) => {
  try {
    // Request permission first
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert('Permission Required', 'Permission to access camera roll is required!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true, // Enable editing for consistent output
      quality: 0.8, // Reduce quality slightly to manage file size
      aspect: [4, 3],
      allowsMultipleSelection: false,
      // Add these options for better compatibility
      exif: false, // Don't include EXIF data
      base64: false, // We'll handle base64 conversion in upload service
    });

    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      
      // Log asset information for debugging
      console.log('Selected asset:', {
        uri: asset.uri,
        width: asset.width,
        height: asset.height,
        type: asset.type,
        fileSize: asset.fileSize
      });

      const newImages = [...images];
      newImages[index] = asset.uri;
      setImages(newImages);
    }
  } catch (error) {
    console.error('Error picking image:', error);
    Alert.alert('Error', 'Failed to pick image. Please try again.');
  }
};

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
  };

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    edition: '',
    selectedExam: '',
    selectedCondition: '',
    selectedCategory: '',
    price: '',
    description: '',
    includeAnswerKey: false,
    negotiablePrice: false,
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

  const bookConditions = [
  { label: 'New', value: 'new' },
  { label: 'Like New', value: 'like-new' },
  { label: 'Used', value: 'used' },
  { label: 'Heavily Used', value: 'heavily-used' }
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

  const handleSubmit = async () => {
    // Validate main fields
    if (!formData.title.trim()) {
      Alert.alert('Error', 'Please enter book title');
      return;
    }
    
    if (!formData.selectedExam) {
      Alert.alert('Error', 'Please select exam type');
      return;
    }
    
    if (!formData.selectedCategory) {
      Alert.alert('Error', 'Please select subject category');
      return;
    }
    
    if (!formData.selectedCondition) {
      Alert.alert('Error', 'Please select book condition');
      return;
    }
    
    if (!formData.price.trim() || isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      Alert.alert('Error', 'Please enter a valid price');
      return;
    }

    // Check if main image is uploaded
    if (!images[0]) {
      Alert.alert('Error', 'Please upload at least one book photo');
      return;
    }

    setIsSubmitting(true);

    try {
      await createListing({
        ...formData,
        price: Number(formData.price),
        images: images, // Keep as is, uploadService will filter null values
      });
      
      Alert.alert('Success', 'Book listed successfully!', [
        {
          text: 'OK',
          onPress: () => {
            // Reset form
            setFormData({
              title: '',
              author: '',
              edition: '',
              selectedExam: '',
              selectedCondition: '',
              selectedCategory: '',
              price: '',
              description: '',
              includeAnswerKey: false,
              negotiablePrice: false,
            });
            setImages([null, null, null, null]);
          }
        }
      ]);
    } catch (error) {
      console.error('Error creating listing:', error);
      Alert.alert('Error', 'Something went wrong while listing the book. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="px-5 pt-5 pb-6">
          <Text className="text-3xl font-bold text-gray-900 mb-2">Sell Your Book</Text>
          <Text className="text-base text-gray-600">
            Help fellow students while earning money
          </Text>
        </View>

        <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50">
          {/* Image Upload Section */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-1">Book Photos</Text>
            <Text className="text-sm text-gray-600 mb-4">
              Add clear photos to attract more buyers (First photo is required)
            </Text>

            <View className="gap-3">
              <ImageUpload
                onPress={() => pickImage(0)} 
                onRemove={() => removeImage(0)}
                isMain={true}
                variant="sell"
                imageUri={images[0]}
              />

              <View className="flex-row gap-2">
                {[1, 2, 3].map((index) => (
                  <ImageUpload
                    key={index}
                    onPress={() => pickImage(index)}
                    onRemove={() => removeImage(index)}
                    imageUri={images[index]} 
                    variant="sell"
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

          {/* Condition & Pricing */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Condition & Pricing</Text>

            <CustomDropdown
              label="Book Condition"
              value={formData.selectedCondition}
              placeholder="Select condition"
              options={bookConditions}
              onSelect={(value) => setFormData({ ...formData, selectedCondition: value })}
              icon={Package}
              required
            />

            <CustomInput
              label="Selling Price"
              placeholder="Enter amount"
              icon={IndianRupee}
              keyboardType="numeric"
              required
              value={formData.price}
              onChangeText={(text) => setFormData({ ...formData, price: text })}
            />
            <Text className="text-xs text-gray-500 -mt-3 mb-4">
              Set a competitive price to sell faster
            </Text>
          </View>

          {/* Description */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Description</Text>

            <CustomInput
              label="Book Details"
              placeholder="Describe the book condition, any highlights, missing pages, etc. Be honest to build trust with buyers."
              icon={FileText}
              multiline
              numberOfLines={4}
              style={{ height: 120, textAlignVertical: 'top' }}
              value={formData.description}
              onChangeText={(text) => setFormData({ ...formData, description: text })}
            />
          </View>

          {/* Additional Information */}
          <View className="mb-8">
            <Text className="text-xl font-bold text-gray-900 mb-4">Additional Information</Text>

            <CheckboxField
              label="Include solutions/answer key"
              description="If available with the book"
              checked={formData.includeAnswerKey}
              onToggle={() =>
                setFormData({ ...formData, includeAnswerKey: !formData.includeAnswerKey })
              }
            />

            <CheckboxField
              label="Negotiable price"
              description="Allow buyers to make offers"
              checked={formData.negotiablePrice}
              onToggle={() =>
                setFormData({ ...formData, negotiablePrice: !formData.negotiablePrice })
              }
            />
          </View>

          {/* Submit Button */}
          <CustomButton
            title={isSubmitting ? "Listing..." : "List for Sale"}
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            icon={Package}
            fullWidth
            disabled={isSubmitting}
          />

          {/* Info Box */}
          <View className="flex-row bg-blue-50 rounded-xl p-4 items-start mt-4">
            <Info color="#3b82f6" size={16} />
            <Text className="flex-1 text-sm text-blue-700 ml-2 leading-5">
              Be sure to add all the details of the book. This will help you get more buyers reach to you in no time.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SellScreen;