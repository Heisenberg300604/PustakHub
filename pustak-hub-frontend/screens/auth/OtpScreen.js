import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const OtpScreen = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);
  const navigation = useNavigation();
  
  // Focus on first input when screen loads
  useEffect(() => {
    if (inputRefs.current[0]) {
      setTimeout(() => {
        inputRefs.current[0].focus();
      }, 500);
    }
  }, []);

  // Countdown timer for resend button
  useEffect(() => {
    let timer = null;
    if (resendDisabled && countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendDisabled, countdown]);

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Auto focus next input if current input is filled
    if (text && index < 3 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOtp = () => {
    // Implement resend OTP functionality
    // For now, just reset the countdown
    setResendDisabled(true);
    setCountdown(30);
    Alert.alert('OTP Sent', 'A new OTP has been sent to your phone.');
  };

  const handleVerifyOtp = async () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      Alert.alert('Invalid OTP', 'Please enter a valid 4-digit OTP.');
      return;
    }
    
    setLoading(true);
    
    try {
      // const success = await verifyOtp(otpString);
      const success = true;
      
      if (success) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'Onboarding' }],
        });
      } else {
        Alert.alert('Verification Failed', 'The OTP you entered is incorrect. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const formattedPhone = '+91 88515 XXXXX'; // Replace with actual phone number from context

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.contentContainer}>
          {/* Header Text */}
          <Text style={styles.headerText}>Enter the Code</Text>
          
          {/* Instruction Text */}
          <Text style={styles.instructionText}>
            Enter the 4-digit OTP sent to{'\n'}{formattedPhone}
          </Text>
          
          {/* Illustration Image */}
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/otp.png')} // Replace with your actual image path
              style={styles.illustrationImage}
              resizeMode="contain"
            />
          </View>
          
          {/* OTP Input Section */}
          <View style={styles.otpContainer}>
            {[0, 1, 2, 3].map((index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={otp[index]}
                onChangeText={(text) => handleOtpChange(text, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                selectTextOnFocus
              />
            ))}
          </View>
          
          {/* Resend Section */}
          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {resendDisabled ? (
              <Text style={styles.countdownText}>Resend in {countdown}s</Text>
            ) : (
              <TouchableOpacity onPress={handleResendOtp}>
                <Text style={styles.resendButtonText}>Resend</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {/* Submit Button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.85}
            onPress={handleVerifyOtp}
            disabled={loading}
          >
            <LinearGradient
              colors={['#FFBB34', '#FFA000']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.gradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.buttonText}>Verify OTP</Text>
              )}
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
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  illustrationImage: {
    width: '100%',
    height: '100%',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 20,
    alignSelf: 'center',
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    fontSize: 24,
    textAlign: 'center',
    backgroundColor: '#FFFFFF',
    fontWeight: '600',
    color: '#333333',
  },
  resendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
    alignSelf: 'center',
  },
  resendText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Regular',
  },
  countdownText: {
    fontSize: 14,
    color: '#999999',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Regular',
  },
  resendButtonText: {
    fontSize: 14,
    color: '#4A90E2',
    fontWeight: '500',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'Roboto-Medium',
    textDecorationLine: 'underline',
  },
  buttonContainer: {
    width: '100%',
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
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

export default OtpScreen;