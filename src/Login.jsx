import React, { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [solAddress, setSolAddress] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, sol_address: solAddress }),
    });

    const data = await res.json();
    if (data.error) {
      alert("Login failed: " + data.error);
    } else {
      // Redirect ke profile dengan query string
      window.location.href = `/profile?username=${username}`;
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Solana Address"
          value={solAddress}
          onChange={(e) => setSolAddress(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <button type="submit">Login</button>
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
