import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");

  const [profile, setProfile] = useState(null);
  const [market, setMarket] = useState(null);

  async function fetchProfile() {
    const res = await fetch("/api/profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const result = await res.json();
    if (result.profile) {
      setProfile(result.profile);
      setMarket(result.market);
    }
  }

  useEffect(() => {
    if (username) {
      fetchProfile();
      const interval = setInterval(fetchProfile, 240000); // 4 menit
      return () => clearInterval(interval);
    }
  }, [username]);

  if (!username) return <p className="text-danger">No username, please login first.</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container my-4 text-light">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {profile.username}</p>
      <p><strong>Solana Address:</strong> {profile.sol_address}</p>

      {market && (
        <>
          <h3 className="mt-4">BDC Coin Market</h3>
          <p><strong>Price BDC:</strong> ${market.harga_bdc}</p>
          <p><strong>Token Circulation:</strong> {market.token_sirkulasi}</p>
          <p><strong>Transaction Progress:</strong> {market.token_progress}</p>
          <p><strong>Global Dividend:</strong> {market.dividen}</p>
        </>
      )}

      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-success flex-fill">Deposit</button>
        <button className="btn btn-danger flex-fill">Withdrawal</button>
        <button className="btn btn-primary flex-fill">Swap</button>
      </div>
    </div>
  );
          }
