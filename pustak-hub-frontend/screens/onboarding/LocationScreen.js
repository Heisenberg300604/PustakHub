import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

export default function LocationScreen() {
  const [city, setCity] = useState('');
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  const handleNext = () => {
    if (city.trim() === '') {
      Alert.alert('Required', 'Please enter your city or allow location access');
      return;
    }
    console.log('City entered:', city);
    // Handle navigation to next screen
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
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Where are You From ?</Text>
        
        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/location.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        
        {/* Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="We will match you locally"
            placeholderTextColor="#999"
            value={city}
            onChangeText={setCity}
          />
          
          {/* Location Button */}
          <TouchableOpacity 
            style={styles.locationButton} 
            onPress={getCurrentLocation}
            disabled={isLoadingLocation}
          >
            {isLoadingLocation ? (
              <ActivityIndicator size="small" color="#FFB84D" />
            ) : (
              <Text style={styles.locationButtonText}>📍</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Location Permission Button */}
        {/* <TouchableOpacity 
          style={styles.permissionButton} 
          onPress={getCurrentLocation}
          disabled={isLoadingLocation}
        >
          <Text style={styles.permissionButtonText}>
            {isLoadingLocation ? 'Detecting Location...' : 'Use My Current Location'}
          </Text>
        </TouchableOpacity> */}
        
        {/* Next Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
          <LinearGradient
            colors={['#FFB84D', '#FF9500']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFB84D',
    textAlign: 'center',
    marginBottom: 60,
    fontFamily: 'Inter-Bold',
  },
  imageContainer: {
    marginBottom: 60,
    alignItems: 'center',
  },
  illustration: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    fontSize: 16,
    paddingVertical: 10,
    paddingRight: 50,
    color: '#333',
  },
  locationButton: {
    position: 'absolute',
    right: 10,
    bottom: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationButtonText: {
    fontSize: 20,
  },
  permissionButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 40,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFB84D',
    borderRadius: 20,
  },
  permissionButtonText: {
    color: '#FFB84D',
    fontSize: 14,
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});