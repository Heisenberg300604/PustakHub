// BottomActions.tsx
import { CustomButton } from '@/components/common/CustomButton';
import React, { useState } from 'react';
import { View } from 'react-native';
import ContactSellerModal from './ContactSellerModal';

interface BottomActionsProps {
  seller: {
    name: string;
    city: string;
    phone: string | null;
    instagram: string | null;
    telegram: string | null;
    memberSince: string;
    totalBooks: number;
    avatar: string;
  };
  onReport: () => void;
  isFree?: boolean;
  isNegotiable?: boolean;
}

const BottomActions: React.FC<BottomActionsProps> = ({ 
  seller, 
  onReport, 
  isFree = false, 
  isNegotiable = false 
}) => {
  const [showModal, setShowModal] = useState(false);

  // Check if seller has any contact method available
  const hasContactMethod = seller.phone || seller.instagram || seller.telegram;

  return (
    <>
      <View className="bg-white px-5 py-4 border-t border-gray-100">
        <View className="flex-row gap-3">
          {/* Contact Seller/Donor Button */}
          <View className="flex-1">
            <CustomButton
              title={
                !hasContactMethod 
                  ? "Contact Info Not Available"
                  : isFree 
                    ? "Contact Donor" 
                    : "Contact Seller"
              }
              onPress={() => hasContactMethod && setShowModal(true)}
              variant="primary"
              size="lg"
              fullWidth
              disabled={!hasContactMethod}
            />
          </View>
        </View>
      </View>

      {/* Modal */}
      {hasContactMethod && (
        <ContactSellerModal
          visible={showModal}
          onClose={() => setShowModal(false)}
          seller={seller}
          isFree={isFree}
          isNegotiable={isNegotiable}
        />
      )}
    </>
  );
};

export default BottomActions;
