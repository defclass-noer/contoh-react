import { authDb } from "./supabaseClients";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, sol_address } = req.body;

  const { data, error } = await authDb
    .from("users")
    .select("*")
    .eq("username", username)
    .eq("sol_address", sol_address)
    .single();

  if (error || !data) return res.status(401).json({ error: "Invalid login" });

  return res.status(200).json({ user: data });
}
