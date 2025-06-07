import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import NameScreen from '../screens/onboarding/NameScreen';
import LocationScreen from '../screens/onboarding/LocationScreen';
import ContactScreen from '../screens/onboarding/ContactScreen';
import FinishScreen from '../screens/onboarding/FinishScreen';

const Stack = createStackNavigator();

export default function OnboardingNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Name" component={NameScreen} />
      {/* <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="Finish" component={FinishScreen} /> */}
    </Stack.Navigator>
  );
}