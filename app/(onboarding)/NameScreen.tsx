import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
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
        <Text className="text-[35px] font-bold text-[#FFB84D] text-center mb-15" style={{ fontFamily: 'Inter-Bold' }}>
          What's Your Name ?
        </Text>
        
        {/* Illustration */}
        <View className="mb-20 items-center">
          <Image
            source={require('../../assets/name.png')}
            className="w-[150px] h-[150px] rounded-[10px]"
            resizeMode="contain"
          />
        </View>
        
        {/* Input Field */}
        <TextInput
          className="w-full h-[50px] border-b-2 border-[#E5E5E5] text-base py-2.5 mb-20 text-[#333]"
          placeholder="Enter Your Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        
        {/* Next Button */}
        <TouchableOpacity className="w-full rounded-[25px] overflow-hidden" onPress={handleNext}>
          <LinearGradient
            colors={['#FFB84D', '#FF9500']}
            className="py-4 items-center justify-center"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-white text-lg font-semibold">Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}