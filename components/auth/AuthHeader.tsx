import React from 'react';
import { Text, View } from 'react-native';

interface Props {
  mode: 'login' | 'register';
}

const AuthHeader: React.FC<Props> = ({ mode }) => {
  return (
    <View>
      <Text className="text-3xl font-bold text-amber-500 mb-4 text-left tracking-wide">
        {mode === 'register' ? "Let's Get Started" : "Welcome Back"}
      </Text>
      <Text className="text-base text-gray-600 mb-8 text-left leading-6">
        {mode === 'register'
          ? 'Create your account to get started\nwith our amazing features.'
          : 'Sign in to your account to\ncontinue your journey.'}
      </Text>
    </View>
  );
};

export default AuthHeader;
