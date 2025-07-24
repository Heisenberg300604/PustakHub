import { router } from 'expo-router';
import { useEffect } from 'react';
import SplashScreen from './SplashScreen';

export default function Index() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace('/(auth)/AuthScreen');
    }, 2500); // 2 seconds splash

    return () => clearTimeout(timeout);
  }, []);

  return (
    <SplashScreen />
  );
}
