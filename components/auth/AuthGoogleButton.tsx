import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

interface Props {
  onPress: () => void;
}

const AuthGoogleButton: React.FC<Props> = ({ onPress }) => {
  return (
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
      onPress={onPress}
    >
      <Image
        source={require('@/assets/Google-logo.svg.webp')}
        style={{ width: 20, height: 20, marginRight: 12 }}
        resizeMode="contain"
      />
      <Text className="text-gray-700 text-base font-semibold">Continue with Google</Text>
    </TouchableOpacity>
  );
};

export default AuthGoogleButton;
