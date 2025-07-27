import { LucideIcon } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  disabled = false,
  fullWidth = false,
}) => {
  const getButtonStyles = () => {
    const baseStyles = 'rounded-xl flex-row items-center justify-center';
    const sizeStyles = {
      sm: 'px-3 py-2',
      md: 'px-4 py-3',
      lg: 'px-6 py-4',
    };
    const variantStyles = {
      primary: 'bg-orange-500 shadow-lg shadow-orange-500/25',
      secondary: 'bg-gray-100 border border-gray-200',
      success: 'bg-emerald-500 shadow-lg shadow-emerald-500/25',
      outline: 'border-2 border-orange-500 bg-transparent',
    };
    
    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${
      fullWidth ? 'w-full' : ''
    } ${disabled ? 'opacity-50' : ''}`;
  };

  const getTextStyles = () => {
    const baseStyles = 'font-semibold';
    const sizeStyles = {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    };
    const variantStyles = {
      primary: 'text-white',
      secondary: 'text-gray-700',
      success: 'text-white',
      outline: 'text-orange-500',
    };
    
    return `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]}`;
  };

  return (
    <TouchableOpacity
      className={getButtonStyles()}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {Icon && (
        <Icon
          size={size === 'sm' ? 16 : size === 'md' ? 20 : 24}
          color={variant === 'outline' ? '#f97316' : variant === 'secondary' ? '#374151' : '#ffffff'}
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={getTextStyles()}>{title}</Text>
    </TouchableOpacity>
  );
};