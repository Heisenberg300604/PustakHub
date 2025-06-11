import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Animated,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function FinishScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const navigation = useNavigation();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGetStarted = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FAFAFA" />
      
      <Animated.View 
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }]
          }
        ]}
      >
        {/* Main Title */}
        <Text style={styles.title}>You're All Set!</Text>
        
        {/* Tick Image Container */}
        <View style={styles.imageContainer}>
          {/* Replace this View with your Image component */}
          <View style={styles.imagePlaceholder}>
          <Image 
            source={require('../../assets/done.png')} 
            style={styles.tickImage}
            resizeMode="contain"
          />
          </View>
          {/* <View style={styles.imagePlaceholder}> */}
            {/* <Text style={styles.placeholderText}>Your Tick Image Here</Text>
            <Text style={styles.dimensionsText}>Dimensions: 200x200</Text> */}
          {/* </View> */}
        </View>
        
        {/* Simple Feature List */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.featureText}>Buy & Sell Books</Text>
          </View>
          <View style={styles.featureItem}>
            <View style={styles.bulletPoint} />
            <Text style={styles.featureText}>Donate Books</Text>
          </View>
        </View>
        
        {/* Get Started Button */}
        <TouchableOpacity 
          style={styles.buttonContainer} 
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#FFB84D', '#FF9500']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Let's Get Started</Text>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#FF9500',
    textAlign: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    marginBottom: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Use this for your actual image
  tickImage: {
    width: 130,
    height: 130,
  },
  // Remove this placeholder once you add your image
  imagePlaceholder: {
    width: 200,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginBottom: 5,
  },
  dimensionsText: {
    fontSize: 12,
    color: '#BBB',
    textAlign: 'center',
  },
  featuresContainer: {
    alignItems: 'flex-start',
    marginBottom: 60,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  bulletPoint: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFB84D',
    marginRight: 15,
  },
  featureText: {
    fontSize: 18,
    color: '#555',
    fontWeight: '500',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: '#FF9500',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});