import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Camera, ChevronDown, BookOpen, Tag, IndianRupee, FileText, Package, Star, Info } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const SellScreen = () => {
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedCondition, setSelectedCondition] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDonation, setIsDonation] = useState(false);

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
          // Here you would implement a modal or picker
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top', 'left', 'right']}>
      <LinearGradient 
        colors={['#f8fafc', '#fff7ed']}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sell Your Book</Text>
            <Text style={styles.subtitle}>Help fellow students while earning money</Text>
          </View>

          <View style={styles.formCard}>
            {/* Image Upload Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Book Photos</Text>
              <Text style={styles.sectionSubtitle}>Add clear photos to attract more buyers</Text>
              
              <View style={styles.imageUploadGrid}>
                <TouchableOpacity style={styles.primaryImageUpload}>
                  <Camera color="#f97316" size={32} />
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

            {/* Condition & Pricing */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Condition & Pricing</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Book Condition *</Text>
                {renderDropdown(selectedCondition, 'Select condition', bookConditions, setSelectedCondition, <Star color="#9ca3af" size={20} />)}
              </View>

              {!isDonation && (
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Selling Price *</Text>
                  <View style={styles.priceInputContainer}>
                    <View style={styles.currencyContainer}>
                      <IndianRupee color="#9ca3af" size={18} />
                    </View>
                    <TextInput
                      placeholder="Enter amount"
                      style={[styles.input, styles.priceInput]}
                      keyboardType="numeric"
                      placeholderTextColor="#9ca3af"
                    />
                  </View>
                  <Text style={styles.helperText}>Set a competitive price to sell faster</Text>
                </View>
              )}
            </View>

            {/* Description */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Description</Text>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Book Details</Text>
                <View style={styles.textAreaContainer}>
                  <FileText color="#9ca3af" size={20} style={styles.textAreaIcon} />
                  <TextInput
                    placeholder="Describe the book condition, any highlights, missing pages, etc. Be honest to build trust with buyers."
                    style={styles.textArea}
                    multiline
                    numberOfLines={4}
                    textAlignVertical="top"
                    placeholderTextColor="#9ca3af"
                  />
                </View>
              </View>
            </View>

            {/* Additional Features */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Additional Information</Text>
              
              <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox}>
                  <View style={styles.checkboxInner} />
                </TouchableOpacity>
                <View style={styles.checkboxContent}>
                  <Text style={styles.checkboxLabel}>Include solutions/answer key</Text>
                  <Text style={styles.checkboxSubtext}>If available with the book</Text>
                </View>
              </View>

              <View style={styles.checkboxContainer}>
                <TouchableOpacity style={styles.checkbox}>
                  <View style={styles.checkboxInner} />
                </TouchableOpacity>
                <View style={styles.checkboxContent}>
                  <Text style={styles.checkboxLabel}>Negotiable price</Text>
                  <Text style={styles.checkboxSubtext}>Allow buyers to make offers</Text>
                </View>
              </View>
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton} activeOpacity={0.9}>
              <LinearGradient
                colors={isDonation ? ['#10b981', '#059669'] : ['#f97316', '#ea580c']}
                style={styles.submitButtonGradient}
              >
                <Package color="white" size={20} style={styles.submitIcon} />
                <Text style={styles.submitButtonText}>
                  {isDonation ? 'Donate Book' : 'List for Sale'}
                </Text>
              </LinearGradient>
            </TouchableOpacity>

            {/* Info Box */}
            <View style={styles.infoBox}>
              <Info color="#3b82f6" size={16} />
              <Text style={styles.infoText}>
                Be sure to add all the details of the book. This will help you get more buyers reach to you in no time.
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
  headerContent: {
    alignItems: 'center',
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
  toggleContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 24,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeToggle: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748b',
  },
  activeToggleText: {
    color: '#1e293b',
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
    backgroundColor: '#fef3c7',
    borderWidth: 2,
    borderColor: '#fed7aa',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUploadText: {
    color: '#ea580c',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 8,
  },
  imageUploadSubtext: {
    color: '#f97316',
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
  priceInputContainer: {
    position: 'relative',
  },
  currencyContainer: {
    position: 'absolute',
    left: 16,
    top: 17,
    zIndex: 1,
  },
  priceInput: {
    paddingLeft: 48,
  },
  helperText: {
    fontSize: 12,
    color: '#64748b',
    marginTop: 4,
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
    backgroundColor: '#f97316',
    borderRadius: 2,
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
    backgroundColor: '#eff6ff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1e40af',
    marginLeft: 8,
    lineHeight: 20,
  },
});

export default SellScreen;