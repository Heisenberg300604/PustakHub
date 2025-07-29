import { supabase } from '@/lib/supabase';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

// Handle OAuth redirect for Expo
WebBrowser.maybeCompleteAuthSession();

export const signInWithGoogle = async () => {
  try {
    const redirectUrl = Linking.createURL('/' ,{ scheme: 'yourapp' });

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: redirectUrl, // Must match the app redirect in Supabase dashboard
      },
    });

    if (error) throw error;

    return data; // data.url will open Google login
  } catch (error) {
    console.error('Google login error:', error);
    throw error;
  }
};

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) return { user: null, error };

  const user = data.user;

  // Insert empty profile row only if sign up is successful
  if (user) {
    await supabase.from('profiles').insert({
      id: user.id,
      name: '',  // will be filled during onboarding
      city: '',  // will be filled during onboarding
      primary_contact_type: 'phone' // default, can be updated
    });
  }

  return { user, error: null };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { user: data.user, error };
};


export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Get Profile

export const getProfile = async (userId: string) => {
  return await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
};

export const updateProfile = async (profileData: {
  name: string;
  city: string;
  latitude?: number;
  longitude?: number;
  phone?: string;
  instagram?: string;
  telegram?: string;
  primary_contact_type: 'phone' | 'instagram' | 'telegram';
}) => {
  // get user session
  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    throw new Error('User not logged in or session missing');
  }

  // upsert (insert or update)
  const { error } = await supabase
    .from('profiles')
    .upsert(
      { id: user.id, ...profileData, updated_at: new Date() },
      { onConflict: 'id' }
    );

  if (error) throw error;

  return true;
};