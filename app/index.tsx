import { supabase } from '@/lib/supabase'; // Adjust path to your supabase config
import { router } from 'expo-router';
import { useEffect } from 'react';
import SplashScreen from './SplashScreen';

export default function Index() {
  useEffect(() => {
    checkUserAndRedirect();
  }, []);

  const checkUserAndRedirect = async () => {
    try {
      // Small delay to show splash screen
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      // Check current session
      const { data: { session }, error } = await supabase.auth.getSession();
      
      console.log('Session check:', session); // Debug log
      console.log('Session error:', error); // Debug log
      
      if (error) {
        console.error('Auth error:', error);
        router.replace('/(auth)/AuthScreen');
        return;
      }

      if (session?.user) {
        console.log('User is logged in, checking profile...'); // Debug log
        
        // Import your getProfile function here
        const { getProfile } = require('@/services/authService'); // Adjust path as needed
        
        try {
          // Check profile completeness like in your AuthScreen
          const { data: profile, error: profileError } = await getProfile(session.user.id);
          
          if (profileError) {
            console.error('Profile error:', profileError);
            router.replace('/(auth)/AuthScreen');
            return;
          }

          if (!profile?.name || !profile?.city) {
            console.log('Profile incomplete, redirecting to onboarding');
            router.replace('/(onboarding)/NameScreen');
          } else {
            console.log('Profile complete, redirecting to browse');
            router.replace('/(tabs)/BrowseScreen');
          }
        } catch (profileError) {
          console.error('Error checking profile:', profileError);
          router.replace('/(auth)/AuthScreen');
        }
      } else {
        console.log('User not logged in, redirecting to auth'); // Debug log
        router.replace('/(auth)/AuthScreen');
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      router.replace('/(auth)/AuthScreen');
    }
  };

  return <SplashScreen />;
}