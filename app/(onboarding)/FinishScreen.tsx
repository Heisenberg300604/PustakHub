import { OnboardingButton } from '@/components/ui/OnboardingButton';
import { updateProfile } from '@/services/authService';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
} from 'react-native';

export default function FinishScreen() {
  // Animations
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const checkmarkRotation = useRef(new Animated.Value(0)).current;
  const featureAnimations = useRef([new Animated.Value(0), new Animated.Value(0)]).current;

  // Zustand store
  const {
    name,
    city,
    latitude,
    longitude,
    phone,
    instagram,
    telegram,
    primaryContactType,
    reset,
  } = useOnboardingStore();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Run entry animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(checkmarkRotation, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.stagger(
        200,
        featureAnimations.map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          })
        )
      ),
    ]).start();
  }, []);

  // Save profile and navigate
 const handleGetStarted = async () => {
  if (!primaryContactType) {
    Alert.alert('Required', 'Please set a primary contact type before continuing.');
    return;
  }

  try {
    setLoading(true);

    console.log('📍 Saving profile with data:', {
      name,
      city,
      latitude,
      longitude,
      phone,
      instagram,
      telegram,
      primary_contact_type: primaryContactType,
    });

    // Update profile in Supabase
    await updateProfile({
      name,
      city,
      latitude: latitude || undefined,
      longitude: longitude || undefined,
      phone,
      instagram,
      telegram,
      primary_contact_type: primaryContactType,
    });

    console.log('✅ Profile saved successfully!');
    reset(); // Clear Zustand store
    router.replace('/(tabs)/BrowseScreen');
  } catch (error: any) {
    console.error('❌ Profile update error:', error);
    console.error('Error code:', error?.code);
    console.error('Error message:', error?.message);
    Alert.alert('Error', `Failed to save profile: ${error?.message || 'Unknown error'}`);
  } finally {
    setLoading(false);
  }
};


  const checkmarkRotate = checkmarkRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <SafeAreaView className="flex-1 bg-gradient-to-b from-[#FAFAFA] to-[#F5F5F5]">
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />

      <Animated.View
        className="flex-1 px-8 items-center justify-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: slideAnim }],
        }}
      >
        {/* Top bar */}
        <View className="absolute top-20 w-32 h-1 bg-gradient-to-r from-[#FF9500] to-[#FFB84D] rounded-full opacity-60" />

        {/* Title */}
        <View className="items-center mb-8">
          <Text className="text-[42px] font-bold text-[#FF9500] text-center leading-tight">
            You are All Set!
          </Text>
          <View className="w-16 h-1 bg-[#FFB84D] rounded-full mt-3" />
        </View>

        {/* Checkmark */}
        <View className="mb-10 items-center justify-center">
          <View className="w-[180px] h-[180px] items-center justify-center bg-white rounded-full shadow-lg shadow-[#FF9500]/20 border-4 border-[#FF9500]/10">
            <Animated.View style={{ transform: [{ rotate: checkmarkRotate }] }}>
              <Image
                source={require('../../assets/done.png')}
                className="w-[100px] h-[100px]"
                resizeMode="contain"
              />
            </Animated.View>
          </View>

          {/* Particles */}
          <View className="absolute top-4 right-8 w-3 h-3 bg-[#FFB84D] rounded-full opacity-60" />
          <View className="absolute bottom-8 left-6 w-2 h-2 bg-[#FF9500] rounded-full opacity-40" />
          <View className="absolute top-12 left-4 w-1.5 h-1.5 bg-[#FFB84D] rounded-full opacity-50" />
        </View>

        {/* Features */}
        <View className="w-full max-w-[280px] mb-12">
          <Text className="text-center text-[#777] text-base mb-6 font-medium">
            Heres what you can do:
          </Text>

          {[
            { text: 'Buy & Sell Books', icon: '📚' },
            { text: 'Donate Books', icon: '💝' },
          ].map((feature, index) => (
            <Animated.View
              key={index}
              className="flex-row items-center mb-4 bg-white p-4 rounded-2xl shadow-sm"
              style={{
                opacity: featureAnimations[index],
                transform: [
                  {
                    translateX: featureAnimations[index].interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  },
                ],
              }}
            >
              <View className="w-10 h-10 bg-gradient-to-r from-[#FF9500] to-[#FFB84D] rounded-full items-center justify-center mr-4">
                <Text className="text-lg">{feature.icon}</Text>
              </View>
              <Text className="text-lg text-[#444] font-semibold flex-1">
                {feature.text}
              </Text>
              <View className="w-2 h-2 bg-[#FFB84D] rounded-full" />
            </Animated.View>
          ))}
        </View>

        {/* Button */}
        <View className="w-full max-w-[280px]">
          {loading ? (
            <ActivityIndicator size="large" color="#FF9500" />
          ) : (
            <OnboardingButton label="Let's Get Started" onPress={handleGetStarted} />
          )}

          <Text className="text-center text-[#999] text-sm mt-4 font-medium">
            Welcome to PustakHub !
          </Text>
        </View>

        {/* Bottom decoration */}
        <View className="absolute bottom-20 w-24 h-1 bg-gradient-to-r from-[#FFB84D] to-[#FF9500] rounded-full opacity-40" />
      </Animated.View>
    </SafeAreaView>
  );
}
