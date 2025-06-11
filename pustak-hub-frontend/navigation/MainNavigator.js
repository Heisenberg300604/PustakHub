import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const BrowseStack = createStackNavigator();
// const ChatStack = createStackNavigator(); // will be added later in v2
const ProfileStack = createStackNavigator();
import BrowseScreen from '../screens/main/BrowseScreen';
import SellScreen from '../screens/main/SellScreen';
import DonateScreen from '../screens/main/DonateScreen';
import ProfileScreen from '../screens/main/ProfileScreen';

const BrowseStackNavigator = () => {
    return (
      <BrowseStack.Navigator>
        <BrowseStack.Screen 
          name="Browse" 
          component={BrowseScreen} 
          options={{ title: 'Browse Books' }}
        />
        {/* Add detailed book view and other related screens here */}
      </BrowseStack.Navigator>
    );
  };

//   const ChatStackNavigator = () => {
//     return (
//       <ChatStack.Navigator>
//         <ChatStack.Screen 
//           name="ChatsList" 
//           component={ChatScreen} 
//           options={{ title: 'Messages' }}
//         />
//         {/* Add individual chat screens here */}
//       </ChatStack.Navigator>
//     );
//   };


const MainNavigator = () => {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
  
            if (route.name === 'Browse') {
              iconName = focused ? 'book-open-variant' : 'book-open-outline';
            } else if (route.name === 'Sell') {
              iconName = focused ? 'tag' : 'tag-outline';
            } else if (route.name === 'Donate') {
              iconName = focused ? 'gift' : 'gift-outline';
            } 
            // else if (route.name === 'Chat') {
            //   iconName = focused ? 'message' : 'message-outline';
            // } 
            else if (route.name === 'Profile') {
              iconName = focused ? 'account' : 'account-outline';
            }
  
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#E49B0F', // Gold color for active tabs
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            elevation: 10,
            backgroundColor: 'white',
            height: 60,
            paddingBottom: 10,
            paddingTop: 5,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Browse" component={BrowseStackNavigator} />
        <Tab.Screen name="Sell" component={SellScreen} />
        <Tab.Screen name="Donate" component={DonateScreen} />
        {/* <Tab.Screen name="Chat" component={ChatStackNavigator} /> */}
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  };
  
  export default MainNavigator;