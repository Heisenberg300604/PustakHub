import React, { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity, TextInput, StyleSheet, Alert, Image } from 'react-native';
import { 
  User, 
  MapPin, 
  Phone, 
  Instagram, 
  MessageCircle, 
  BookOpen, 
  Heart, 
  ShoppingBag, 
  Edit3, 
  Calendar,
  ChevronRight
} from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: 'Priya Sharma',
    city: 'Delhi',
    phone: '+91 98765 43210',
    instagram: '@priya_studies',
    telegram: '@priyasharma',
    joinDate: 'January 2024'
  });

  const stats = {
    booksSold: 12,
    booksDonated: 8,
    booksBought: 15
  };

  // Sample books data (similar to mockBooks from old code)
  const userBooks = [
    { 
      id: 1, 
      title: 'HC Verma Physics Part 1', 
      examType: 'JEE',
      price: '₹450', 
      image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=300&fit=crop',
      status: 'Active'
    },
    { 
      id: 2, 
      title: 'NCERT Biology Class 12', 
      examType: 'NEET',
      price: '₹320', 
      image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=300&fit=crop',
      status: 'Active'
    },
    { 
      id: 3, 
      title: 'Arihant Chemistry', 
      examType: 'JEE',
      price: '₹280', 
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop',
      status: 'Sold'
    },
  ];

  const ProfileHeader = () => (
    <View style={styles.profileHeader}>
      <LinearGradient
        colors={['#fb923c', '#f97316']}
        style={styles.profileHeaderGradient}
      >
        <View style={styles.profileInfo}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <User color="white" size={32} />
            </View>
            <TouchableOpacity style={styles.editAvatarButton}>
              <Edit3 color="#3b82f6" size={14} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userDetails}>
            <Text style={styles.userName}>{userInfo.name}</Text>
            <View style={styles.locationContainer}>
              <MapPin color="rgba(255,255,255,0.8)" size={14} />
              <Text style={styles.userLocation}>{userInfo.city}</Text>
            </View>
            <View style={styles.joinDateContainer}>
              <Calendar color="rgba(255,255,255,0.8)" size={14} />
              <Text style={styles.joinDate}>Joined {userInfo.joinDate}</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.editProfileButton}
            onPress={() => setIsEditing(!isEditing)}
          >
            <Edit3 color="white" size={16} />
          </TouchableOpacity>
        </View>

        {/* Stats Row */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <ShoppingBag color="white" size={20} />
            <Text style={styles.statNumber}>{stats.booksSold}</Text>
            <Text style={styles.statLabel}>Sold</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Heart color="white" size={20} />
            <Text style={styles.statNumber}>{stats.booksDonated}</Text>
            <Text style={styles.statLabel}>Donated</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <BookOpen color="white" size={20} />
            <Text style={styles.statNumber}>{stats.booksBought}</Text>
            <Text style={styles.statLabel}>Bought</Text>
          </View>
        </View>
      </LinearGradient>
    </View>
  );

  const ContactInfo = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Contact Information</Text>
        {!isEditing && (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Edit3 color="#64748b" size={16} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.contactCard}>
        <View style={styles.contactItem}>
          <Phone color="#64748b" size={18} />
          <View style={styles.contactDetails}>
            <Text style={styles.contactLabel}>Phone Number</Text>
            {isEditing ? (
              <TextInput
                value={userInfo.phone}
                onChangeText={(text) => setUserInfo({...userInfo, phone: text})}
                style={styles.editInput}
              />
            ) : (
              <Text style={styles.contactValue}>{userInfo.phone}</Text>
            )}
          </View>
        </View>

        <View style={styles.contactItem}>
          <Instagram color="#64748b" size={18} />
          <View style={styles.contactDetails}>
            <Text style={styles.contactLabel}>Instagram</Text>
            {isEditing ? (
              <TextInput
                value={userInfo.instagram}
                onChangeText={(text) => setUserInfo({...userInfo, instagram: text})}
                style={styles.editInput}
              />
            ) : (
              <Text style={styles.contactValue}>{userInfo.instagram}</Text>
            )}
          </View>
        </View>

        <View style={styles.contactItem}>
          <MessageCircle color="#64748b" size={18} />
          <View style={styles.contactDetails}>
            <Text style={styles.contactLabel}>Telegram</Text>
            {isEditing ? (
              <TextInput
                value={userInfo.telegram}
                onChangeText={(text) => setUserInfo({...userInfo, telegram: text})}
                style={styles.editInput}
              />
            ) : (
              <Text style={styles.contactValue}>{userInfo.telegram}</Text>
            )}
          </View>
        </View>

        {isEditing && (
          <View style={styles.editActions}>
            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                setIsEditing(false);
                Alert.alert('Success', 'Profile updated successfully!');
              }}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );

  const MyBooks = () => (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>My Books ({userBooks.length})</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.booksContainer}>
        {userBooks.map((book) => (
          <View key={book.id} style={styles.bookCard}>
            <Image 
              source={{ uri: book.image }}
              style={styles.bookImage}
            />
            <View style={styles.bookInfo}>
              <Text style={styles.bookTitle}>{book.title}</Text>
              <View style={styles.bookBadge}>
                <Text style={styles.bookBadgeText}>{book.examType}</Text>
              </View>
              <View style={styles.bookFooter}>
                <Text style={styles.bookPrice}>{book.price}</Text>
                <View style={[styles.bookStatus, 
                  book.status === 'Active' ? styles.activeStatus : styles.soldStatus
                ]}>
                  <Text style={[styles.bookStatusText,
                    book.status === 'Active' ? styles.activeStatusText : styles.soldStatusText
                  ]}>
                    {book.status}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.bookAction}>
              <ChevronRight color="#9ca3af" size={16} />
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ProfileHeader />
        <ContactInfo />
        <MyBooks />
        
        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  profileHeader: {
    marginBottom: 20,
  },
  profileHeaderGradient: {
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    backgroundColor: '#fff7ed',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  userLocation: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    marginLeft: 4,
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinDate: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginLeft: 4,
  },
  editProfileButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 16,
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginHorizontal: 16,
  },
  section: {
    marginHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  viewAllText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '600',
  },
  contactCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  contactDetails: {
    flex: 1,
    marginLeft: 12,
  },
  contactLabel: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  editInput: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
    borderBottomWidth: 1,
    borderBottomColor: '#3b82f6',
    paddingBottom: 2,
  },
  editActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 12,
  },
  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  cancelButtonText: {
    color: '#64748b',
    fontWeight: '600',
  },
  saveButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#f97316',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  booksContainer: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  bookImage: {
    width: 56,
    height: 72,
    borderRadius: 8,
    backgroundColor: '#f1f5f9',
  },
  bookInfo: {
    flex: 1,
    marginLeft: 12,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
  },
  bookBadge: {
    backgroundColor: '#fff7ed',
    borderWidth: 1,
    borderColor: '#fed7aa',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  bookBadgeText: {
    fontSize: 12,
    color: '#ea580c',
    fontWeight: '500',
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bookPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#10b981',
  },
  bookStatus: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
  },
  activeStatus: {
    backgroundColor: '#dcfce7',
  },
  soldStatus: {
    backgroundColor: '#fef3c7',
  },
  bookStatusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeStatusText: {
    color: '#166534',
  },
  soldStatusText: {
    color: '#92400e',
  },
  bookAction: {
    padding: 8,
    marginLeft: 8,
  },
  bottomPadding: {
    height: 80,
  },
});

export default ProfileScreen;