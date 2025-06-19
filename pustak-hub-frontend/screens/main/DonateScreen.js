import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Camera, ChevronDown, BookOpen, Tag, Heart, FileText, Gift, Star, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const DonateScreen = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [includeAnswerKey, setIncludeAnswerKey] = useState(false);
  const [allowPickup, setAllowPickup] = useState(false);

  const examTypes = ['JEE Main', 'JEE Advanced', 'NEET', 'UPSC', 'GATE', 'CAT', 'SSC', 'Board Exam', 'Other'];
  const bookConditions = ['Like New', 'Good', 'Fair', 'Poor'];
  const categories = ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'General Studies', 'Reasoning', 'English', 'Current Affairs', 'Other'];

  const renderDropdown = (value, placeholder, options, onSelect, icon) => (
    <View style={styles.dropdownContainer}>
      <View style={styles.dropdownIcon}>
        {icon}
      </View>
      <TouchableOpacity 
        style={styles.dropdown}
        onPress={() => {
          Alert.alert('Select Option', 'Dropdown functionality to be implemented');
        }}
      >
        <Text style={value ? styles.dropdownText : styles.dropdownPlaceholder}>
          {value || placeholder}
        </Text>
        <ChevronDown color="#9ca3af" size={20} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f0fdf4' }} edges={['top', 'left', 'right']}>
      <LinearGradient 
        colors={['#f0fdf4', '#ecfdf5']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Donate Your Book</Text>
            <Text style={styles.subtitle}>Help fellow students achieve their dreams</Text>
          </View>

          <View style={styles.formCard}>
            {/* Image Upload Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Book Photos</Text>
              <Text style={styles.sectionSubtitle}>Clear photos help students identify the right book</Text>
              
              <View style={styles.imageUploadGrid}>
                <TouchableOpacity style={styles.primaryImageUpload}>
                  <Camera color="#10b981" size={32} />
                  <Text style={styles.imageUploadText}>Add Main Photo</Text>
                  <Text style={styles.imageUploadSubtext}>Required</Text>
                </TouchableOpacity>
                
                <View style={styles.additionalPhotos}>
                  {[1, 2, 3].map((item) => (
                    <TouchableOpacity key={item} style={styles.additionalImageUpload}>
                      <Camera color="#9ca3af" size={20} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>

            {/* Book Details */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Book Information</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Book Title *</Text>
                <View style={styles.inputContainer}>
                  <BookOpen color="#9ca3af" size={20} style={styles.inputIcon} />
                  <TextInput
                    placeholder="e.g., HC Verma Physics Part 1"
                    style={styles.input}
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Author Name</Text>
                <TextInput
                  placeholder="e.g., H.C. Verma"
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Edition/Year</Text>
                <TextInput
                  placeholder="e.g., 2023 Edition"
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Publisher</Text>
                <TextInput
                  placeholder="e.g., Bharti Bhawan"
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                />
              </View>
            </View>

            {/* Category Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Category & Exam</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Exam Type *</Text>
                {renderDropdown(selectedExam, 'Select exam type', examTypes, setSelectedExam, <Tag color="#9ca3af" size={20} />)}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Subject Category *</Text>
                {renderDropdown(selectedCategory, 'Select subject', categories, setSelectedCategory, <BookOpen color="#9ca3af" size={20} />)}
              </View>
            </View>

            {/* Condition */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Book Condition</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Condition *</Text>
                {renderDropdown(selectedCondition, 'Select condition', bookConditions, setSelectedCondition, <Star color="#9ca3af" size={20} />)}
              </View>
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Book Details</Text>
                <View style={styles.textAreaContainer}>
                  <FileText color="#9ca3af" size={20} style={styles.textAreaIcon} />
                  <TextInput
                    placeholder="Describe the book condition, any highlights, notes, or special features. This helps students understand what they're getting."
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            </View>

            {/* Donation Preferences */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Donation Preferences</Text>
              
              <View style={styles.checkboxContainer}>
                <TouchableOpacity 
                  style={styles.checkbox}
                  onPress={() => setIncludeAnswerKey(!includeAnswerKey)}
                >
                  <View style={[styles.checkboxInner, includeAnswerKey && styles.checkboxActive]} />
                </TouchableOpacity>
                <View style={styles.checkboxContent}>
                  <Text style={styles.checkboxLabel}>Include solutions/answer key</Text>
                  <Text style={styles.checkboxSubtext}>If available with the book</Text>
                </View>
              </View>

              <View style={styles.checkboxContainer}>
                <TouchableOpacity 
                  style={styles.checkbox}
                  onPress={() => setAllowPickup(!allowPickup)}
                >
                  <View style={[styles.checkboxInner, allowPickup && styles.checkboxActive]} />
                </TouchableOpacity>
                <View style={styles.checkboxContent}>
                  <Text style={styles.checkboxLabel}>Available for pickup</Text>
                  <Text style={styles.checkboxSubtext}>Students can collect directly from you</Text>
                </View>
              </View>
            </View>

            {/* Target Student Message */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Message for Students (Optional)</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Motivational Message</Text>
                <View style={styles.textAreaContainer}>
                  <Heart color="#9ca3af" size={20} style={styles.textAreaIcon} />
                  <TextInput
                    placeholder="Write an encouraging message for the student who will receive this book..."
                    style={styles.textArea}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.9}>
              <LinearGradient
                colors={['#10b981', '#059669']}
                style={styles.submitButtonGradient}
              >
                <Gift color="white" size={20} style={styles.submitIcon} />
                <Text style={styles.submitButtonText}>Donate Book</Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Info color="#10b981" size={16} />
              <Text style={styles.infoText}>
                Your donation will help a fellow student in their exam preparation journey. All donations are completely free and help build our student community.
              </Text>
            </View>
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
    paddingBottom: 100,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'left',
  },
  formCard: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 16,
  },
  imageUploadGrid: {
    gap: 12,
  },
  primaryImageUpload: {
    height: 140,
    backgroundColor: '#d1fae5',
    borderWidth: 2,
    borderColor: '#a7f3d0',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    color: '#047857',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  imageUploadSubtext: {
    color: '#10b981',
    fontSize: 12,
    marginTop: 4,
  },
  additionalPhotos: {
    flexDirection: 'row',
    gap: 8,
  },
  additionalImageUpload: {
    flex: 1,
    height: 80,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 52,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  inputIcon: {
    position: 'absolute',
    right: 16,
    zIndex: 1,
  },
  dropdownContainer: {
    position: 'relative',
  },
  dropdown: {
    height: 52,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    paddingHorizontal: 48,
    paddingRight: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  dropdownIcon: {
    position: 'absolute',
    left: 16,
    top: 16,
    zIndex: 1,
  },
  dropdownText: {
    fontSize: 16,
    color: '#1e293b',
  },
  dropdownPlaceholder: {
    fontSize: 16,
    color: '#9ca3af',
  },
  textAreaContainer: {
    position: 'relative',
  },
  textArea: {
    height: 100,
    backgroundColor: '#f8fafc',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 12,
    padding: 16,
    paddingTop: 16,
    fontSize: 16,
    color: '#1e293b',
  },
  textAreaIcon: {
    position: 'absolute',
    right: 16,
    top: 16,
    zIndex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxInner: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  checkboxActive: {
    backgroundColor: '#10b981',
  },
  checkboxContent: {
    flex: 1,
  },
  checkboxLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 2,
  },
  checkboxSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
  submitButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 16,
  },
  submitButtonGradient: {
    height: 56,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  submitIcon: {
    marginRight: 4,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#ecfdf5',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#047857',
    marginLeft: 8,
    lineHeight: 20,
  },
});

export default DonateScreen;