import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  required?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  icon: Icon,
  error,
  required,
  className,
  ...props
}) => {
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
        <TextInput
          className={`h-12 bg-gray-50 border border-gray-200 rounded-xl px-4 text-base text-gray-900 focus:border-orange-500 focus:bg-white ${
            Icon ? 'pl-12' : ''
          } ${error ? 'border-red-500' : ''} ${className || ''}`}
          placeholderTextColor="#9ca3af"
          {...props}
        />
      </View>
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}
    </View>
  );
};
