import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function NameScreen() {
  const [name, setName] = useState('');
  const navigation = useNavigation();

  const handleNext = () => {
    console.log('Name entered:', name);
    // Handle navigation to next screen
    navigation.navigate('Location');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />
      
      <View style={styles.content}>
        {/* Title */}
        <Text style={styles.title}>What's Your Name ?</Text>
        
        {/* Illustration */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/name.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
        
        {/* Input Field */}
        <TextInput
          style={styles.input}
          placeholder="Enter Your Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
        />
        
        {/* Next Button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={handleNext}>
          <LinearGradient
            colors={['#FFB84D', '#FF9500']}
            style={styles.button}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.buttonText}>Next</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFB84D',
    textAlign: 'center',
    marginBottom: 60,
    fontFamily: 'Inter-Bold',
  },
  imageContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  illustration: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  input: {
    width: '100%',
    height: 50,
    borderBottomWidth: 2,
    borderBottomColor: '#E5E5E5',
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 80,
    color: '#333',
  },
  buttonContainer: {
    width: '100%',
    borderRadius: 25,
    overflow: 'hidden',
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  bottomContainer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  indicator: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
});