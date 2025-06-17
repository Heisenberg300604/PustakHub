import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native';
import { Search, MapPin, Camera, User, BookOpen, Plus, Star, Heart, Clock, ShoppingCart } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import mockBooks from '../../data/book';
import { SafeAreaView } from 'react-native-safe-area-context';

const BrowseScreen = () => {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }} edges={['top', 'left', 'right']}>
      <LinearGradient 
        colors={['#f8fafc', '#fff7ed', '#fef3c7']}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Simple Header */}
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome Back, User</Text>
            {/* Enhanced Search Bar */}
            <View style={styles.searchWrapper}>
              <View style={styles.searchContainer}>
                <Search color="#64748b" size={20} style={styles.searchIcon} />
                <Text style={styles.searchPlaceholder}>Search books, exams, authors...</Text>
              </View>
            </View>
          </View>

          {/* Enhanced Filter Chips */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.filterContainer}
            contentContainerStyle={styles.filterContentContainer}
          >
            {['All', 'JEE', 'NEET', 'CAT', 'UPSC', 'Free'].map((filter, index) => (
              <TouchableOpacity
                key={filter}
                style={[
                  styles.filterChip,
                  filter === 'All' ? styles.activeFilter : styles.inactiveFilter
                ]}
              >
                {filter === 'All' ? (
                  <LinearGradient
                    colors={['#f97316', '#fb923c']}
                    style={styles.activeFilterGradient}
                  >
                    <Text style={styles.activeFilterText}>{filter}</Text>
                  </LinearGradient>
                ) : (
                  <Text style={styles.inactiveFilterText}>{filter}</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Enhanced Books Grid */}
          <View style={styles.booksGrid}>
            {mockBooks.map((book, index) => (
              <TouchableOpacity key={book.id} style={styles.bookCard} activeOpacity={0.9}>
                <LinearGradient
                  colors={['#ffffff', '#f8fafc']}
                  style={styles.bookCardGradient}
                >
                  {/* Book Image Container */}
                  <View style={styles.bookImageContainer}>
                    <Image 
                      source={{ uri: book.image }}
                      style={styles.bookImage}
                    />
                    <LinearGradient
                      colors={['transparent', 'rgba(0,0,0,0.1)']}
                      style={styles.imageOverlay}
                    />
                    
                    {/* Price Badge */}
                    <View style={styles.priceBadgeContainer}>
                      <View style={styles.priceBadgeBackground}>
                        <LinearGradient
                          colors={book.price === 'Free' ? ['#10b981', '#059669'] : ['#f97316', '#ea580c']}
                          style={styles.priceBadge}
                        >
                          <Text style={styles.priceText}>{book.price}</Text>
                        </LinearGradient>
                      </View>
                    </View>
                  </View>

                  {/* Book Info */}
                  <View style={styles.bookInfo}>
                    <Text style={styles.bookTitle} numberOfLines={2}>{book.title}</Text>
                    <Text style={styles.bookSeller}>by {book.seller}</Text>
                    
                    {/* Rating */}
                    <View style={styles.ratingContainer}>
                      <Star color="#fbbf24" size={12} fill="#fbbf24" />
                      <Text style={styles.ratingText}>4.{Math.floor(Math.random() * 9) + 1}</Text>
                      <Text style={styles.reviewCount}>({Math.floor(Math.random() * 500) + 50})</Text>
                    </View>
                    
                    <View style={styles.bookFooter}>
                      <View style={styles.examBadge}>
                        <Text style={styles.examText}>{book.examType}</Text>
                      </View>
                      
                      {/* Buy Button */}
                      <TouchableOpacity style={styles.buyButton} activeOpacity={0.8}>
                        <LinearGradient
                          colors={book.price === 'Free' ? ['#10b981', '#059669'] : ['#f97316', '#ea580c']}
                          style={styles.buyButtonGradient}
                        >
                          <ShoppingCart color="white" size={12} style={styles.buyIcon} />
                          <Text style={styles.buyButtonText}>
                            {book.price === 'Free' ? 'Get' : 'Buy'}
                          </Text>
                        </LinearGradient>
                      </TouchableOpacity>
                    </View>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
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
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 16,
  },
  profileButton: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  profileGradient: {
    width: 44,
    height: 44,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    marginHorizontal: 0,
  },
  searchContainer: {
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  searchIcon: {
    marginRight: 14,
  },
  searchPlaceholder: {
    flex: 1,
    color: '#64748b',
    fontSize: 16,
    fontWeight: '500',
  },
  filterButton: {
    padding: 4,
  },
  filterDots: {
    flexDirection: 'column',
    gap: 2,
  },
  filterDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: '#64748b',
  },
  filterContainer: {
    marginBottom: 16,
  },
  filterContentContainer: {
    paddingHorizontal: 16,
    gap: 8,
  },
  filterChip: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  activeFilter: {
    // Gradient will be applied inside
  },
  inactiveFilter: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  activeFilterGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  activeFilterText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  inactiveFilterText: {
    color: '#64748b',
    fontSize: 14,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    marginHorizontal: 16,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#e2e8f0',
  },
  statText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  bookCard: {
    width: '48%',
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    transform: [{ scale: 1 }],
  },
  bookCardGradient: {
    borderRadius: 20,
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 6,
  },
  bookImageContainer: {
    aspectRatio: 3/4,
    backgroundColor: '#f1f5f9',
    position: 'relative',
    overflow: 'hidden',
  },
  bookImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 30,
  },
  priceBadgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  priceBadgeBackground: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 16,
    padding: 2,
  },
  priceBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priceText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heartButton: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
  heartBackground: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookInfo: {
    padding: 16,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: 6,
    lineHeight: 20,
  },
  bookSeller: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#1e293b',
    fontWeight: '600',
  },
  reviewCount: {
    fontSize: 12,
    color: '#64748b',
  },
  bookFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  examBadge: {
    backgroundColor: '#fff7ed',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  examText: {
    fontSize: 12,
    color: '#ea580c',
    fontWeight: '600',
  },
  buyButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  buyButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
  },
  buyIcon: {
    marginRight: 2,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
  },
  viewButton: {
    borderRadius: 8,
    overflow: 'hidden',
  },
  viewButtonGradient: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  viewButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 24,
    borderRadius: 28,
    overflow: 'hidden',
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#f97316',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
});

export default BrowseScreen;