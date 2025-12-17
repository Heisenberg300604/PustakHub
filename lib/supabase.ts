import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(
  'https://wqdwoomrnoqcfrrppjna.supabase.co', // project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxZHdvb21ybm9xY2ZycnBwam5hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4OTI3NzksImV4cCI6MjA3OTQ2ODc3OX0.Az2TeOES4dUR6ZCElAFXqjKd4JLBzA1LhRRwbNG1R6A',
);
