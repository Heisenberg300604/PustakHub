import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const navigation = useNavigation();

  const handleSendOTP = () => {
    if (mobileNumber.length !== 10) {
      Alert.alert('Invalid Mobile Number', 'Please enter a valid 10-digit mobile number');
      return;
    } else {
      navigation.navigate('OTP');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.contentContainer}>
          {/* Header Text */}
          <Text style={styles.headerText}>Let's Get Started</Text>
          
          {/* Instruction Text */}
          <Text style={styles.instructionText}>
            Enter your mobile number to{'\n'}receive a verification code.
          </Text>
          
          {/* Illustration Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/book.png')} // Replace with your actual image path
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          
          {/* Phone Input Section */}
          <View style={styles.inputRow}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor="#CCCCCC"
                keyboardType="phone-pad"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                maxLength={10}
              />
            </View>
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.85}
            onPress={handleSendOTP}
          >
            <LinearGradient
              colors={['#FFBB34', '#FFA000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              <Text style={styles.buttonText}>Send OTP</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: height * 0.03,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFAB00',
    marginBottom: 16,
    width: '100%',
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
    letterSpacing: 0.2,
  },
  instructionText: {
    fontSize: 16,
    color: '#666666',
    marginBottom: 40,
    width: '100%',
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Regular',
    lineHeight: 22,
  },
  imageContainer: {
    width: 120,
    height: 120,
    marginBottom: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 32,
  },
  countryCodeContainer: {
    paddingRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333333',
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
  },
  inputContainer: {
    flex: 1,
    height: 50,
    borderWidth: 1.5,
    borderColor: '#FFAB00',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333333',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Regular',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 8,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
    letterSpacing: 0.5,
  },
});

export default LoginScreen;