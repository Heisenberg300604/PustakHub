import { CustomButton } from '@/components/common/CustomButton';
import React, { useState } from 'react';
import { View } from 'react-native';
import ContactSellerModal from './ContactSellerModal';

interface BottomActionsProps {
  seller: {
    phone: string;
    instagram?: string;
    telegram?: string;
  };
  onReport: () => void;
}

const BottomActions: React.FC<BottomActionsProps> = ({ seller, onReport }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <View className="bg-white px-5 py-4 border-t border-gray-100">
        <View className="flex-row gap-3">
          {/* Contact Seller */}
          <View className="flex-1">
            <CustomButton
              title="Contact Seller"
              onPress={() => setShowModal(true)}
              variant="primary"
              size="lg"
              fullWidth
            />
          </View>
        </View>
      </View>

      {/* Modal */}
      <ContactSellerModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        seller={seller}
      />
    </>
  );
};

export default BottomActions;
