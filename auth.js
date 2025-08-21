import { supabase } from "./supabaseClient.js";
import bcrypt from "bcryptjs";

// REGISTER USER
export async function register(username, password, address) {
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert ke tabel users
  const { data, error } = await supabase
    .from("users")
    .insert([{ username, password: hashedPassword, address }])
    .select();

  if (error) {
    console.error("Register Error:", error.message);
    return null;
  }

  // Buat balance default = 0
  await supabase.from("balances").insert([{ user_id: data[0].id, balance: 0 }]);

  console.log("Register Success:", data[0]);
  return data[0];
}

// LOGIN USER
export async function login(username, password) {
  // Cari user
  const { data: users, error } = await supabase
    .from("users")
    .select("*")
    .eq("username", username)
    .limit(1);

  if (error || users.length === 0) {
    console.error("User not found");
    return null;
  }

  const user = users[0];

  // Cek password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    console.error("Wrong password");
    return null;
  }

  console.log("Login Success:", user);
  return user;
}

// TEST LOCAL
if (process.argv[2] === "register") {
  register("alice", "password123", "So1anaAddrAlice...");
}
if (process.argv[2] === "login") {
  login("alice", "password123");
}
