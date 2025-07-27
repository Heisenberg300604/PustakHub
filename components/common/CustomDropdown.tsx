import { ChevronDown, LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { DropdownOption } from '../../types/dropdown';

interface CustomDropdownProps {
  label?: string;
  value: string;
  placeholder: string;
  options: DropdownOption[];
  onSelect: (value: string) => void;
  icon?: LucideIcon;
  required?: boolean;
  error?: string;
}

export const CustomDropdown: React.FC<CustomDropdownProps> = ({
  label,
  value,
  placeholder,
  options,
  onSelect,
  icon: Icon,
  required,
  error,
}) => {
  const handlePress = () => {
    Alert.alert(
      'Select Option',
      'Dropdown functionality to be implemented with a proper modal or picker'
    );
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className="text-base font-semibold text-gray-700 mb-2">
          {label} {required && <Text className="text-red-500">*</Text>}
        </Text>
      )}
      <View className="relative">
        {Icon && (
          <View className="absolute left-4 top-4 z-10">
            <Icon color="#9ca3af" size={20} />
          </View>
        )}
        <TouchableOpacity
          className={`h-12 bg-gray-50 border border-gray-200 rounded-xl ${
            Icon ? 'pl-12' : 'pl-4'
          } pr-4 justify-between items-center flex-row focus:border-orange-500 ${
            error ? 'border-red-500' : ''
          }`}
          onPress={handlePress}
        >
          <Text className={value ? 'text-base text-gray-900' : 'text-base text-gray-400'}>
            {value || placeholder}
          </Text>
          <ChevronDown color="#9ca3af" size={20} />
        </TouchableOpacity>
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};