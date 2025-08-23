import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [solAddress, setSolAddress] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sol_address: solAddress, username }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    } else {
      // langsung kirim user ke halaman Profile
      navigate("/profile", { state: { user: data.user } });
    }
  };

  return (
    <div className="auth-container">
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
        {error && <p className="error">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
            
