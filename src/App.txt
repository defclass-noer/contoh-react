// App.jsx
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";

function Home() {
  const [solPrice, setSolPrice] = useState(null);
  const [converted, setConverted] = useState(null);

  useEffect(() => {
    async function fetchPrice() {
      try {
        const res = await fetch(
          "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
        );
        const data = await res.json();
        const price = data.solana.usd;
        setSolPrice(price);
        setConverted((125 / price).toFixed(4));
      } catch (e) {
        console.error("Failed to fetch SOL price", e);
      }
    }
    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <h2>Philosophy of Bordeoxau Digital Crypto Currency Coin</h2>
      <p>
        Bordeoxau Digital Crypto Currency Coin was founded with a grand vision
        to revolutionize how people manage and interact with financial assets in
        the digital era. Its philosophy is rooted in innovation, fairness, and
        sustainability, aiming to create a positive impact globally.
      </p>

      <h3>1. Achieving Financial Freedom and Global Inclusion</h3>
      <p>
        Bordeoxau believes that everyone deserves access to fair and open
        financial services, without geographical or social barriers. Blockchain
        helps reduce bureaucracy and costs, enabling equal participation in the
        digital economy.
      </p>

      <h3>2. Promoting Transparency and Security</h3>
      <p>
        Transparency is the foundation of Bordeoxau. Blockchain records every
        transaction publicly, verifiable by anyone, building trust and reducing
        fraud risks. Strong security systems protect user assets.
      </p>

      <h3>3. Emphasizing Decentralization</h3>
      <p>
        By reducing reliance on central authorities, Bordeoxau empowers users to
        control their assets, creating a fairer, more resilient system.
      </p>

      <h3>4. Supporting Innovation and Sustainable Development</h3>
      <p>
        The team actively explores the latest technologies to improve
        efficiency, speed, and scalability, while adapting to market needs.
      </p>

      <h3>5. Fostering Social Awareness and Economic Sustainability</h3>
      <p>
        Beyond technical and economic aspects, Bordeoxau supports projects that
        promote welfare, education, and sustainability through partnerships with
        social organizations.
      </p>

      <h3>6. Building an Inclusive and Competitive Ecosystem</h3>
      <p>
        Success is measured not only by financial value but also by human
        impact. Bordeoxau aims to build an inclusive and globally competitive
        ecosystem with real benefits for users.
      </p>

      <h2>How to Buy BDC Coin & Receive Dividends</h2>
      <ol>
        <li>
          <strong>Purchase Requirement</strong>
          <p>
            Minimum purchase: <b>125 USDT</b>{" "}
            {converted && solPrice
              ? `or ${converted} SOL (Solana Coin)`
              : "(fetching SOL price...)"}
            . Purchases are made through exchanges that support Solana.
          </p>
        </li>
        <li>
          <strong>Purchase Process</strong>
          <p>
            Hold SOL in a supported wallet, then swap SOL to BDC Coin via the
            integrated platform. Payment goes directly to the official purchase
            address. BDC Coins will be credited automatically at the current
            ratio.
          </p>
        </li>
        <li>
          <strong>Use of Solana (SOL)</strong>
          <p>
            Solana is chosen due to its speed, low fees, and scalability,
            ensuring secure and efficient transactions.
          </p>
        </li>
        <li>
          <strong>Dividends</strong>
          <p>
            Holders receive <b>0.002% per semester</b>, based on ownership
            proportion. Paid automatically to registered wallets, sourced from
            the DNA HealthCare project.
          </p>
        </li>
      </ol>
      <p>
        <b>Important Note:</b> Always verify wallet addresses. Cryptocurrency
        investments carry risk—do research and consult financial experts.
      </p>

      <div className="actions">
        <Link to="/login">
          <button>Login</button>
        </Link>
        <Link to="/register">
          <button>Register</button>
        </Link>
      </div>
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <div>
        <header>
          <div className="logo">BDC</div>
          <div className="title">Bordeoxau (BDC Coin)</div>
        </header>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>

        <footer>© {new Date().getFullYear()} Bordeoxau. All rights reserved.</footer>

        <style>{`
          body {
            background-color: #000;
            color: #fff;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          header {
            padding: 20px;
            background: #000;
            text-align: center;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #FFD700;
          }
          .title {
            font-size: 14px;
            color: #ccc;
          }
          main {
            max-width: 800px;
            margin: auto;
            padding: 20px;
          }
          h2 {
            margin-top: 30px;
            color: #FFD700;
          }
          h3 {
            margin-top: 20px;
            color: #FFD700;
          }
          p, li {
            color: #ddd;
          }
          ol {
            padding-left: 20px;
          }
          .actions {
            margin-top: 30px;
            display: flex;
            gap: 15px;
            justify-content: center;
          }
          .actions button {
            background: #FFD700;
            color: #000;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
          }
          footer {
            text-align: center;
            padding: 20px;
            background: #000;
            color: #aaa;
          }
        `}</style>
      </div>
    </Router>
  );
}
