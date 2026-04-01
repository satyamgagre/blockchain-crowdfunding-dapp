"use client";

import React, { useContext, useEffect, useState } from "react";
import { CrowdFundingContext } from "../Context/CrowdFunding";

// ── icons (inline SVG, no extra dep) ─────────────────────────────────────────
const IconDonate = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <path d="M8 1.5C5 1.5 2.5 4 2.5 7c0 3.5 5.5 7.5 5.5 7.5S13.5 10.5 13.5 7c0-3-2.5-5.5-5.5-5.5Z"
      stroke="#F1EFE8" strokeWidth="1.2" strokeLinejoin="round"/>
    <circle cx="8" cy="7" r="1.8" fill="#F1EFE8"/>
  </svg>
);

const IconCampaign = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <rect x="2" y="2" width="12" height="12" rx="2.5" stroke="#F1EFE8" strokeWidth="1.2"/>
    <path d="M8 5.5V10.5M5.5 8H10.5" stroke="#F1EFE8" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

const IconExpired = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
    <circle cx="8" cy="8" r="5.5" stroke="#888780" strokeWidth="1.2"/>
    <path d="M8 5v3.5l2 1.5" stroke="#888780" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ── type config ───────────────────────────────────────────────────────────────
const TYPE = {
  donation: {
    icon: <IconDonate />,
    dot: "#F1EFE8",
    badge: "Donation",
    badgeBg: "rgba(241,239,232,0.08)",
    badgeColor: "#D3D1C7",
  },
  campaign: {
    icon: <IconCampaign />,
    dot: "#B4B2A9",
    badge: "Campaign",
    badgeBg: "rgba(180,178,169,0.08)",
    badgeColor: "#B4B2A9",
  },
  expired: {
    icon: <IconExpired />,
    dot: "#5F5E5A",
    badge: "Expired",
    badgeBg: "rgba(95,94,90,0.10)",
    badgeColor: "#888780",
  },
};

// ── address truncation ────────────────────────────────────────────────────────
const truncate = (addr) =>
  addr ? `${addr.slice(0, 6)}···${addr.slice(-4)}` : "";

// ── single activity row ───────────────────────────────────────────────────────
const ActivityRow = ({ item, index }) => {
  const cfg = TYPE[item.type] || TYPE.expired;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "0",
        animationDelay: `${index * 60}ms`,
      }}
      className="vf-row"
    >
      {/* Timeline spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px", paddingTop: "2px" }}>
        {/* Icon bubble */}
        <div style={{
          width: "30px", height: "30px",
          borderRadius: "50%",
          background: "#3A3A38",
          border: `1px solid #5F5E5A`,
          display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0,
          zIndex: 1,
        }}>
          {cfg.icon}
        </div>
        {/* Spine line (hidden on last item via CSS) */}
        <div className="vf-spine" style={{
          width: "1px",
          flex: 1,
          minHeight: "28px",
          background: "linear-gradient(to bottom, #3A3A38, transparent)",
          marginTop: "4px",
        }}/>
      </div>

      {/* Card */}
      <div
        style={{
          flex: 1,
          background: "#3A3A38",
          border: "1px solid #5F5E5A",
          borderRadius: "10px",
          padding: "14px 18px",
          marginBottom: "4px",
          transition: "border-color 0.2s",
        }}
        className="vf-card"
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          {/* Badge */}
          <span style={{
            fontSize: "10px",
            fontFamily: "'DM Mono', monospace",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: cfg.badgeColor,
            background: cfg.badgeBg,
            border: `1px solid ${cfg.dot}22`,
            padding: "2px 8px",
            borderRadius: "100px",
          }}>
            {cfg.badge}
          </span>
          {/* Time */}
          <span style={{
            fontSize: "11px",
            fontFamily: "'DM Mono', monospace",
            color: "#5F5E5A",
            letterSpacing: "0.04em",
          }}>
            {item.time}
          </span>
        </div>

        {/* Message */}
        <p style={{
          margin: 0,
          fontSize: "13.5px",
          fontFamily: "'DM Mono', monospace",
          color: "#B4B2A9",
          lineHeight: "1.7",
          letterSpacing: "0.01em",
        }}>
          {item.type === "donation" && (
            <>
              <span style={{ color: "#F1EFE8", fontWeight: 500 }}>{truncate(item.user)}</span>
              {" "}donated{" "}
              <span style={{ color: "#F1EFE8", fontWeight: 500 }}>{item.amount} ETH</span>
              {" "}to{" "}
              <span style={{ color: "#D3D1C7" }}>"{item.campaign}"</span>
            </>
          )}
          {item.type === "campaign" && (
            <>
              <span style={{ color: "#F1EFE8", fontWeight: 500 }}>{truncate(item.user)}</span>
              {" "}launched{" "}
              <span style={{ color: "#D3D1C7" }}>"{item.campaign}"</span>
            </>
          )}
          {item.type === "expired" && (
            <>
              <span style={{ color: "#D3D1C7" }}>"{item.campaign}"</span>
              {" "}
              <span style={{ color: "#888780" }}>has expired</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

// ── empty state ───────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div style={{
    textAlign: "center",
    padding: "80px 0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "16px",
  }}>
    <div style={{
      width: "56px", height: "56px",
      borderRadius: "50%",
      border: "1px solid #3A3A38",
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5"
          stroke="#5F5E5A" strokeWidth="1.5" strokeLinejoin="round"/>
      </svg>
    </div>
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "13px", color: "#5F5E5A", margin: 0 }}>
      No activity yet
    </p>
    <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "11px", color: "#444441", margin: 0 }}>
      Campaigns and donations will appear here
    </p>
  </div>
);

// ── skeleton loader ───────────────────────────────────────────────────────────
const Skeleton = ({ index }) => (
  <div style={{ display: "flex", gap: "0", animationDelay: `${index * 80}ms` }} className="vf-row">
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "20px" }}>
      <div className="vf-shimmer" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "#3A3A38", flexShrink: 0 }}/>
      <div style={{ width: "1px", flex: 1, minHeight: "28px", background: "#3A3A38", marginTop: "4px" }}/>
    </div>
    <div className="vf-shimmer" style={{
      flex: 1, height: "76px", borderRadius: "10px",
      background: "#3A3A38", marginBottom: "4px",
    }}/>
  </div>
);

// ── filter tabs ───────────────────────────────────────────────────────────────
const FILTERS = ["All", "Donation", "Campaign", "Expired"];

// ── main component ────────────────────────────────────────────────────────────
const Activity = () => {
  const { getCampaigns, getDonations } = useContext(CrowdFundingContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [filter, setFilter]         = useState("All");

  useEffect(() => {
    const loadActivity = async () => {
      setLoading(true);
      const data = await generateActivity(getCampaigns, getDonations);
      setActivities(data);
      setLoading(false);
    };
    loadActivity();
  }, []);

  const generateActivity = async (getCampaigns, getDonations) => {
    const campaigns = await getCampaigns();
    let activity = [];
    for (let i = 0; i < campaigns.length; i++) {
      const campaign = campaigns[i];
      activity.push({ type: "campaign", user: campaign.owner, campaign: campaign.title, time: "Recently" });
      const donations = await getDonations(i);
      donations.forEach((donation) => {
        activity.push({ type: "donation", user: donation.donator, amount: donation.donation, campaign: campaign.title, time: "Recently" });
      });
      if (campaign.deadline * 1000 < Date.now()) {
        activity.push({ type: "expired", campaign: campaign.title, time: "Expired" });
      }
    }
    return activity.reverse();
  };

  const filtered = filter === "All"
    ? activities
    : activities.filter((a) => a.type === filter.toLowerCase());

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@700;800&display=swap');

        .vf-row {
          animation: vf-fadein 0.35s ease both;
        }
        @keyframes vf-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .vf-card:hover {
          border-color: #888780 !important;
        }
        .vf-row:last-child .vf-spine {
          display: none;
        }
        @keyframes vf-shimmer {
          0%   { opacity: 0.4; }
          50%  { opacity: 0.7; }
          100% { opacity: 0.4; }
        }
        .vf-shimmer {
          animation: vf-shimmer 1.4s ease-in-out infinite;
        }
        .vf-filter-btn {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 100px;
          border: 1px solid #5F5E5A;
          background: transparent;
          color: #888780;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .vf-filter-btn:hover {
          border-color: #B4B2A9;
          color: #D3D1C7;
        }
        .vf-filter-btn.active {
          background: #3A3A38;
          border-color: #B4B2A9;
          color: #F1EFE8;
        }
      `}</style>

      <div style={{
        backgroundColor: "#2C2C2A",
        minHeight: "100vh",
        padding: "48px 24px 80px",
        fontFamily: "'DM Mono', monospace",
      }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "36px" }}>
            <p style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "11px",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "#5F5E5A",
              margin: "0 0 10px",
            }}>
              On-chain feed
            </p>
            <h1 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "28px",
              color: "#F1EFE8",
              margin: "0 0 4px",
              letterSpacing: "0.02em",
            }}>
              Activity
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "6px" }}>
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4CAF50",
                animation: "vf-shimmer 2s ease-in-out infinite" }}/>
              <span style={{ fontSize: "11px", color: "#5F5E5A", letterSpacing: "0.06em" }}>
                Live · {activities.length} events
              </span>
            </div>
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "32px", flexWrap: "wrap" }}>
            {FILTERS.map((f) => (
              <button
                key={f}
                className={`vf-filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", background: "#3A3A38", marginBottom: "28px" }}/>

          {/* Feed */}
          {loading ? (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[0, 1, 2, 3].map((i) => <Skeleton key={i} index={i} />)}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState />
          ) : (
            <div style={{ display: "flex", flexDirection: "column" }}>
              {filtered.map((item, i) => (
                <ActivityRow key={i} item={item} index={i} />
              ))}
            </div>
          )}

          {/* Footer count */}
          {!loading && filtered.length > 0 && (
            <p style={{
              textAlign: "center",
              fontSize: "11px",
              color: "#444441",
              letterSpacing: "0.08em",
              marginTop: "40px",
              fontFamily: "'DM Mono', monospace",
            }}>
              {filtered.length} event{filtered.length !== 1 ? "s" : ""} · end of feed
            </p>
          )}

        </div>
      </div>
    </>
  );
};

export default Activity;