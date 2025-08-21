import { createClient } from '@supabase/supabase-js'

// gunakan environment variable Vercel (lebih aman)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)
