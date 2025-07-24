import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen name="BrowseScreen" options={{ title: 'Home' }} />
      <Tabs.Screen name="SellBookScreen" options={{ title: 'Sell Book' }} />
      <Tabs.Screen name="DonateBookScreen" options={{ title: 'Donate' }} />
      <Tabs.Screen name="ProfileScreen" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
