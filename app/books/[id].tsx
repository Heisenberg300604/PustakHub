import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Linking, ScrollView, Share, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import BookInfo from '../../components/BookInfo';
import BottomActions from '../../components/BottomActions';
import Description from '../../components/Description';
import Header from '../../components/Header';
import ImageGallery from '../../components/ImageGallery';
import SellerInfo from '../../components/SellerInfo';

// Services
import { BookDetail, formatListingForUI, getListingDetail } from '@/services/listing/listingDetailService';

const BookDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch book details
  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!id) {
        setError('Book ID not provided');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const listing = await getListingDetail(id);
        
        if (!listing) {
          setError('Book not found or no longer available');
          return;
        }

        const formattedBook = formatListingForUI(listing);
        setBookDetail(formattedBook);
      } catch (err) {
        console.error('Error fetching book detail:', err);
        setError('Failed to load book details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetail();
  }, [id]);

  // Handlers
  const handleContact = (method: 'phone' | 'instagram' | 'telegram') => {
    if (!bookDetail?.seller) return;

    switch (method) {
      case 'phone':
        if (bookDetail.seller.phone) {
          Linking.openURL(`tel:${bookDetail.seller.phone}`);
        } else {
          Alert.alert('Phone Not Available', 'This seller hasn\'t provided a phone number.');
        }
        break;
      case 'instagram':
        if (bookDetail.seller.instagram) {
          const username = bookDetail.seller.instagram.replace('@', '');
          Linking.openURL(`https://instagram.com/${username}`);
        } else {
          Alert.alert('Instagram Not Available', 'This seller hasn\'t provided an Instagram handle.');
        }
        break;
      case 'telegram':
        if (bookDetail.seller.telegram) {
          const username = bookDetail.seller.telegram.replace('@', '');
          Linking.openURL(`https://t.me/${username}`);
        } else {
          Alert.alert('Telegram Not Available', 'This seller hasn\'t provided a Telegram handle.');
        }
        break;
    }
  };

  const handleShare = async () => {
    if (!bookDetail) return;
    
    try {
      await Share.share({
        message: `Check out this book: ${bookDetail.title} for ${bookDetail.price}`,
        url: `https://yourapp.com/books/${bookDetail.id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleReport = () => {
    Alert.alert(
      'Report Listing', 
      'Are you sure you want to report this listing?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', style: 'destructive', onPress: () => {
          // Implement reporting logic here
          Alert.alert('Reported', 'Thank you for reporting. We will review this listing.');
        }}
      ]
    );
  };

  // Loading state
  if (loading) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
        <Header
          onBack={() => router.back()}
          isWishlisted={false}
          toggleWishlist={() => {}}
          onShare={() => {}}
        />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-gray-600 mt-4">Loading book details...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error || !bookDetail) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
        <Header
          onBack={() => router.back()}
          isWishlisted={false}
          toggleWishlist={() => {}}
          onShare={() => {}}
        />
        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-red-500 text-center text-lg mb-4">
            {error || 'Book not found'}
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            The book you're looking for might have been removed or is no longer available.
          </Text>
          <Text 
            className="text-blue-500 underline text-center"
            onPress={() => router.back()}
          >
            Go Back
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-gray-50" edges={['top', 'left', 'right']}>
      {/* Header */}
      <Header
        onBack={() => router.back()}
        isWishlisted={isWishlisted}
        toggleWishlist={() => setIsWishlisted(!isWishlisted)}
        onShare={handleShare}
      />

      {/* Scrollable Content */}
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <ImageGallery
          images={bookDetail.images}
          currentImageIndex={currentImageIndex}
          onChangeImage={(index) => setCurrentImageIndex(index)}
          price={bookDetail.price}
          isFree={bookDetail.isFree}
          condition={bookDetail.condition}
        />

        <BookInfo
          title={bookDetail.title}
          author={bookDetail.author}
          edition={bookDetail.edition}
          originalPrice={bookDetail.originalPrice}
          price={bookDetail.price}
          examType={bookDetail.examType}
          subject={bookDetail.subject}
          includeAnswerKey={bookDetail.includeAnswerKey}
          isNegotiable={bookDetail.isNegotiable}
          location={bookDetail.location}
          postedDate={bookDetail.postedDate}
        />

        <Description
          description={bookDetail.description}
          publisher={bookDetail.publisher}
          edition={bookDetail.edition}
          condition={bookDetail.condition}
          subject={bookDetail.subject}
          examType={bookDetail.examType}
        />

        <SellerInfo seller={bookDetail.seller} onContact={handleContact} />

        <View className="h-6" />
      </ScrollView>

      {/* Bottom Actions */}
      <BottomActions
        seller={bookDetail.seller}
        onReport={handleReport}
        isFree={bookDetail.isFree}
        isNegotiable={bookDetail.isNegotiable}
      />
    </SafeAreaView>
  );
};

export default BookDetailScreen;