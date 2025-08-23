// Profile.jsx
import React, { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      window.location.href = "/login";
    }
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <p><b>Username:</b> {user.username}</p>
      <p><b>Solana Address:</b> {user.sol_address}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>Location (IP):</b> {user.location}</p>
    </div>
  );
}
