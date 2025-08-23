// api/profile.js
import { createClient } from "@supabase/supabase-js";

const supabase1 = createClient(
  process.env.SUPABASE1_URL,
  process.env.SUPABASE1_SERVICE_ROLE_KEY
);

const supabase2 = createClient(
  process.env.SUPABASE2_URL,
  process.env.SUPABASE2_SERVICE_ROLE_KEY
);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { username } = req.body;

  try {
    // ambil user dari DB 1
    const { data: user, error: userError } = await supabase1
      .from("users")
      .select("id, username, sol_address, email, created_at")
      .eq("username", username)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: "User not found in Supabase1" });
    }

    // ambil portfolio/wallet dari DB 2
    const { data: portfolio, error: portfolioError } = await supabase2
      .from("portfolio")
      .select("balance_usd, balance_token, last_update")
      .eq("username", username)
      .single();

    if (portfolioError) {
      return res.status(500).json({ error: "Failed to fetch portfolio", details: portfolioError.message });
    }

    return res.status(200).json({
      profile: {
        ...user,
        portfolio: portfolio || null, // gabungkan
      },
    });
  } catch (err) {
    console.error("Profile error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
}
