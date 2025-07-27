import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

type Props = {
  label: string;
  onPress: () => void;
};

export const OnboardingButton = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity
      className="w-full h-[58px] bg-[#FF9500] rounded-[25px] items-center justify-center mt-[20px]"
      style={{
        shadowColor: '#FF9500',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text 
        className="text-white text-[18px] font-semibold"
        style={{ fontFamily: 'Inter-SemiBold' }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};