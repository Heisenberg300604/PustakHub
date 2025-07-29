import { Ionicons } from '@expo/vector-icons';
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
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
    const [emailFocused, setEmailFocused] = useState<boolean>(false);
    const [passwordFocused, setPasswordFocused] = useState<boolean>(false);
    const [confirmPasswordFocused, setConfirmPasswordFocused] = useState<boolean>(false);

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

    // Google SVG component
    const GoogleIcon = () => (
        <View style={{ width: 20, height: 20, marginRight: 12 }}>
            <View style={{ width: 20, height: 20 }}>
                {/* This is a simplified Google icon using basic shapes */}
                <View style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: '#4285f4',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>G</Text>
                </View>
            </View>
        </View>
    );

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
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
                    <Text className="text-base text-gray-600 mb-8 text-left leading-6">
                        {authMode === 'register'
                            ? 'Create your account to get started\nwith our amazing features.'
                            : 'Sign in to your account to\ncontinue your journey.'
                        }
                    </Text>

                    {/* Illustration Image */}
                    <View style={{ width: 100, height: 100, marginBottom: 40 }} className="justify-center items-center self-center">
                        <Image
                            source={require('../../assets/book.png')} // Replace with your actual image path
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Email Input */}
                    <View className="w-full mb-4">
                        <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Email Address</Text>
                        <View style={{
                            borderWidth: 1.5,
                            borderColor: emailFocused ? '#FFAB00' : (email ? '#E5E7EB' : '#E5E7EB'),
                            backgroundColor: emailFocused ? '#FFFBF0' : '#FFFFFF',
                            shadowColor: emailFocused ? '#FFAB00' : '#000',
                            shadowOffset: { width: 0, height: emailFocused ? 2 : 1 },
                            shadowOpacity: emailFocused ? 0.1 : 0.05,
                            shadowRadius: emailFocused ? 4 : 2,
                            elevation: emailFocused ? 3 : 1,
                        }} className="h-14 rounded-xl px-4 flex-row items-center">
                            <Ionicons
                                name="mail-outline"
                                size={20}
                                color={emailFocused ? '#FFAB00' : '#9CA3AF'}
                                style={{ marginRight: 12 }}
                            />
                            <TextInput
                                className="flex-1 text-base text-gray-900"
                                placeholder="Enter your email"
                                placeholderTextColor="#9CA3AF"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                onFocus={() => setEmailFocused(true)}
                                onBlur={() => setEmailFocused(false)}
                            />
                            {email.length > 0 && (
                                <Ionicons
                                    name={validateEmail(email) ? "checkmark-circle" : "close-circle"}
                                    size={20}
                                    color={validateEmail(email) ? "#10B981" : "#EF4444"}
                                />
                            )}
                        </View>
                    </View>

                    {/* Password Input */}
                    <View className="w-full mb-4">
                        <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Password</Text>
                        <View style={{
                            borderWidth: 1.5,
                            borderColor: passwordFocused ? '#FFAB00' : (password ? '#E5E7EB' : '#E5E7EB'),
                            backgroundColor: passwordFocused ? '#FFFBF0' : '#FFFFFF',
                            shadowColor: passwordFocused ? '#FFAB00' : '#000',
                            shadowOffset: { width: 0, height: passwordFocused ? 2 : 1 },
                            shadowOpacity: passwordFocused ? 0.1 : 0.05,
                            shadowRadius: passwordFocused ? 4 : 2,
                            elevation: passwordFocused ? 3 : 1,
                        }} className="h-14 rounded-xl px-4 flex-row items-center">
                            <Ionicons
                                name="lock-closed-outline"
                                size={20}
                                color={passwordFocused ? '#FFAB00' : '#9CA3AF'}
                                style={{ marginRight: 12 }}
                            />
                            <TextInput
                                className="flex-1 text-base text-gray-900"
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChangeText={setPassword}
                                onFocus={() => setPasswordFocused(true)}
                                onBlur={() => setPasswordFocused(false)}
                            />
                            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                <Ionicons
                                    name={showPassword ? "eye-off-outline" : "eye-outline"}
                                    size={20}
                                    color="#9CA3AF"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Confirm Password Input */}
                    {authMode === 'register' && (
                        <View className="w-full mb-6">
                            <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">Confirm Password</Text>
                            <View style={{
                                borderWidth: 1.5,
                                borderColor: confirmPasswordFocused ? '#FFAB00' : (confirmPassword ? '#E5E7EB' : '#E5E7EB'),
                                backgroundColor: confirmPasswordFocused ? '#FFFBF0' : '#FFFFFF',
                                shadowColor: confirmPasswordFocused ? '#FFAB00' : '#000',
                                shadowOffset: { width: 0, height: confirmPasswordFocused ? 2 : 1 },
                                shadowOpacity: confirmPasswordFocused ? 0.1 : 0.05,
                                shadowRadius: confirmPasswordFocused ? 4 : 2,
                                elevation: confirmPasswordFocused ? 3 : 1,
                            }} className="h-14 rounded-xl px-4 flex-row items-center">
                                <Ionicons
                                    name="lock-closed-outline"
                                    size={20}
                                    color={confirmPasswordFocused ? '#FFAB00' : '#9CA3AF'}
                                    style={{ marginRight: 12 }}
                                />
                                <TextInput
                                    className="flex-1 text-base text-gray-900"
                                    placeholder="Confirm your password"
                                    placeholderTextColor="#9CA3AF"
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    onFocus={() => setConfirmPasswordFocused(true)}
                                    onBlur={() => setConfirmPasswordFocused(false)}
                                />
                                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={{ marginRight: 8 }}>
                                    <Ionicons
                                        name={showConfirmPassword ? "eye-off-outline" : "eye-outline"}
                                        size={20}
                                        color="#9CA3AF"
                                    />
                                </TouchableOpacity>
                                {confirmPassword.length > 0 && (
                                    <Ionicons
                                        name={password === confirmPassword ? "checkmark-circle" : "close-circle"}
                                        size={20}
                                        color={password === confirmPassword ? "#10B981" : "#EF4444"}
                                    />
                                )}
                            </View>
                        </View>
                    )}

                    {/* Forgot Password Link (for login mode) */}
                    {authMode === 'login' && (
                        <View className="w-full mb-6">
                            <TouchableOpacity className="self-end">
                                <Text style={{ color: '#FFAB00' }} className="text-sm font-semibold">
                                    Forgot Password?
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}

                    {/* Submit Button */}
                    <TouchableOpacity
                        style={{
                            height: 54,
                            borderRadius: 27,
                            shadowColor: '#FFAB00',
                            shadowOffset: { width: 0, height: 4 },
                            shadowOpacity: 0.3,
                            shadowRadius: 8,
                            elevation: 6,
                        }}
                        className="w-full overflow-hidden mt-2 mb-6"
                        activeOpacity={0.85}
                        onPress={handleEmailAuth}
                    >
                        <LinearGradient
                            colors={['#FFBB34', '#FFA000']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 27 }}
                        >
                            <Text className="text-white text-base font-bold tracking-wide">
                                {authMode === 'register' ? 'Create Account' : 'Sign In'}
                            </Text>
                        </LinearGradient>
                    </TouchableOpacity>

                    {/* OR Divider */}
                    <View className="flex-row items-center w-full mb-6">
                        <View className="flex-1 h-px bg-gray-300" />
                        <Text className="mx-4 text-gray-500 text-sm font-medium">OR</Text>
                        <View className="flex-1 h-px bg-gray-300" />
                    </View>

                    {/* Google Sign In Button */}
                    <TouchableOpacity
                        style={{
                            height: 54,
                            borderWidth: 1.5,
                            borderColor: '#E5E7EB',
                            borderRadius: 27,
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 2 },
                            shadowOpacity: 0.05,
                            shadowRadius: 4,
                            elevation: 2,
                        }}
                        className="w-full flex-row justify-center items-center mb-8 bg-white"
                        activeOpacity={0.85}
                        onPress={handleGoogleLogin}
                    >
                        <Image
                            source={require('@/assets/Google-logo.svg.webp')}
                            style={{ width: 20, height: 20, marginRight: 12 }}
                            resizeMode="contain"
                        />
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