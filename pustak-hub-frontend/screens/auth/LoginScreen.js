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
    }else{
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
            Enter your mobile number to receive a verification code.
          </Text>
          
          {/* Phone Input Section */}
          <View style={styles.inputRow}>
            <View style={styles.countryCodeContainer}>
              <Text style={styles.countryCodeText}>+91</Text>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                placeholderTextColor="#9E9E9E"
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
    paddingTop: height * 0.05, // Position content higher in the screen
    alignItems: 'flex-start',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: '#FFAB00',
    marginBottom: 10,
    width: '100%',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Bold',
    letterSpacing: 0.2,
  },
  instructionText: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 32,
    width: '100%',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Regular',
    lineHeight: 20,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  countryCodeContainer: {
    paddingRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countryCodeText: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  inputContainer: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  input: {
    flex: 1,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#212121',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Regular',
  },
  buttonContainer: {
    width: '100%',
    height: 52,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 8,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    letterSpacing: 0.5,
  },
});

export default LoginScreen;