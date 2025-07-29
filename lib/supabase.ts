import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

export const supabase = createClient(
  'https://qgtmqfvgbtdvdelsagin.supabase.co', // project URL
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFndG1xZnZnYnRkdmRlbHNhZ2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMzgzMDksImV4cCI6MjA2NjYxNDMwOX0.U4drX1_29X7Or_DzamOfTor7ywxecVosojnjCyGu_wc',
);
