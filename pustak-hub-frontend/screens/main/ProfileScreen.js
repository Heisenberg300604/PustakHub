import React from 'react';
import { View, ScrollView, Text, TouchableOpacity, Image, TextInput, StyleSheet } from 'react-native';
import { ChevronLeft, User } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import mockBooks from '../../data/book';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'listings', title: 'My Listings' },
    { key: 'profile', title: 'Edit Profile' },
  ]);

  const ListingsRoute = () => (
    <View style={styles.tabContent}>
      <View style={styles.listingsHeader}>
        <Text style={styles.listingsTitle}>Your Books (3)</Text>
        {/* <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ Add New</Text>
        </TouchableOpacity> */}
      </View>

      {mockBooks.map((book) => (
        <View key={book.id} style={styles.listingCard}>
          <Image 
            source={{ uri: book.image }}
            style={styles.listingImage}
          />
          <View style={styles.listingInfo}>
            <Text style={styles.listingTitle}>{book.title}</Text>
            <View style={styles.listingBadge}>
              <Text style={styles.listingBadgeText}>{book.examType}</Text>
            </View>
            <View style={styles.listingFooter}>
              <Text style={styles.listingPrice}>{book.price}</Text>
              <View style={styles.listingStatus}>
                <Text style={styles.listingStatusText}>Active</Text>
              </View>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const EditProfileRoute = () => (
    <View style={styles.tabContent}>
      <View style={styles.profileForm}>
        <View style={styles.formGroup}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            defaultValue="Arjun Kumar"
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Location</Text>
          <TextInput
            defaultValue="Mumbai, Maharashtra"
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>WhatsApp Number</Text>
          <TextInput
            placeholder="+91 98765 43210"
            style={styles.input}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Instagram Handle</Text>
          <TextInput
            placeholder="@username"
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderScene = SceneMap({
    listings: ListingsRoute,
    profile: EditProfileRoute,
  });

  return (
    <SafeAreaView style ={{ flex: 1 ,backgroundColor: '#f0f9ff'}}>
    
      <ScrollView contentContainerStyle={styles.scrollContainer}>

        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>U</Text>
          </View>
          <Text style={styles.profileName}>User</Text>
          <Text style={styles.profileLocation}>📍 Delhi, India</Text>
          {/* <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>Verified Student</Text>
          </View> */}
        </View>

        <View style={styles.tabContainer}>
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: Dimensions.get('window').width - 32 }}
            renderTabBar={props => (
              <TabBar
                {...props}
                indicatorStyle={styles.tabIndicator}
                style={styles.tabBar}
                labelStyle={styles.tabLabel}
                activeColor="#3b4567"
                inactiveColor="#6b7280"
              />
            )}
          />
        </View>
      </ScrollView>
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
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 16,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f97316',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  profileLocation: {
    color: '#6b7280',
    marginBottom: 8,
  },
  verifiedBadge: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifiedText: {
    color: '#166534',
    fontSize: 12,
  },
  tabContainer: {
    height:700,
  },
  tabBar: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    marginBottom: 16,
  },
  tabIndicator: {
    backgroundColor: '#3b82f6',
    height: '100%',
    borderRadius: 8,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  tabContent: {
    flex: 1,
  },
  listingsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listingsTitle: {
    fontWeight: '600',
    color: '#1f2937',
  },
  addButton: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  addButtonText: {
    color: '#4b5563',
    fontSize: 14,
  },
  listingCard: {
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  listingImage: {
    width: 64,
    height: 80,
    borderRadius: 8,
  },
  listingInfo: {
    flex: 1,
    marginLeft: 12,
  },
  listingTitle: {
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  listingBadge: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  listingBadgeText: {
    fontSize: 12,
    color: '#4b5563',
  },
  listingFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listingPrice: {
    fontWeight: '600',
    color: '#10b981',
  },
  listingStatus: {
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  listingStatusText: {
    fontSize: 12,
    color: '#4b5563',
  },
  profileForm: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  formGroup: {
    marginBottom: 16,
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
  saveButton: {
    height: 48,
    backgroundColor: '#3b82f6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '500',
  },
});

export default ProfileScreen;