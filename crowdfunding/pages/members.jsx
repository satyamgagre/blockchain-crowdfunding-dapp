"use client";

import React, { useContext, useEffect, useState } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";

const formatETH = (value) => Number(value).toFixed(2);

const AnimatedNumber = ({ target, suffix = "" }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!target) return;
    let start = 0;
    const steps = 40;
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(start);
    }, 18);
    return () => clearInterval(timer);
  }, [target]);
  const isFloat = String(target).includes(".");
  return <>{isFloat ? Number(display).toFixed(2) : Math.floor(display)}{suffix}</>;
};

const CARDS = (stats) => [
  {
    label: "Total Campaigns",
    value: stats.totalCampaigns,
    suffix: "",
    isFloat: false,
    sub: "all time",
    accent: "#F1EFE8",
  },
  {
    label: "Total Raised",
    value: stats.totalRaised,
    suffix: " ETH",
    isFloat: true,
    sub: "across all campaigns",
    accent: "#F1EFE8",
  },
  {
    label: "Total Donations",
    value: stats.totalDonations,
    suffix: "",
    isFloat: false,
    sub: "unique contributions",
    accent: "#F1EFE8",
  },
  {
    label: "Active",
    value: stats.active,
    suffix: "",
    isFloat: false,
    sub: "campaigns running",
    accent: "#4CAF50",
  },
  {
    label: "Expired",
    value: stats.expired,
    suffix: "",
    isFloat: false,
    sub: "campaigns ended",
    accent: "#888780",
  },
];

const SkeletonCard = ({ index }) => (
  <div
    className="vf-shimmer"
    style={{
      background: "#3A3A38",
      border: "1px solid #444441",
      borderRadius: "12px",
      padding: "24px",
      animationDelay: `${index * 100}ms`,
    }}
  >
    <div style={{ width: "60%", height: "10px", borderRadius: "4px", background: "#444441", marginBottom: "20px" }} />
    <div style={{ width: "40%", height: "28px", borderRadius: "4px", background: "#444441", marginBottom: "10px" }} />
    <div style={{ width: "50%", height: "8px",  borderRadius: "4px", background: "#444441" }} />
  </div>
);

const Insights = () => {
  const { getCampaigns } = useContext(CrowdFundingContext);
  const [stats, setStats] = useState({ totalCampaigns: 0, totalRaised: 0, totalDonations: 0, active: 0, expired: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      const campaigns = await getCampaigns();
      let totalRaised = 0, totalDonations = 0, active = 0, expired = 0;
      campaigns.forEach((c) => {
        totalRaised    += Number(c.amountCollected);
        totalDonations += c.donators?.length || 0;
        c.deadline * 1000 > Date.now() ? active++ : expired++;
      });
      setStats({ totalCampaigns: campaigns.length, totalRaised, totalDonations, active, expired });
      setLoading(false);
    };
    loadStats();
  }, []);

  const cards = CARDS(stats);
  const activeRatio = stats.totalCampaigns > 0
    ? Math.round((stats.active / stats.totalCampaigns) * 100)
    : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        @keyframes vf-fadein {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes vf-shimmer {
          0%, 100% { opacity: 0.4; }
          50%       { opacity: 0.75; }
        }
        .vf-shimmer { animation: vf-shimmer 1.5s ease-in-out infinite; }
        .vf-card {
          animation: vf-fadein 0.4s ease both;
          background: #3A3A38;
          border: 1px solid #5F5E5A;
          border-radius: 12px;
          padding: 24px;
          transition: border-color 0.2s, transform 0.2s;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .vf-card:hover { border-color: #B4B2A9; transform: translateY(-2px); }
        .vf-card::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, #5F5E5A, transparent);
          opacity: 0.5;
        }
        .vf-bar-fill {
          height: 100%;
          border-radius: 2px;
          transition: width 1s cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>

      <div style={{ backgroundColor: "#2C2C2A", minHeight: "100vh", padding: "48px 24px 80px", fontFamily: "'DM Mono', monospace" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>

          {/* ── Header ── */}
          <div style={{ marginBottom: "44px", animation: "vf-fadein 0.35s ease both" }}>
            <p style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", color: "#5F5E5A", margin: "0 0 10px" }}>
              Platform Analytics
            </p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "28px", color: "#F1EFE8", margin: "0 0 6px", letterSpacing: "0.02em" }}>
              Insights
            </h1>
            <p style={{ fontSize: "12px", color: "#5F5E5A", margin: 0, letterSpacing: "0.04em" }}>
              Real-time on-chain statistics
            </p>
          </div>

          {/* ── Stat cards ── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {loading
              ? [0, 1, 2, 3, 4].map((i) => <SkeletonCard key={i} index={i} />)
              : cards.map((item, i) => (
                <div key={i} className="vf-card" style={{ animationDelay: `${i * 70}ms` }}>
                  {/* Accent top bar */}
                  <div style={{ position: "absolute", top: 0, left: "24px", width: "24px", height: "2px", background: item.accent, borderRadius: "0 0 2px 2px" }} />

                  <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888780", margin: "0 0 16px" }}>
                    {item.label}
                  </p>

                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "26px", color: "#F1EFE8", margin: "0 0 6px", letterSpacing: "-0.01em" }}>
                    {loading ? "—" : (
                      item.isFloat
                        ? <><AnimatedNumber target={item.value} />{item.suffix}</>
                        : <><AnimatedNumber target={item.value} />{item.suffix}</>
                    )}
                  </h2>

                  <p style={{ fontSize: "11px", color: "#5F5E5A", margin: 0, letterSpacing: "0.04em" }}>
                    {item.sub}
                  </p>
                </div>
              ))
            }
          </div>

          {/* ── Divider ── */}
          <div style={{ height: "1px", background: "#3A3A38", margin: "40px 0" }} />

          {/* ── Campaign health bar ── */}
          {!loading && stats.totalCampaigns > 0 && (
            <div style={{ animation: "vf-fadein 0.4s ease 0.35s both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "12px" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888780", margin: 0 }}>
                  Campaign Health
                </p>
                <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "18px", color: "#F1EFE8", margin: 0 }}>
                  {activeRatio}%
                  <span style={{ fontFamily: "'DM Mono', monospace", fontWeight: 400, fontSize: "11px", color: "#5F5E5A", marginLeft: "6px" }}>active</span>
                </p>
              </div>

              {/* Segmented bar */}
              <div style={{ height: "6px", background: "#3A3A38", borderRadius: "3px", overflow: "hidden", border: "1px solid #444441" }}>
                <div
                  className="vf-bar-fill"
                  style={{
                    width: `${activeRatio}%`,
                    background: activeRatio > 50 ? "#B4B2A9" : "#5F5E5A",
                  }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                <span style={{ fontSize: "10px", color: "#5F5E5A", letterSpacing: "0.06em" }}>
                  {stats.active} active
                </span>
                <span style={{ fontSize: "10px", color: "#444441", letterSpacing: "0.06em" }}>
                  {stats.expired} expired
                </span>
              </div>
            </div>
          )}

          {/* ── Avg donation ── */}
          {!loading && stats.totalDonations > 0 && (
            <div style={{ marginTop: "32px", background: "#3A3A38", border: "1px solid #5F5E5A", borderRadius: "12px", padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", animation: "vf-fadein 0.4s ease 0.45s both" }}>
              <div>
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888780", margin: "0 0 6px" }}>
                  Avg. Donation
                </p>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#F1EFE8", margin: 0 }}>
                  {formatETH(stats.totalRaised / stats.totalDonations)} ETH
                </h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", textTransform: "uppercase", color: "#888780", margin: "0 0 6px" }}>
                  Raised / Campaign
                </p>
                <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "22px", color: "#F1EFE8", margin: 0 }}>
                  {formatETH(stats.totalRaised / stats.totalCampaigns)} ETH
                </h3>
              </div>
            </div>
          )}

          {/* ── Footer ── */}
          <p style={{ textAlign: "center", fontSize: "11px", color: "#444441", letterSpacing: "0.08em", marginTop: "60px" }}>
            Data pulled live from the Ethereum network
          </p>

        </div>
      </div>
    </>
  );
};

export default Insights;