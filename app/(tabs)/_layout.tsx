import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#E49B0F', // Gold color for active tabs
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          elevation: 10,
          backgroundColor: 'white',
          height: 60,
          paddingBottom: 10,
          paddingTop: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 5,
          },
          shadowOpacity: 0.34,
          shadowRadius: 6.27,
        },
      }}
    >
      <Tabs.Screen 
        name="BrowseScreen" 
        options={{ 
          title: 'Browse',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons 
              name={focused ? 'book-open-variant' : 'book-open-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="SellScreen" 
        options={{ 
          title: 'Sell',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons 
              name={focused ? 'tag' : 'tag-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="DonateScreen" 
        options={{ 
          title: 'Donate',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons 
              name={focused ? 'gift' : 'gift-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
      <Tabs.Screen 
        name="ProfileScreen" 
        options={{ 
          title: 'Profile',
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons 
              name={focused ? 'account' : 'account-outline'} 
              size={size} 
              color={color} 
            />
          ),
        }} 
      />
    </Tabs>
  );
}