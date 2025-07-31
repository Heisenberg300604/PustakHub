import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import { ChevronRight, LogOut } from 'lucide-react-native';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

export const SettingsMenu: React.FC = () => {
  const handleSignOut = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              const { error } = await supabase.auth.signOut();
              if (error) {
                console.error('Error signing out:', error);
                Alert.alert('Error', 'Failed to sign out. Please try again.');
                return;
              }
              router.replace('/(auth)/AuthScreen');
            } catch (error) {
              console.error('Sign out error:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <View className="mx-5 mb-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Settings</Text>
      
      <View className="bg-white rounded-2xl shadow-lg shadow-gray-200/50 overflow-hidden">
        <TouchableOpacity
          className="flex-row items-center px-6 py-4 bg-red-50"
          onPress={handleSignOut}
        >
          <View className="w-10 h-10 rounded-xl justify-center items-center mr-4 bg-red-100">
            <LogOut color="#dc2626" size={18} />
          </View>
          <Text className="flex-1 text-base font-medium text-red-600">
            Sign Out
          </Text>
          <ChevronRight color="#dc2626" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};