import { OnboardingButton } from '@/components/ui/OnboardingButton';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface ContactData {
  email: string;
  instagram: string;
  skipped?: boolean;
  timestamp: string;
}

export default function ContactScreen() {
  const [email, setEmail] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');

  // Email validation function
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Save data to AsyncStorage
  const saveContactData = async (contactData: ContactData) => {
    try {
      console.log('Contact data saved:', contactData);
    } catch (error) {
      console.error('Error saving contact data:', error);
    }
  };

  const handleNext = async () => {
    // Validate email if entered
    if (email.trim() !== '' && !isValidEmail(email.trim())) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    // Prepare contact data
    const contactData: ContactData = {
      email: email.trim(),
      instagram: instagram.trim(),
      timestamp: new Date().toISOString(),
    };

    // Save data
    // await saveContactData(contactData);

    // Navigate to FinishScreen
    console.log('Contact data collected:', contactData);
    Alert.alert('Success', 'Contact information saved successfully!');
    router.push('/FinishScreen');
  };

  const handleSkip = async () => {
    // Save empty contact data
    const contactData: ContactData = {
      email: '',
      instagram: '',
      skipped: true,
      timestamp: new Date().toISOString(),
    };

    await saveContactData(contactData);

    console.log('Contact screen skipped');
    router.push('/FinishScreen');
    Alert.alert('Skipped', 'No contact information saved.');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View className="flex-1 px-10 pt-20 items-center">
        {/* Title */}
        <Text className="text-[35px] font-bold text-[#FFB84D] text-center mb-2.5" style={{ fontFamily: 'Inter-Bold' }}>
          Stay Connected
        </Text>
        <Text className="text-base text-[#666] text-center mb-12">
          Share your contact details (optional)
        </Text>

        {/* Illustration */}
        <View className="mb-12 items-center">
          <Image
            source={require('../../assets/socials.png')}
            className="w-[150px] h-[150px] rounded-[10px]"
            resizeMode="contain"
          />
        </View>

        {/* Email Input Field */}
        <View className="w-full mb-6">
          <TextInput
            className="w-full h-[50px] border-b-2 border-[#E5E5E5] text-base py-2.5 px-1 text-[#333]"
            placeholder="Enter your email address"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Instagram Input Field */}
        <View className="w-full mb-6">
          <TextInput
            className="w-full h-[50px] border-b-2 border-[#E5E5E5] text-base py-2.5 px-1 text-[#333]"
            placeholder="Instagram profile link or username"
            placeholderTextColor="#999"
            value={instagram}
            onChangeText={setInstagram}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Optional Text */}
        <Text className="text-sm text-[#888] text-center mb-10 leading-5 px-2">
          Both fields are optional. We'll use this to keep you updated and help you connect with others.
        </Text>

        {/* Buttons Container */}
        <View className="w-full gap-4">
          {/* Skip Button */}
          <TouchableOpacity
            className="py-4 items-center justify-center border border-[#FFB84D] rounded-[25px] bg-transparent"
            onPress={handleSkip}
          >
            <Text className="text-[#FFB84D] text-lg font-semibold">Skip</Text>
          </TouchableOpacity>

          <OnboardingButton
            label="Continue"
            onPress={handleNext}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}