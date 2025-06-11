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
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function ContactScreen() {
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  
  // Navigation hook
  const navigation = useNavigation();
  // Email validation function
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Save data to AsyncStorage
  const saveContactData = async (contactData) => {
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
    const contactData = {
      email: email.trim(),
      instagram: instagram.trim(),
      timestamp: new Date().toISOString(),
    };

    // Save data
    // await saveContactData(contactData);

    // Navigate to FinishScreen
    console.log('Contact data collected:', contactData);
    // navigation.navigate('FinishScreen', { contactData });
    Alert.alert('Success', 'Contact information saved successfully!');
    navigation.navigate('Finish');
  };

  const handleSkip = async () => {
    // Save empty contact data
    const contactData = {
      email: '',
      instagram: '',
      skipped: true,
      timestamp: new Date().toISOString(),
    };

    await saveContactData(contactData);
    
    console.log('Contact screen skipped');
    // navigation.navigate('FinishScreen', { contactData });
    navigation.navigate('Finish');
    Alert.alert('Skipped', 'No contact information saved.');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>Stay Connected</Text>
        <Text style={styles.subtitle}>Share your contact details (optional)</Text>
        
        {/* Illustration */}
        <View style={styles.imageContainer}>
                  <Image
                    source={require('../../assets/socials.png')}
                    style={styles.illustration}
                    resizeMode="contain"
                  />
                </View>
        
        {/* Email Input Field */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
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
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Instagram profile link or username"
            placeholderTextColor="#999"
            value={instagram}
            onChangeText={setInstagram}
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>
        
        {/* Optional Text */}
        <Text style={styles.optionalText}>
          Both fields are optional. We'll use this to keep you updated and help you connect with others.
        </Text>
        
        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          {/* Skip Button */}
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
          
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
    marginBottom: 10,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 50,
  },
  imageContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  illustrationPlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#FFB84D20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrationIcon: {
    fontSize: 60,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 25,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 5,
    color: '#333',
  },
  optionalText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
  },
  skipButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFB84D',
    borderRadius: 25,
    backgroundColor: 'transparent',
  },
  skipButtonText: {
    color: '#FFB84D',
    fontSize: 18,
    fontWeight: '600',
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
  imageContainer: {
    marginBottom: 40,
    alignItems: 'center',
  },
  illustration: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
});