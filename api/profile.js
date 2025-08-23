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
    // 🔹 Ambil user dari Supabase1
    const { data: user, error: userError } = await supabase1
      .from("users")
      .select("username, sol_address")
      .eq("username", username)
      .single();

    if (userError || !user) {
      return res.status(404).json({ error: "User not found" });
    }

    // 🔹 Ambil simulasi BDC dari Supabase2
    const { data: bdc, error: bdcError } = await supabase2
      .from("bdc_simulation")
      .select("harga_bdc, token_sirkulasi, token_progress, dividen")
      .order("id", { ascending: false }) // ambil data terbaru
      .limit(1)
      .single();

    if (bdcError) {
      return res.status(500).json({ error: "Failed to fetch simulation data", details: bdcError.message });
    }

    return res.status(200).json({
      profile: user,
      market: bdc,
    });
  } catch (err) {
    console.error("Profile API error:", err);
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
  }
