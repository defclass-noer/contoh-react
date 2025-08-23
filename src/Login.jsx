import React, { useState } from "react";
import { supabase } from "./supabaseClient";
import { useNavigate } from "react-router-dom";

function Login() {
  const [solAddress, setSolAddress] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("sol_address", solAddress)
      .eq("username", username)
      .single();

    if (error || !data) {
      setError("Login failed. Address or Username not found.");
    } else {
      navigate("/profile", { state: { user: data } });
    }
  };

  return (
    <div className="auth-container">
      <h2 className="form-title">Login</h2>
      <form onSubmit={handleLogin} className="auth-form">
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

      <style>{`
        .auth-container {
          background: #000;
          color: #fff;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .form-title {
          font-size: 24px;
          margin-bottom: 20px;
          font-weight: bold;
          color: #ffd700;
        }
        .auth-form {
          width: 90%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
        }
        input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          border-radius: 6px;
          border: none;
          background: #222;
          color: #fff;
          font-size: 14px;
        }
        button {
          width: 100%;
          padding: 12px;
          border: none;
          border-radius: 6px;
          background: #ffd700;
          font-weight: bold;
          font-size: 16px;
          cursor: pointer;
        }
        button:hover {
          background: #e6c200;
        }
        .error {
          color: #ff6b6b;
          margin-bottom: 10px;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default Login;
