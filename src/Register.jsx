import React, { useState, useEffect } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [solAddress, setSolAddress] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {
    async function fetchIP() {
      try {
        const res = await fetch("https://api.ipify.org?format=json");
        const data = await res.json();
        setLocation(data.ip);
      } catch (err) {
        console.error("Failed to get IP", err);
      }
    }
    fetchIP();
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username,
        sol_address: solAddress,
        email,
        location,
      }),
    });

    const data = await res.json();
    if (data.error) {
      alert("Error: " + data.error);
    } else {
      alert("Register success!");
      window.location.href = "/login";
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="text" placeholder="Solana Address" value={solAddress} onChange={(e) => setSolAddress(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="text" value={location} readOnly />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
