import { useEffect, useState } from "react";

export default function Profile({ username }) {
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
    fetchProfile();
    const interval = setInterval(fetchProfile, 240000); // refresh tiap 4 menit
    return () => clearInterval(interval);
  }, [username]);

  if (!profile) return <p className="text-light">Loading profile...</p>;

  return (
    <div className="container my-4">
      {/* Card Profile */}
      <div className="card bg-dark text-light mb-4 shadow-lg">
        <div className="card-body">
          <h4 className="card-title">Profile</h4>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Solana Address:</strong> {profile.sol_address}</p>
        </div>
      </div>

      {/* Card Market */}
      <div className="card bg-dark text-light mb-4 shadow-lg">
        <div className="card-body">
          <h4 className="card-title">BDC Coin Market</h4>
          {market ? (
            <>
              <p><strong>Price BDC:</strong> ${market.harga_bdc}</p>
              <p><strong>Token Circulation:</strong> {market.token_sirkulasi}</p>
              <p><strong>Transaction Progress:</strong> {market.token_progress}</p>
              <p><strong>Global Dividend:</strong> {market.dividen}</p>
            </>
          ) : (
            <p>No market data available</p>
          )}
        </div>
      </div>

      {/* Tombol Aksi */}
      <div className="d-flex gap-3">
        <button className="btn btn-success flex-fill">Deposit</button>
        <button className="btn btn-danger flex-fill">Withdrawal</button>
        <button className="btn btn-primary flex-fill">Swap</button>
      </div>
    </div>
  );
}
