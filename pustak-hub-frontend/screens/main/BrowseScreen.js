import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Search, MapPin, Camera, User, BookOpen, Plus } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BrowseScreen = () => {
  const mockBooks = [
    {
      id: 1,
      title: "JEE Main Physics Preparation",
      seller: "Arjun K.",
      examType: "JEE",
      price: "₹450",
      image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=250&fit=crop"
    },
    {
      id: 2,
      title: "NEET Biology Complete Guide",
      seller: "Priya S.",
      examType: "NEET",
      price: "Free",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=250&fit=crop"
    },
    {
      id: 3,
      title: "CAT Quantitative Aptitude",
      seller: "Rahul M.",
      examType: "CAT",
      price: "₹320",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=250&fit=crop"
    },
    {
      id: 4,
      title: "UPSC History Notes",
      seller: "Sita R.",
      examType: "UPSC",
      price: "Free",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=200&h=250&fit=crop"
    }
  ];

  return (
    <LinearGradient 
      colors={['#f0f9ff', '#ffedd5']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={styles.welcomeText}>Welcome User</Text>
          </View>
          
          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Search color="#9ca3af" size={16} style={styles.searchIcon} />
            <Text style={styles.searchPlaceholder}>Search books, exams, authors...</Text>
          </View>
        </View>

        {/* Filter Chips */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filterContainer}
        >
          {['All', 'JEE', 'NEET', 'CAT', 'UPSC', 'Free'].map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[
                styles.filterChip,
                filter === 'All' ? styles.activeFilter : styles.inactiveFilter
              ]}
            >
              <Text style={[
                styles.filterText,
                filter === 'All' ? styles.activeFilterText : styles.inactiveFilterText
              ]}>
                {filter}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Books Grid */}
        <View style={styles.booksGrid}>
          {mockBooks.map((book) => (
            <View key={book.id} style={styles.bookCard}>
              <View style={styles.bookImageContainer}>
                <Image 
                  source={{ uri: book.image }}
                  style={styles.bookImage}
                />
                <View style={[
                  styles.priceBadge,
                  book.price === 'Free' ? styles.freeBadge : styles.paidBadge
                ]}>
                  <Text style={styles.priceText}>{book.price}</Text>
                </View>
              </View>
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                <Text style={styles.bookSeller}>by {book.seller}</Text>
                <View style={styles.bookFooter}>
                  <View style={styles.examBadge}>
                    <Text style={styles.examText}>{book.examType}</Text>
                  </View>
                  <TouchableOpacity style={styles.viewButton}>
                    <Text style={styles.viewButtonText}>View</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setCurrentScreen('sell')}
      >
        <Plus color="white" size={24} />
      </TouchableOpacity>
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
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  userIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffedd5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    height: 48,
    backgroundColor: 'white',
    borderRadius: 12,
    paddingLeft: 40,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  searchIcon: {
    position: 'absolute',
    left: 12,
    top: 16,
  },
  searchPlaceholder: {
    color: '#9ca3af',
  },
  filterContainer: {
    marginBottom: 24,
  },
  filterChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  activeFilter: {
    backgroundColor: '#f97316',
  },
  inactiveFilter: {
    backgroundColor: 'white',
  },
  filterText: {
    fontSize: 14,
  },
  activeFilterText: {
    color: 'white',
  },
  inactiveFilterText: {
    color: '#4b5563',
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookCard: {
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  bookImageContainer: {
    aspectRatio: 3/4,
    backgroundColor: '#f3f4f6',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  bookImage: {
    width: '100%',
    height: '100%',
  },
  priceBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  freeBadge: {
    backgroundColor: '#10b981',
  },
  paidBadge: {
    backgroundColor: '#f97316',
  },
  priceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  bookSeller: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  examBadge: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  examText: {
    fontSize: 12,
    color: '#4b5563',
  },
  viewButton: {
    backgroundColor: '#3b82f6',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
  },
  fab: {
    position: 'absolute',
    bottom: 80,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f97316',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default BrowseScreen;