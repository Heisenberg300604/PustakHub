import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import SplashScreen from '../screens/SplashScreen';
import OnboardingNavigator from './OnboardingNavigator';
// import { AuthProvider } from '../context/AuthContext';

const RootStack = createStackNavigator();

const AppNavigator = () => {
  return (
    // <AuthProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Splash" component={SplashScreen} />
          <RootStack.Screen name="Auth" component={AuthNavigator} />
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
          <RootStack.Screen name="Main" component={MainNavigator} />
        </RootStack.Navigator>
      </NavigationContainer>
    // </AuthProvider>
  );
};

export default AppNavigator;