import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NameScreen" />
      <Stack.Screen name="ContactScreen" />
      <Stack.Screen name="LocationScreen" />
      <Stack.Screen name="FinishScreen" />
    </Stack>
  );
}
