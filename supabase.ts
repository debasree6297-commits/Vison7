import { createClient } from '@supabase/supabase-js';

// --- Supabase Client Setup ---
// Connected to project: qwejblbmbijmegcqjsxb
const supabaseUrl = 'https://qwejblbmbijmegcqjsxb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF3ZWpibGJtYmlqbWVnY3Fqc3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAyNTA2MDcsImV4cCI6MjA4NTgyNjYwN30.CghssOJ4isx70kwhkcTr9ubtJb47ZeRPnCgfCOGSQD4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  }
});
