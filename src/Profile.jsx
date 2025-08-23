import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");

  const [profile, setProfile] = useState(null);
  const [market, setMarket] = useState(null);
  const [error, setError] = useState(null);

  async function fetchProfile() {
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username }),
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const result = await res.json();
      if (result.profile) {
        setProfile(result.profile);
        setMarket(result.market);
        setError(null);
      } else {
        setError("Profile not found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load profile.");
    }
  }

  useEffect(() => {
    if (!username) return;
    fetchProfile();
    const interval = setInterval(fetchProfile, 240000);
    return () => clearInterval(interval);
  }, [username]);

  if (!username) return <p className="text-danger">No username, please login first.</p>;
  if (error) return <p className="text-danger">{error}</p>;
  if (!profile) return <p>Loading profile...</p>;

  // Helper untuk format angka
  const formatNumber = (num) => {
    if (num == null) return "-";
    return Number(num).toLocaleString("id-ID"); // pakai format Indonesia
  };

  return (
    <div className="container my-4 text-light">
      <h2 className="mb-4 text-warning">Profile</h2>

      {/* Card Profile */}
      <div className="card bg-dark text-light mb-4 p-3 border border-warning rounded-3 shadow">
        <h4 className="text-warning">User Info</h4>
        <p><strong>Username:</strong> {profile.username}</p>
        <p><strong>Solana Address:</strong> {profile.sol_address}</p>
      </div>

      {/* Card Market */}
      {market && (
        <div className="card bg-dark text-light p-3 border border-success rounded-3 shadow">
          <h4 className="text-success">BDC Coin Market</h4>
          <p><strong>Price BDC:</strong> ${market.harga_bdc}</p>
          <p><strong>Token Circulation:</strong> {formatNumber(market.token_sirkulasi)}</p>
          <p><strong>Transaction Progress:</strong> {formatNumber(market.token_progress)}</p>
          <p><strong>Global Dividend:</strong> {formatNumber(market.dividen)}</p>
        </div>
      )}

      {/* Buttons */}
      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-success flex-fill">Deposit</button>
        <button className="btn btn-danger flex-fill">Withdrawal</button>
        <button className="btn btn-primary flex-fill">Swap</button>
      </div>
    </div>
  );
}
