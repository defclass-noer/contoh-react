import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE1_URL,
  process.env.SUPABASE1_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username, sol_address } = req.body;

  if (!username || !sol_address) {
    return res.status(400).json({ error: "Username and Solana address required" });
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("sol_address", sol_address)
    .maybeSingle();

  if (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Database query failed" });
  }

  if (!data) {
    return res.status(401).json({ error: "Invalid login" });
  }

  return res.status(200).json({ user: data });
    }
