import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StatusBar,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

// You can add these types later for better type safety
interface AuthScreenProps { }

type AuthMode = 'login' | 'register';

const AuthScreen: React.FC<AuthScreenProps> = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [authMode, setAuthMode] = useState<AuthMode>('register');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleEmailAuth = () => {
    // if (!validateEmail(email)) {
    //   Alert.alert('Invalid Email', 'Please enter a valid email address');
    //   return;
    // }

    // if (password.length < 6) {
    //   Alert.alert('Invalid Password', 'Password must be at least 6 characters long');
    //   return;
    // }

    // if (authMode === 'register' && password !== confirmPassword) {
    //   Alert.alert('Password Mismatch', 'Passwords do not match');
    //   return;
    // }

    // Handle registration/login logic here
    console.log(`${authMode} attempt:`, { email, password });
    
    if (authMode === 'register') {
      // Navigate to onboarding for new users
      router.push('/(onboarding)/NameScreen');
    } else {
      // Navigate to main app for existing users
      router.replace('/(tabs)/BrowseScreen');
    }
  };

    const handleGoogleLogin = () => {
        // Implement Google Sign-In logic here
        console.log('Google login pressed');
        // You'll need to integrate with @react-native-google-signin/google-signin
    };

    const toggleAuthMode = () => {
        setAuthMode(authMode === 'login' ? 'register' : 'login');
        setConfirmPassword(''); // Clear confirm password when switching modes
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                className="flex-1"
            >
                <View style={{ paddingHorizontal: 24, paddingTop: 24 }} className="flex-1">
                    {/* Header Text */}
                    <Text className="text-3xl font-bold text-amber-500 mb-4 text-left tracking-wide">
                        {authMode === 'register' ? "Let's Get Started" : "Welcome Back"}
                    </Text>

                    {/* Instruction Text */}
                    <Text className="text-base text-gray-600 mb-10 text-left leading-5">
                        {authMode === 'register'
                            ? 'Create your account to get started\nwith our amazing features.'
                            : 'Sign in to your account to\ncontinue your journey.'
                        }
                    </Text>

                    {/* Illustration Image */}
                    <View style={{ width: 120, height: 120, marginBottom: 60 }} className="justify-center items-center self-center">
                        <Image
                            source={require('../../assets/book.png')} // Replace with your actual image path
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Email Input */}
                    <View className="w-full mb-4">
                        <View className="h-12 border border-yellow-500 rounded-xl bg-white px-4 justify-center shadow-sm">
                            <TextInput
                                className="text-base text-gray-900"
                                placeholder="Email Address"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                            />
                        </View>
                    </View>


                    <View className="w-full mb-4">
                        <View className="h-12 border border-yellow-500 rounded-xl bg-white px-4 justify-center shadow-sm">
                            <TextInput
                                className="text-base placeholder:text-gray-400"
                                placeholder="Password"
                                placeholderTextColor="#9E9E9E"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                            />
                        </View>
                    </View>


                    {authMode === 'register' && (
                        <View className="w-full mb-6">
                            <View className="h-12 border border-yellow-500 rounded-xl bg-white px-4 justify-center shadow-sm">
                                <TextInput
                                    className="text-base placeholder:text-gray-400"
                                    placeholder="Confirm Password"
                                    placeholderTextColor="#9E9E9E"
                                    secureTextEntry
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                            </View>
                        </View>
                    )}



                    {/* Submit Button */}
                    <TouchableOpacity
                        style={{ height: 50, borderRadius: 25 }}
                        className="w-full overflow-hidden mt-2"
                        activeOpacity={0.85}
                        onPress={handleEmailAuth}
                    >
                        <LinearGradient
                            colors={['#FFBB34', '#FFA000']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}
                        >
                            <Text className="text-white text-base font-bold tracking-wide">
                                {authMode === 'register' ? 'Create Account' : 'Sign In'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* OR Divider */}
                    <View className="flex-row items-center w-full my-6">
                        <View className="flex-1 h-px bg-gray-300" />
                        <Text className="mx-4 text-gray-500 text-sm">OR</Text>
                        <View className="flex-1 h-px bg-gray-300" />
                    </View>

                    {/* Google Sign In Button */}
                    <TouchableOpacity
                        style={{ height: 50, borderWidth: 1.5, borderColor: '#E0E0E0', borderRadius: 25 }}
                        className="w-full flex-row justify-center items-center mb-6 bg-white"
                        activeOpacity={0.85}
                        onPress={handleGoogleLogin}
                    >
                        {/* You can add Google icon here */}
                        <Text className="text-gray-700 text-base font-semibold">
                            Continue with Google
                        </Text>
                    </TouchableOpacity>

                    {/* Toggle Auth Mode */}
                    <View className="flex-row justify-center">
                        <Text className="text-gray-600 text-sm">
                            {authMode === 'register'
                                ? 'Already have an account? '
                                : "Don't have an account? "
                            }
                        </Text>
                        <TouchableOpacity onPress={toggleAuthMode}>
                            <Text style={{ color: '#FFAB00' }} className="text-sm font-semibold">
                                {authMode === 'register' ? 'Sign In' : 'Sign Up'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AuthScreen;