import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  loading?: boolean;
}

const AuthButton: React.FC<Props> = ({ title, onPress, loading = false }) => {
  return (
    <TouchableOpacity
      style={{
        height: 54,
        borderRadius: 27,
        shadowColor: '#FFAB00',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 6,
      }}
      className="w-full overflow-hidden mt-2 mb-6"
      activeOpacity={0.85}
      onPress={onPress}
      disabled={loading}
    >
      <LinearGradient
        colors={['#FFBB34', '#FFA000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center', borderRadius: 27 }}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-white text-base font-bold tracking-wide">{title}</Text>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default AuthButton;
