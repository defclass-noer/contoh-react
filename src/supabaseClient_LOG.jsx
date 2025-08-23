import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL_LOG;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY_LOG;

export const supabaseLog = createClient(supabaseUrl, supabaseAnonKey);
