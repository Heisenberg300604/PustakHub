import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';

const SplashScreen = () => {

    const [fontsLoaded] = useFonts({
    'JockeyOne': require('../assets/fonts/JockeyOne-Regular.ttf'),
  });
  
  if (!fontsLoaded) {
  return null;
}
//   const navigation = useNavigation();
  
//   useEffect(() => {
//     // Simulate splash screen delay of 2.5 seconds
//     const timer = setTimeout(() => {
//       navigation.reset({
//         index: 0,
//         routes: [{ name: 'Auth' }],
//       });
//     }, 2500);
    
//     return () => clearTimeout(timer);
//   }, [navigation]);
  
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>PustakHub</Text>
      </View>
      
      <View style={styles.taglineContainer}>
        <Text style={styles.taglineBlue}>Exchange</Text>
        <Text style={styles.taglineRed}>Knowledge,</Text>
        <Text style={styles.taglineBlack}>Not Just Books</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#E49B0F', // Gold/orange color similar to the original
    // Note: You would use the actual font here once imported properly
    fontFamily: 'JockeyOne',
  },
  taglineContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  taglineBlue: {
    fontSize: 22,
    fontWeight: '600',
    color: '#0F86E4', // Blue color matching the top book
    marginBottom: 4,
  },
  taglineRed: {
    fontSize: 22,
    fontWeight: '600',
    color: '#E4340F', // Red color matching the middle book
    marginBottom: 4,
  },
  taglineBlack: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
  },
});

export default SplashScreen;