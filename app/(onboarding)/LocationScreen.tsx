import { LinearGradient } from 'expo-linear-gradient';
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
  const [city, setCity] = useState<string>('');
  const [isLoadingLocation, setIsLoadingLocation] = useState<boolean>(false);

  const handleNext = () => {
    if (city.trim() === '') {
      Alert.alert('Required', 'Please enter your city or allow location access');
      return;
    }
    console.log('City entered:', city);
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
          'Location permission is required to detect your city automatically.',
          [{ text: 'OK' }]
        );
        setIsLoadingLocation(false);
        return;
      }

      // Get current location
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
      });

      // Reverse geocode to get city
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        const detectedCity = address.city || address.subregion || address.region;
        
        if (detectedCity) {
          setCity(detectedCity);
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
        {/* Title */}
        <Text className="text-[35px] font-bold text-[#FFB84D] text-center mb-15" style={{ fontFamily: 'Inter-Bold' }}>
          Where are You From ?
        </Text>
        
        {/* Illustration */}
        <View className="mb-15 items-center">
          <Image
            source={require('../../assets/location.png')}
            className="w-[150px] h-[150px] rounded-[10px]"
            resizeMode="contain"
          />
        </View>
        
        {/* Input Field */}
        <View className="w-full flex-row items-center mb-5">
          <TextInput
            className="flex-1 h-[50px] border-b-2 border-[#E5E5E5] text-base py-2.5 pr-12 text-[#333]"
            placeholder="We will match you locally"
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
          />
          
          {/* Location Button */}
          <TouchableOpacity 
            className="absolute right-2.5 bottom-2.5 w-7 h-7 justify-center items-center"
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