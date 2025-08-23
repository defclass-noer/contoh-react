import { useState } from "react"
import { supabase } from "./supabaseClientLOG"

export default function Register() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [address, setAddress] = useState("")
  const [message, setMessage] = useState("")

  const handleRegister = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase
      .from("users")
      .insert([{ username, password, address }]) // password sebaiknya hashed di backend

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Register success: " + username)
    }
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} /><br />
        <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br />
        <input placeholder="Solana Address" value={address} onChange={(e) => setAddress(e.target.value)} /><br />
        <button type="submit">Register</button>
      </form>
      <p>{message}</p>
    </div>
  )
}
