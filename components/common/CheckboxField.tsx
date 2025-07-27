import { Check } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface CheckboxFieldProps {
  label: string;
  description?: string;
  checked: boolean;
  onToggle: () => void;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  label,
  description,
  checked,
  onToggle,
}) => {
  return (
    <View className="flex-row items-start mb-4">
      <TouchableOpacity
        className={`w-5 h-5 border-2 rounded-md mr-3 mt-0.5 justify-center items-center ${
          checked ? 'bg-orange-500 border-orange-500' : 'border-gray-300'
        }`}
        onPress={onToggle}
      >
        {checked && <Check color="white" size={14} />}
      </TouchableOpacity>
      <View className="flex-1">
        <Text className="text-base font-medium text-gray-700 mb-0.5">{label}</Text>
        {description && <Text className="text-sm text-gray-500">{description}</Text>}
      </View>
    </View>
  );
};