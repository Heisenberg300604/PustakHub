import { OnboardingButton } from '@/components/ui/OnboardingButton';
import { useOnboardingStore } from '@/stores/useOnboardingStore';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LocationScreen() {
  const { city, setField } = useOnboardingStore();
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);

  const handleNext = () => {
    if (city.trim() === '') {
      Alert.alert('Required', 'Please enter your city or allow location access');
      return;
    }
    router.push('/ContactScreen');
  };

  const getCurrentLocation = async () => {
    try {
      setIsLoadingLocation(true);

      // Request permission
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Denied',
          'Location permission is required to detect your city automatically.'
        );
        return;
      }

      // Get coordinates
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const detectedCity = address.city || address.subregion || address.region;

        if (detectedCity) {
          setField('city', detectedCity);
          setField('latitude', location.coords.latitude);
          setField('longitude', location.coords.longitude);

          Alert.alert('Location Detected', `We found you're in ${detectedCity}`);
        } else {
          Alert.alert('Location Error', 'Could not determine your city. Please enter manually.');
        }
      }
    } catch (error) {
      console.error('Location error:', error);
      Alert.alert('Error', 'Failed to get your location. Please enter your city manually.');
    } finally {
      setIsLoadingLocation(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FA]">
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      <View className="flex-1 px-10 pt-20 items-center">
        <Text className="text-[35px] font-bold text-[#FFB84D] text-center mb-[60px]">
          Where are You From?
        </Text>

        <View className="mb-[80px] items-center">
          <Image
            source={require('../../assets/location.png')}
            className="w-[150px] h-[150px] rounded-[10px]"
            resizeMode="contain"
          />
        </View>

        <View className="w-full mb-[80px] relative">
          <TextInput
            className="w-full h-[50px] border-b-[2px] border-[#E5E5E5] text-[16px] py-[10px] text-[#333] pr-10"
            placeholder="Enter your city"
            placeholderTextColor="#999"
            value={city}
            onChangeText={(val) => setField('city', val)}
          />
          <TouchableOpacity
            className="absolute right-0 bottom-3 w-8 h-8 justify-center items-center"
            onPress={getCurrentLocation}
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <ActivityIndicator size="small" color="#FFB84D" />
            ) : (
              <Text className="text-xl">📍</Text>
            )}
          </TouchableOpacity>
        </View>

        <OnboardingButton label="Next" onPress={handleNext} />
      </View>
    </SafeAreaView>
  );
}
