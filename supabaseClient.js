// supabaseClient.js
import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = 'https://djondyfcnwgjnkzqlomw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqb25keWZjbndnam5renFsb213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI5NTc0MDMsImV4cCI6MjA1ODUzMzQwM30.yw_K-122qqiYtXIz2Eto-eCHcQ16mtNmMzm8_Mw08ok';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
