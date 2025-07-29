export interface Seller {
  name: string;
  city: string;
  phone: string;
  instagram?: string;
  telegram?: string;
  memberSince: string;
  rating: number;
  totalBooks: number;
  avatar?: string;
}

export interface BookDetail {
  id: string;
  title: string;
  author: string;
  edition: string;
  publisher: string;
  price: string;
  originalPrice?: string;
  images: string[];
  condition: string;
  description: string;
  examType: string;
  subject: string;
  rating: number;
  reviewCount: number;
  postedDate: string;
  location: string;
  includeAnswerKey: boolean;
  isNegotiable: boolean;
  isFree: boolean;
  seller: Seller;
}
