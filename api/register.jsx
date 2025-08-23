import { authDb } from "./supabaseClients";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { username, sol_address, email, location } = req.body;

  const { error } = await authDb.from("users").insert([
    { username, sol_address, email, location }
  ]);

  if (error) return res.status(400).json({ error: error.message });
  return res.status(200).json({ success: true });
}
