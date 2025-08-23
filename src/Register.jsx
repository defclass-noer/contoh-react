import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.user;

  if (!user) {
    return (
      <div style={{ padding: 20 }}>
        <p>No user data. Please login first.</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Welcome, {user.username}!</h2>
      <p>Solana Address: {user.sol_address}</p>
      <p>Email: {user.email}</p>
      <p>Location: {user.location}</p>
    </div>
  );
}
