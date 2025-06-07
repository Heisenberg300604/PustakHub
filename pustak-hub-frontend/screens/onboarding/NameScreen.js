import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function NameScreen({ navigation }) {
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.trim()) {
      // Save name to context or storage
      navigation.navigate('Location');
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <Text style={{ fontSize: 24 }}>What's your name?</Text>
      <TextInput
        style={{ borderBottomWidth: 1, marginTop: 20 }}
        placeholder="Your name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}
