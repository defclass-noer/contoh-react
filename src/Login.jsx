import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [solAddress, setSolAddress] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, sol_address: solAddress }),
    });

    const result = await res.json();
    if (res.ok) {
      // ⬇️ redirect ke profile dengan membawa username
      navigate("/profile", { state: { username: result.user.username } });
    } else {
      setError(result.error || "Login failed");
    }
  }

  return (
    <div className="container mt-5 text-light">
      <h2>Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Username</label>
          <input
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label>Solana Address</label>
          <input
            className="form-control"
            value={solAddress}
            onChange={(e) => setSolAddress(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
        }
