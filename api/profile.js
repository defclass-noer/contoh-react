import { profileDb } from "./supabaseClients";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { userId } = req.body;

  // Ambil data profile user dari akun Supabase #2
  const { data, error } = await profileDb
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error || !data) return res.status(404).json({ error: "Profile not found" });

  return res.status(200).json({ profile: data });
}
