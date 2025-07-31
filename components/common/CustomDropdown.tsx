import { ChevronDown, LucideIcon } from 'lucide-react-native';
import React, { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
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
  const [isVisible, setIsVisible] = useState(false);

  const handlePress = () => {
    setIsVisible(true);
  };

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsVisible(false);
  };

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption ? selectedOption.label : placeholder;

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
          activeOpacity={0.7}
        >
          <Text className={value ? 'text-base text-gray-900' : 'text-base text-gray-400'}>
            {displayText}
          </Text>
          <ChevronDown color="#9ca3af" size={20} />
        </TouchableOpacity>
      </View>
      
      {error && <Text className="text-red-500 text-sm mt-1">{error}</Text>}

      {/* Modal for dropdown options */}
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setIsVisible(false)}
      >
        <Pressable 
          className="flex-1 bg-black/50 justify-center items-center"
          onPress={() => setIsVisible(false)}
        >
          <Pressable 
            className="bg-white rounded-2xl mx-6 max-h-96 w-80"
            onPress={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <View className="p-4 border-b border-gray-200">
              <Text className="text-lg font-semibold text-gray-900 text-center">
                {label || 'Select Option'}
              </Text>
            </View>

            {/* Options List */}
            <ScrollView className="max-h-80">
              {options.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  className={`p-4 border-b border-gray-100 ${
                    value === option.value ? 'bg-orange-50' : ''
                  }`}
                  onPress={() => handleSelect(option.value)}
                  activeOpacity={0.7}
                >
                  <Text 
                    className={`text-base ${
                      value === option.value 
                        ? 'text-orange-600 font-semibold' 
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Cancel Button */}
            <TouchableOpacity
              className="p-4 border-t border-gray-200"
              onPress={() => setIsVisible(false)}
              activeOpacity={0.7}
            >
              <Text className="text-center text-base text-gray-600 font-medium">
                Cancel
              </Text>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
      </View>
    );
  };