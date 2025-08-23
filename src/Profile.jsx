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

  const formatCurrency = (num, type = "USD") => {
    if (num == null) return "-";
    const value = Number(num);
    if (type === "USD") {
      return `$${value.toLocaleString("en-US", {
        minimumFractionDigits: 8,
        maximumFractionDigits: 8,
      })}`;
    }
    if (type === "BDC") {
      return `${value.toLocaleString("en-US")} BDC`;
    }
    return value.toLocaleString("en-US");
  };

  if (!username)
    return <p className="text-danger">No username, please login first.</p>;
  if (!profile) return <p>Loading profile...</p>;

  return (
    <div className="container my-4 text-light">
      {/* Profile Section */}
      <div className="card bg-dark border-0 shadow mb-4">
        <div className="card-body">
          <h2 className="card-title mb-3">Profile</h2>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Solana Address:</strong> {profile.sol_address}</p>
        </div>
      </div>

      {/* Market Section */}
      {market && (
        <div className="card bg-dark border-0 shadow mb-4">
          <div className="card-body">
            <h3 className="card-title mb-3 text-info">BDC Coin Market</h3>
            <div className="row">
              <div className="col-md-6 mb-3">
                <p className="mb-1 text-muted">Price BDC</p>
                <h5>{formatCurrency(market.harga_bdc, "USD")}</h5>
              </div>
              <div className="col-md-6 mb-3">
                <p className="mb-1 text-muted">Token Circulation</p>
                <h5>{formatCurrency(market.token_sirkulasi, "BDC")}</h5>
              </div>
              <div className="col-md-6 mb-3">
                <p className="mb-1 text-muted">Transaction Progress</p>
                <h5>{formatCurrency(market.token_progress, "BDC")}</h5>
              </div>
              <div className="col-md-6 mb-3">
                <p className="mb-1 text-muted">Global Dividend</p>
                <h5>{formatCurrency(market.dividen, "USD")}</h5>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="d-flex gap-3">
        <button className="btn btn-success flex-fill">Deposit</button>
        <button className="btn btn-danger flex-fill">Withdrawal</button>
        <button className="btn btn-primary flex-fill">Swap</button>
      </div>
    </div>
  );
}
