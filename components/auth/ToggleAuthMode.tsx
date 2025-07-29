import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Props {
  mode: 'login' | 'register';
  onToggle: () => void;
}

const ToggleAuthMode: React.FC<Props> = ({ mode, onToggle }) => {
  return (
    <View className="flex-row justify-center">
      <Text className="text-gray-600 text-sm">
        {mode === 'register' ? 'Already have an account? ' : "Don't have an account? "}
      </Text>
      <TouchableOpacity onPress={onToggle}>
        <Text style={{ color: '#FFAB00' }} className="text-sm font-semibold">
          {mode === 'register' ? 'Sign In' : 'Sign Up'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToggleAuthMode;
