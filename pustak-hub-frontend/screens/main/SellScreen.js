import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { MapPin, Camera, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const SellScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff7ed' }} edges={['top', 'left', 'right']}>
    <LinearGradient 
      colors={['#fff7ed', '#f0f9ff']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>💰 Sell a Book</Text>
          <Text style={styles.subtitle}>Turn your old books into cash</Text>
        </View>

        <View style={styles.card}>
          {/* Image Upload */}
          <View style={styles.section}>
            <Text style={styles.label}>Book Photo</Text>
            <TouchableOpacity style={styles.imageUpload}>
              <Camera color="#9ca3af" size={32} />
              <Text style={styles.imageUploadText}>Tap to add photo</Text>
            </TouchableOpacity>
          </View>

          {/* Book Title */}
          <View style={styles.section}>
            <Text style={styles.label}>Book Title</Text>
            <TextInput
              placeholder="e.g., Organic Chemistry for NEET"
              style={styles.input}
            />
          </View>

          {/* Exam Type */}
          <View style={styles.section}>
            <Text style={styles.label}>Exam Type</Text>
            <View style={styles.select}>
              <Text style={styles.selectPlaceholder}>Select exam</Text>
            </View>
          </View>

          {/* Price */}
          <View style={styles.section}>
            <Text style={styles.label}>Selling Price</Text>
            <View style={styles.priceInput}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                placeholder="0"
                style={[styles.input, { paddingLeft: 24 }]}
                keyboardType="numeric"
              />
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Book condition, year, any highlights or notes..."
              style={[styles.input, styles.textArea]}
              multiline
            />
          </View>

          {/* Location */}
          <View style={styles.section}>
            <Text style={styles.label}>Your Location</Text>
            <View style={styles.locationInput}>
              <MapPin color="#9ca3af" size={16} style={styles.locationIcon} />
              <TextInput
                placeholder="City, State"
                style={[styles.input, { paddingLeft: 32 }]}
              />
            </View>
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>💸 List for Sale</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  header: {
    marginBottom: 24,
  },
  backButton: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  section: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    height: 48,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  imageUpload: {
    height: 128,
    backgroundColor: '#f3f4f6',
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    color: '#9ca3af',
    marginTop: 8,
  },
  select: {
    height: 48,
    backgroundColor: '#f9fafb',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  selectPlaceholder: {
    color: '#9ca3af',
  },
  priceInput: {
    position: 'relative',
  },
  currencySymbol: {
    position: 'absolute',
    left: 12,
    top: 12,
    color: '#9ca3af',
    zIndex: 1,
  },
  locationInput: {
    position: 'relative',
  },
  locationIcon: {
    position: 'absolute',
    left: 12,
    top: 16,
    zIndex: 1,
  },
  submitButton: {
    height: 48,
    backgroundColor: '#f97316',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default SellScreen;