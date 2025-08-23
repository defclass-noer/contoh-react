import { createClient } from "@supabase/supabase-js";

// Akun Supabase #1 → khusus untuk Login & Register
export const authDb = createClient(
  process.env.SUPABASE1_URL,
  process.env.SUPABASE1_SERVICE_ROLE_KEY
);

// Akun Supabase #2 → khusus untuk Profile & data user
export const profileDb = createClient(
  process.env.SUPABASE2_URL,
  process.env.SUPABASE2_SERVICE_ROLE_KEY
);
