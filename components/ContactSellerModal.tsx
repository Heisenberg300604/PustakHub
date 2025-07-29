import { Instagram, MessageCircle, Phone, X } from 'lucide-react-native';
import React from 'react';
import { Linking, Modal, Text, TouchableOpacity, View } from 'react-native';

interface ContactSellerModalProps {
  visible: boolean;
  onClose: () => void;
  seller: {
    phone: string;
    instagram?: string;
    telegram?: string;
  };
}

const ContactSellerModal: React.FC<ContactSellerModalProps> = ({
  visible,
  onClose,
  seller,
}) => {
  const handleContact = (method: 'phone' | 'instagram' | 'telegram') => {
    switch (method) {
      case 'phone':
        Linking.openURL(`tel:${seller.phone}`);
        break;
      case 'instagram':
        Linking.openURL(
          `https://instagram.com/${seller.instagram?.replace('@', '')}`
        );
        break;
      case 'telegram':
        Linking.openURL(
          `https://t.me/${seller.telegram?.replace('@', '')}`
        );
        break;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white rounded-t-2xl p-6">
          {/* Header */}
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-gray-900">
              Contact Seller
            </Text>
            <TouchableOpacity onPress={onClose}>
              <X size={20} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Options */}
          <View className="gap-3">
            {/* Phone */}
            <TouchableOpacity
              onPress={() => handleContact('phone')}
              className="flex-row items-center gap-3 p-4 bg-green-50 rounded-xl"
            >
              <Phone color="#10b981" size={20} />
              <Text className="text-base text-green-800">Call {seller.phone}</Text>
            </TouchableOpacity>

            {/* Instagram */}
            {seller.instagram && (
              <TouchableOpacity
                onPress={() => handleContact('instagram')}
                className="flex-row items-center gap-3 p-4 bg-pink-50 rounded-xl"
              >
                <Instagram color="#ec4899" size={20} />
                <Text className="text-base text-pink-800">
                  Instagram {seller.instagram}
                </Text>
              </TouchableOpacity>
            )}

            {/* Telegram */}
            {seller.telegram && (
              <TouchableOpacity
                onPress={() => handleContact('telegram')}
                className="flex-row items-center gap-3 p-4 bg-blue-50 rounded-xl"
              >
                <MessageCircle color="#3b82f6" size={20} />
                <Text className="text-base text-blue-800">
                  Telegram {seller.telegram}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ContactSellerModal;
