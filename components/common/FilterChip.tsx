import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface FilterChipProps {
  label: string;
  isSelected: boolean;
  onPress: () => void;
}

export const FilterChip: React.FC<FilterChipProps> = ({ label, isSelected, onPress }) => {
  return (
    <TouchableOpacity
      className={`px-5 py-3 rounded-full ${
        isSelected
          ? 'bg-orange-500 shadow-lg shadow-orange-500/25'
          : 'bg-white border border-gray-200 shadow-sm'
      }`}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text
        className={`text-sm font-semibold whitespace-nowrap ${
          isSelected ? 'text-white' : 'text-gray-600'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};