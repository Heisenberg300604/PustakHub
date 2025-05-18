import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SplashScreen from './screens/SplashScreen';

export default function App() {
  return (
    <>
      {/* <Text>Welcome to PustakHub !</Text>
      <StatusBar style="auto" /> */}
      <SplashScreen />
    </>
  );
}
