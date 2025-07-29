import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Components
import BookInfo from '../../components/BookInfo';
import BottomActions from '../../components/BottomActions';
import Description from '../../components/Description';
import Header from '../../components/Header';
import ImageGallery from '../../components/ImageGallery';
import SellerInfo from '../../components/SellerInfo';

// Types
import { BookDetail } from '../../types/BookDetail';

const BookDetailScreen = () => {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Mock Data - will replace with API later
  const bookDetail: BookDetail = {
    id,
    title: 'HC Verma Physics Part 1 - Concepts of Physics',
    author: 'H.C. Verma',
    edition: '2023 Edition',
    publisher: 'Bharti Bhawan',
    price: '₹450',
    originalPrice: '₹695',
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=800&fit=crop',
      'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=800&fit=crop',
    ],
    condition: 'Like New',
    description:
      'Excellent condition book with minimal wear. All pages intact, no highlights or markings. Perfect for JEE preparation. Book has been well maintained and stored in a dust-free environment.',
    examType: 'JEE',
    subject: 'Physics',
    rating: 4.8,
    reviewCount: 245,
    postedDate: '2 days ago',
    location: 'Delhi',
    includeAnswerKey: true,
    isNegotiable: true,
    isFree: false,
    seller: {
      name: 'Rahul Kumar',
      city: 'New Delhi',
      phone: '+91 98765 43210',
      instagram: '@rahul_studies',
      telegram: '@rahulkumar',
      memberSince: 'January 2023',
      rating: 4.9,
      totalBooks: 15,
      avatar:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    },
  };

  // Handlers
  const handleContact = (method: 'phone' | 'instagram' | 'telegram') => {
    switch (method) {
      case 'phone':
        Linking.openURL(`tel:${bookDetail.seller.phone}`);
        break;
      case 'instagram':
        Linking.openURL(
          `https://instagram.com/${bookDetail.seller.instagram?.replace('@', '')}`
        );
        break;
      case 'telegram':
        Linking.openURL(
          `https://t.me/${bookDetail.seller.telegram?.replace('@', '')}`
        );
        break;
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this book: ${bookDetail.title} for ${bookDetail.price}`,
        url: `https://yourapp.com/books/${bookDetail.id}`,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleBuy = () => {
    Alert.alert('Purchase', 'Redirect to payment or contact seller');
  };

  const handleOffer = () => {
    Alert.alert('Offer', 'Make a negotiable offer');
  };

  const handleReport = () => {
    Alert.alert('Report', 'Report this listing?');
  };

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
          rating={bookDetail.rating}
          reviewCount={bookDetail.reviewCount}
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

        <ScrollView className="h-6" />
      </ScrollView>

      {/* Bottom Actions */}
      <BottomActions
  seller={bookDetail.seller}
  onReport={handleReport}
/>

    </SafeAreaView>
  );
};

export default BookDetailScreen;
