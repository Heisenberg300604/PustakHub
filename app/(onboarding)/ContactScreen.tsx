import { OnboardingButton } from '@/components/ui/OnboardingButton';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
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

export default function ContactScreen() {
  const {
    phone,
    instagram,
    telegram,
    primaryContactType,
    setField,
  } = useOnboardingStore();

  const [selectedPrimary, setSelectedPrimary] = useState<
    'phone' | 'instagram' | 'telegram'
  >(primaryContactType || 'phone');

  const handleNext = () => {
    // Check if at least one contact method is provided
    if (!(phone ?? '').trim() && !(instagram ?? '').trim() && !(telegram ?? '').trim()) {
      Alert.alert('Required', 'Please provide at least one contact method.');
      return;
    }

    // Save primary contact type
    setField('primaryContactType', selectedPrimary);

    // Navigate to final screen
    router.push('/FinishScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View className="flex-1 px-10 pt-16 items-center">
        {/* Title */}
        <Text className="text-[32px] font-bold text-[#FFB84D] text-center mb-2">
          Stay Connected
        </Text>
        <Text className="text-base text-[#666] text-center mb-10">
          Provide at least one contact method & mark one as primary.
        </Text>

        {/* Illustration */}
        <View className="mb-10 items-center">
          <Image
            source={require('../../assets/socials.png')}
            className="w-[140px] h-[140px] rounded-[10px]"
            resizeMode="contain"
          />
        </View>

        {/* Phone Input */}
        <View className="w-full mb-6">
          <TextInput
            className="w-full h-[50px] border-b-2 border-[#E5E5E5] text-base py-2.5 px-1 text-[#333]"
            placeholder="Mobile / WhatsApp number"
            placeholderTextColor="#999"
            value={phone}
            onChangeText={(val) => setField('phone', val)}
            keyboardType="phone-pad"
          />
          <TouchableOpacity
            className="absolute right-2 bottom-3"
            onPress={() => setSelectedPrimary('phone')}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedPrimary === 'phone' ? 'text-[#FFB84D]' : 'text-[#999]'
              }`}
            >
              Primary
            </Text>
          </TouchableOpacity>
        </View>

        {/* Instagram Input */}
        <View className="w-full mb-6">
          <TextInput
            className="w-full h-[50px] border-b-2 border-[#E5E5E5] text-base py-2.5 px-1 text-[#333]"
            placeholder="Instagram username"
            placeholderTextColor="#999"
            value={instagram}
            onChangeText={(val) => setField('instagram', val)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            className="absolute right-2 bottom-3"
            onPress={() => setSelectedPrimary('instagram')}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedPrimary === 'instagram' ? 'text-[#FFB84D]' : 'text-[#999]'
              }`}
            >
              Primary
            </Text>
          </TouchableOpacity>
        </View>

        {/* Telegram Input */}
        <View className="w-full mb-6">
          <TextInput
            className="w-full h-[50px] border-b-2 border-[#E5E5E5] text-base py-2.5 px-1 text-[#333]"
            placeholder="Telegram username"
            placeholderTextColor="#999"
            value={telegram}
            onChangeText={(val) => setField('telegram', val)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            className="absolute right-2 bottom-3"
            onPress={() => setSelectedPrimary('telegram')}
          >
            <Text
              className={`text-sm font-semibold ${
                selectedPrimary === 'telegram' ? 'text-[#FFB84D]' : 'text-[#999]'
              }`}
            >
              Primary
            </Text>
          </TouchableOpacity>
        </View>

        {/* Info text */}
        <Text className="text-sm text-[#888] text-center mb-10 px-4">
          At least one contact is required. You can choose which one is primary.
        </Text>

        {/* Continue Button */}
        <OnboardingButton label="Continue" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}
