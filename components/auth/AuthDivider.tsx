import React from 'react';
import { Text, View } from 'react-native';

const AuthDivider = () => {
  return (
    <View className="flex-row items-center w-full mb-6">
      <View className="flex-1 h-px bg-gray-300" />
      <Text className="mx-4 text-gray-500 text-sm font-medium">OR</Text>
      <View className="flex-1 h-px bg-gray-300" />
    </View>
  );
};

export default AuthDivider;
