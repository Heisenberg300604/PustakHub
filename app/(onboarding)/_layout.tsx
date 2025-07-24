import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="NameScreen" />
      <Stack.Screen name="screen2" />
      <Stack.Screen name="screen3" />
    </Stack>
  );
}
