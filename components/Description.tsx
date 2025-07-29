import React from 'react';
import { Text, View } from 'react-native';

type DescriptionProps = {
  description: string;
  publisher: string;
  edition: string;
  condition: string;
  subject: string;
  examType: string;
};

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center">
    <Text className="text-base text-gray-600">{label}</Text>
    <Text className="text-base font-medium text-gray-900">{value}</Text>
  </View>
);

const Description: React.FC<DescriptionProps> = (props) => {
  return (
    <View className="bg-white mx-5 rounded-2xl p-6 shadow-lg shadow-gray-200/50 mb-6">
      <Text className="text-xl font-bold text-gray-900 mb-4">Description</Text>
      <Text className="text-base text-gray-700 leading-6">{props.description}</Text>
      
      <View className="mt-6 pt-6 border-t border-gray-100">
        <Text className="text-lg font-semibold text-gray-900 mb-4">Book Details</Text>
        <View className="space-y-3">
          <DetailRow label="Publisher" value={props.publisher} />
          <DetailRow label="Edition" value={props.edition} />
          <DetailRow label="Condition" value={props.condition} />
          <DetailRow label="Subject" value={props.subject} />
          <DetailRow label="Exam Type" value={props.examType} />
        </View>
      </View>
    </View>
  );
};

export default Description;
