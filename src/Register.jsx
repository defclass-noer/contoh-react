import React, { useState, useEffect } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [solAddress, setSolAddress] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");

  // Ambil IP otomatis untuk disimpan di kolom location
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

  // Proses submit form
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
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Solana Address"
          value={solAddress}
          onChange={(e) => setSolAddress(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input type="text" value={location} readOnly />
        <button type="submit">Register</button>
      </form>

      <style>{`
        .form-container {
          max-width: 400px;
          margin: 50px auto;
          background: #000;
          padding: 20px;
          border-radius: 8px;
          color: #fff;
        }
        input {
          width: 100%;
          padding: 10px;
          margin: 8px 0;
          border-radius: 5px;
          border: none;
        }
        button {
          width: 100%;
          background: #FFD700;
          color: #000;
          padding: 10px;
          font-weight: bold;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
