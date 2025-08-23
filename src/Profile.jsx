import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Profile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const username = params.get("username");

  const [profile, setProfile] = useState<any>(null);
  const [market, setMarket] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

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

  const formatNumber = (num: any) => {
    if (num == null) return "-";
    return Number(num).toLocaleString("id-ID");
  };

  return (
    <div className="container my-4 text-light">

      {/* Profile Box */}
      <div className="card bg-dark p-3 shadow-sm rounded-3 border-0 mb-3">
        <h5 className="text-warning mb-3">Profile</h5>
        <div className="d-flex flex-column gap-1">
          <div><strong>Username:</strong> {profile.username}</div>
          <div><strong>Solana Address:</strong> {profile.sol_address}</div>
        </div>
      </div>

      {/* Market Stats */}
      {market && (
        <div className="card bg-dark p-3 shadow-sm rounded-3 border-0">
          <h5 className="text-success mb-3">BDC Coin Market</h5>
          <div className="row">
            <div className="col-6 mb-2">
              <div className="text-secondary small">Price BDC</div>
              <div className="fw-bold">${market.harga_bdc}</div>
            </div>
            <div className="col-6 mb-2">
              <div className="text-secondary small">Token Circulation</div>
              <div className="fw-bold">{formatNumber(market.token_sirkulasi)}</div>
            </div>
            <div className="col-6 mb-2">
              <div className="text-secondary small">Transaction Progress</div>
              <div className="fw-bold">{formatNumber(market.token_progress)}</div>
            </div>
            <div className="col-6 mb-2">
              <div className="text-secondary small">Global Dividend</div>
              <div className="fw-bold">{formatNumber(market.dividen)}</div>
            </div>
          </div>
        </div>
      )}

      {/* Tombol Aksi */}
      <div className="d-flex gap-3 mt-4">
        <button className="btn btn-success flex-fill rounded-pill py-2 fw-bold">
          Deposit
        </button>
        <button className="btn btn-danger flex-fill rounded-pill py-2 fw-bold">
          Withdrawal
        </button>
        <button className="btn btn-primary flex-fill rounded-pill py-2 fw-bold">
          Swap
        </button>
      </div>
    </div>
  );
}
