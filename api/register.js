import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE1_URL,
  process.env.SUPABASE1_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, sol_address, email, location } = req.body;

  if (!username || !sol_address || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data, error } = await supabase
    .from("users")
    .insert([{ username, sol_address, email, location }])
    .select()
    .single();

  if (error) {
    console.error("Register error:", error);
    return res.status(500).json({ error: "Failed to register" });
  }

  return res.status(200).json({ user: data });
}
