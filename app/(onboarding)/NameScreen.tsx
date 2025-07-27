import { OnboardingButton } from '@/components/ui/OnboardingButton';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View
} from 'react-native';

export default function NameScreen() {
  const [name, setName] = useState<string>('');

  const handleNext = () => {
    console.log('Name entered:', name);
    router.push('/LocationScreen');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View className="flex-1 px-10 pt-20 items-center">
        {/* Title */}
        <Text className="text-[35px] font-bold text-[#FFB84D] text-center mb-[60px]" style={{ fontFamily: 'Inter-Bold' }}>
          What's Your Name ?
        </Text>

        {/* Illustration */}
        <View className="mb-[80px] items-center">
          <Image
            source={require('../../assets/name.png')}
            className="w-[150px] h-[150px] rounded-[10px]"
            resizeMode="contain"
          />
        </View>

        {/* Input Field */}
        <TextInput
          className="w-full h-[50px] border-b-[2px] border-[#E5E5E5] text-[16px] py-[10px] mb-[80px] text-[#333]"
          placeholder="Enter Your Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />

        <OnboardingButton
          label="Next"
          onPress={handleNext}
        />
      </View>
    </SafeAreaView>
  );
}