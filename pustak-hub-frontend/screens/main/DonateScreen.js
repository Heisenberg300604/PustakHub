import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { MapPin, Camera, ChevronLeft } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Switch } from 'react-native-switch';

const DonateScreen = () => {
  const [isDonateForFree, setIsDonateForFree] = useState(true);

  return (
    <LinearGradient 
      colors={['#f0fdf4', '#ecfdf5']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <TouchableOpacity 
            // onPress={() => setCurrentScreen('browse')}
            style={styles.backButton}
          >
            <ChevronLeft color="#4b5563" size={24} />
          </TouchableOpacity>
          <Text style={styles.title}>📖 Donate a Book</Text>
          <Text style={styles.subtitle}>Help a fellow student by donating your books</Text>
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
              placeholder="e.g., Physics for JEE Main"
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

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.label}>Description (Optional)</Text>
            <TextInput
              placeholder="Condition, highlights, any notes..."
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

          {/* Donate for Free Toggle */}
          <View style={styles.toggleContainer}>
            <View>
              <Text style={styles.toggleTitle}>Donate for Free</Text>
              <Text style={styles.toggleSubtitle}>Help students in need</Text>
            </View>
            <Switch
              value={isDonateForFree}
              onValueChange={setIsDonateForFree}
              circleSize={24}
              barHeight={28}
              circleBorderWidth={0}
              backgroundActive="#10b981"
              backgroundInactive="#e5e7eb"
              circleActiveColor="#ffffff"
              circleInActiveColor="#ffffff"
              changeValueImmediately={true}
            />
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>🎁 List for Donation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
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
  locationInput: {
    position: 'relative',
  },
  locationIcon: {
    position: 'absolute',
    left: 12,
    top: 16,
    zIndex: 1,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  toggleTitle: {
    fontWeight: '500',
    color: '#1f2937',
  },
  toggleSubtitle: {
    color: '#6b7280',
    fontSize: 12,
  },
  submitButton: {
    height: 48,
    backgroundColor: '#10b981',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default DonateScreen;