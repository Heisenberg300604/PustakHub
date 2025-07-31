// types/profile.ts
export interface UserInfo {
  id: string;
  name: string;
  city: string;
  phone: string | null;
  instagram: string | null;
  telegram: string | null;
  primaryContactType: 'phone' | 'instagram' | 'telegram';
  joinDate: string;
  avatar?: string;
}

export interface Book {
  id: number;
  title: string;
  subject: string;
  price: string;
  image: string;
  status: 'Active' | 'Sold';
}

export interface ContactInfoRowProps {
  icon: any;
  label: string;
  value: string;
  isPrimary?: boolean;
  isLast?: boolean;
}// types/profile.ts
export interface UserInfo {
  id: string;
  name: string;
  city: string;
  phone: string | null;
  instagram: string | null;
  telegram: string | null;
  primaryContactType: 'phone' | 'instagram' | 'telegram';
  joinDate: string;
  avatar?: string;
}

export interface Book {
  id: number;
  title: string;
  subject: string;
  price: string;
  image: string;
  status: 'Active' | 'Sold';
}

export interface ContactInfoRowProps {
  icon: any;
  label: string;
  value: string;
  isPrimary?: boolean;
  isLast?: boolean;
}