export interface Book {
  id: string;
  title: string;
  image: string;
  price: string;
  seller: string;
  examType: string;
  author?: string;
  rating?: number;
  reviewCount?: number;
  condition?: string;
}