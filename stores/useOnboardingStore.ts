// stores/useOnboardingStore.ts
import { create } from 'zustand';

interface OnboardingState {
  name: string;
  city: string;
  latitude: number | null;
  longitude: number | null;
  phone: string;
  instagram: string;
  telegram: string;
  primaryContactType: 'phone' | 'instagram' | 'telegram' | null;
  setField: (field: keyof OnboardingState, value: any) => void;
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>((set) => ({
  name: '',
  city: '',
  latitude: null,
  longitude: null,
  phone: '',
  instagram: '',
  telegram: '',
  primaryContactType: null,
  setField: (field, value) => set({ [field]: value }),
  reset: () =>
    set({
      name: '',
      city: '',
      latitude: null,
      longitude: null,
      phone: '',
      instagram: '',
      telegram: '',
      primaryContactType: null,
    }),
}));
