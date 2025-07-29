import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  label: string;
  icon: string;
  value: string;
  onChange: (text: string) => void;
  isPassword?: boolean;
  validate?: (val: string) => boolean;
  showValidation?: boolean;
}

const AuthInput: React.FC<Props> = ({
  label,
  icon,
  value,
  onChange,
  isPassword = false,
  validate,
  showValidation = true,
}) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="w-full mb-4">
      <Text className="text-sm font-medium text-gray-700 mb-2 ml-1">{label}</Text>
      <View
        style={{
          borderWidth: 1.5,
          borderColor: focused ? '#FFAB00' : '#E5E7EB',
          backgroundColor: focused ? '#FFFBF0' : '#FFFFFF',
          shadowColor: focused ? '#FFAB00' : '#000',
          shadowOffset: { width: 0, height: focused ? 2 : 1 },
          shadowOpacity: focused ? 0.1 : 0.05,
          shadowRadius: focused ? 4 : 2,
          elevation: focused ? 3 : 1,
        }}
        className="h-14 rounded-xl px-4 flex-row items-center"
      >
        <Ionicons
          name={icon as any}
          size={20}
          color={focused ? '#FFAB00' : '#9CA3AF'}
          style={{ marginRight: 12 }}
        />
        <TextInput
          className="flex-1 text-base text-gray-900"
          placeholder={`Enter your ${label.toLowerCase()}`}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={isPassword && !showPassword}
          autoCapitalize="none"
          value={value}
          onChangeText={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons
              name={showPassword ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
        {!isPassword && showValidation && value.length > 0 && validate && (
          <Ionicons
            name={validate(value) ? 'checkmark-circle' : 'close-circle'}
            size={20}
            color={validate(value) ? '#10B981' : '#EF4444'}
          />
        )}
      </View>
    </View>
  );
};

export default AuthInput;
