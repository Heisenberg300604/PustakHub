import AuthButton from '@/components/auth/AuthButton';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthInput from '@/components/auth/AuthInput';
import ToggleAuthMode from '@/components/auth/ToggleAuthMode';
import { supabase } from '@/lib/supabase';
import { getProfile, signIn, signUp } from '@/services/authService';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, SafeAreaView, View } from 'react-native';

const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const AuthScreen = () => {
    const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleEmailAuth = async () => {
        if (!validateEmail(email)) return Alert.alert('Invalid email');
        if (password.length < 6) return Alert.alert('Password too short');
        if (authMode === 'register' && password !== confirmPassword) {
            return Alert.alert("Passwords don't match");
        }

        setLoading(true);

        try {
            if (authMode === 'register') {
                // SIGN UP
                const { user, error } = await signUp(email, password);
                if (error) throw error;

                // Push directly to onboarding to fill profile info
                router.push('/(onboarding)/NameScreen');
            } else {
                // SIGN IN
                const { user, error } = await signIn(email, password);
                if (error) throw error;
                if (!user) throw new Error('No user found');

                // Check profile completeness (e.g., name/city filled)
                const { data: profile, error: profileError } = await getProfile(user.id);
                if (profileError) throw profileError;

                if (!profile?.name || !profile?.city) {
                    // Incomplete onboarding
                    router.push('/(onboarding)/NameScreen');
                } else {
                    // Profile is complete -> go to app
                    router.replace('/(tabs)/BrowseScreen');
                }
            }
            // just to ensure we have the session
            const { data: { session }, error } = await supabase.auth.getSession();
            console.log('Session:', session);
        } catch (error: any) {
            Alert.alert('Auth Error', error.message);
        } finally {
            setLoading(false);
        }

    };

    return (
        <SafeAreaView className="flex-1 bg-gray-50">
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} className="flex-1">
                <View style={{ paddingHorizontal: 24, paddingTop: 24 }} className="flex-1">
                    <AuthHeader mode={authMode} />

                    <View style={{ width: 100, height: 100, marginBottom: 40 }} className="justify-center items-center self-center">
                        <Image source={require('../../assets/book.png')} style={{ width: '100%', height: '100%' }} resizeMode="contain" />
                    </View>

                    <AuthInput label="Email Address" icon="mail-outline" value={email} onChange={setEmail} validate={validateEmail} />
                    <AuthInput label="Password" icon="lock-closed-outline" value={password} onChange={setPassword} isPassword />

                    {authMode === 'register' && (
                        <AuthInput
                            label="Confirm Password"
                            icon="lock-closed-outline"
                            value={confirmPassword}
                            onChange={setConfirmPassword}
                            isPassword
                            showValidation={false}
                        />
                    )}

                    <AuthButton title={authMode === 'register' ? 'Create Account' : 'Sign In'} onPress={handleEmailAuth} />
                    <ToggleAuthMode mode={authMode} onToggle={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} />
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default AuthScreen;
