import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default function FinishScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    router.replace('/(tabs)/BrowseScreen'); // Navigate to main app tabs
  };

  return (
    <SafeAreaView className="flex-1 bg-[#FAFAFA]">
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <Animated.View 
        className="flex-1 px-10 items-center justify-center"
        style={{
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }]
        }}
      >
        {/* Main Title */}
        <Text className="text-[40px] font-bold text-[#FF9500] text-center mb-7">
          You're All Set!
        </Text>
        
        {/* Tick Image Container */}
        <View className="mb-12 items-center justify-center">
          <View className="w-[200px] h-[200px] items-center justify-center">
            <Image 
              source={require('../../assets/done.png')} 
              className="w-[130px] h-[130px]"
              resizeMode="contain"
            />
          </View>
        </View>
        
        {/* Simple Feature List */}
        <View className="items-start mb-15">
          <View className="flex-row items-center mb-5">
            <View className="w-2 h-2 rounded-full bg-[#FFB84D] mr-4" />
            <Text className="text-lg text-[#555] font-medium">Buy & Sell Books</Text>
          </View>
          <View className="flex-row items-center mb-5">
            <View className="w-2 h-2 rounded-full bg-[#FFB84D] mr-4" />
            <Text className="text-lg text-[#555] font-medium">Donate Books</Text>
          </View>
        </View>
        
        {/* Get Started Button */}
        <TouchableOpacity 
          className="w-full rounded-[25px] overflow-hidden"
          style={{
            elevation: 4,
            shadowColor: '#FF9500',
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.2,
            shadowRadius: 8,
          }}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FFB84D', '#FF9500']}
            className="py-4 px-7 items-center justify-center"
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text className="text-white text-lg font-semibold">Let's Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}