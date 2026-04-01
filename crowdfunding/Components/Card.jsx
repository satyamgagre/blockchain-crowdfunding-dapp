import React, { useState } from "react";

const Card = ({ allCampaigns: propCampaigns, setOpenModel, setDonate, title }) => {
  const allCampaigns = propCampaigns ?? [];
  const [hovered, setHovered] = useState(null);

  const dayLeft = (deadline) => {
    if (!deadline) return { label: "No date", expired: true };

    let deadlineDate;

    if (!isNaN(deadline)) {
      const ts = Number(deadline);
      deadlineDate = ts < 1e12 ? new Date(ts * 1000) : new Date(ts);
    } else if (typeof deadline === "string" && deadline.includes("T")) {
      deadlineDate = new Date(deadline);
    } else {
      const [year, month, day] = String(deadline).split("-");
      deadlineDate = new Date(year, month - 1, day, 23, 59, 59);
    }

    if (isNaN(deadlineDate.getTime())) return { label: "Invalid", expired: true };

    const diff = deadlineDate.getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 3600 * 24));

    if (days < 0) return { label: "Expired", urgent: false, expired: true };
    if (days === 0) return { label: "Ends today", urgent: true, expired: false };
    if (days <= 5) return { label: `${days}d left`, urgent: true, expired: false };
    return { label: `${days}d left`, urgent: false, expired: false };
  };

  const progress = (collected, target) => {
    if (!target || target === 0) return 0;
    const pct = Math.min(100, (Number(collected || 0) / Number(target)) * 100);
    return Math.round(pct);
  };

  const categoryColors = {
    Health:      { bg: "rgba(50,220,160,0.12)", border: "rgba(50,220,160,0.3)",  text: "#32DCA0" },
    Education:   { bg: "rgba(100,160,255,0.12)", border: "rgba(100,160,255,0.3)", text: "#64A0FF" },
    Environment: { bg: "rgba(120,220,80,0.12)",  border: "rgba(120,220,80,0.3)",  text: "#78DC50" },
    Technology:  { bg: "rgba(180,100,255,0.12)", border: "rgba(180,100,255,0.3)", text: "#B464FF" },
    Default:     { bg: "rgba(255,255,255,0.08)", border: "rgba(255,255,255,0.15)", text: "#F0EDE8" },
  };

  const styles = {
    page: {
      background: "#2C2C2A",
      minHeight: "100vh",
      padding: "60px 24px",
      fontFamily: "'Georgia', serif",
    },
    header: {
      maxWidth: 1140,
      margin: "0 auto 48px",
    },
    eyebrow: {
      fontSize: 11,
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.2em",
      color: "#64A0FF",
      textTransform: "uppercase",
      marginBottom: 12,
    },
    title: {
      fontSize: "clamp(28px, 4vw, 48px)",
      fontWeight: 700,
      color: "#F0EDE8",
      lineHeight: 1.1,
      letterSpacing: "-0.02em",
      margin: 0,
    },
    grid: {
      maxWidth: 1140,
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
      gap: 24,
    },
    card: (i, expired) => ({
      background: expired ? "rgba(255,255,255,0.015)" : "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      overflow: "hidden",
      cursor: expired ? "not-allowed" : "pointer",
      opacity: expired ? 0.65 : 1,
      transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s ease, border-color 0.35s ease",
      transform: !expired && hovered === i ? "translateY(-6px)" : "translateY(0)",
      boxShadow:
        !expired && hovered === i
          ? "0 24px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(100,160,255,0.2)"
          : "0 4px 20px rgba(0,0,0,0.3)",
      borderColor: !expired && hovered === i ? "gray" : "rgba(255,255,255,0.08)",
      display: "flex",
      flexDirection: "column",
    }),
    imgWrap: {
      position: "relative",
      height: 200,
      overflow: "hidden",
    },
    img: (i, expired) => ({
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      filter: expired ? "grayscale(60%)" : "none",
      transition: "transform 0.6s cubic-bezier(0.23,1,0.32,1), filter 0.3s ease",
      transform: !expired && hovered === i ? "scale(1.06)" : "scale(1)",
    }),
    imgOverlay: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top, rgba(44,44,42,0.95) 0%, transparent 60%)",
    },
    badge: (cat) => {
      const c = categoryColors[cat] || categoryColors.Default;
      return {
        position: "absolute",
        top: 14,
        left: 14,
        background: c.bg,
        border: `1px solid ${c.border}`,
        color: c.text,
        fontSize: 10,
        fontFamily: "'Courier New', monospace",
        letterSpacing: "0.15em",
        textTransform: "uppercase",
        padding: "4px 10px",
        borderRadius: 100,
        backdropFilter: "blur(8px)",
      };
    },
    deadlineBadge: (info) => ({
      position: "absolute",
      top: 14,
      right: 14,
      background: info.expired
        ? "rgba(255,80,80,0.15)"
        : info.urgent
        ? "rgba(255,140,50,0.15)"
        : "rgba(255,255,255,0.08)",
      border: `1px solid ${
        info.expired
          ? "rgba(255,80,80,0.4)"
          : info.urgent
          ? "rgba(255,140,50,0.3)"
          : "rgba(255,255,255,0.15)"
      }`,
      color: info.expired ? "#FF5050" : info.urgent ? "#FF8C32" : "#A0A09A",
      fontSize: 10,
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.1em",
      padding: "4px 10px",
      borderRadius: 100,
      backdropFilter: "blur(8px)",
    }),
    body: {
      padding: "20px 22px 22px",
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    cardTitle: {
      fontSize: 19,
      fontWeight: 700,
      color: "#F0EDE8",
      letterSpacing: "-0.01em",
      lineHeight: 1.3,
      marginBottom: 10,
    },
    desc: {
      fontSize: 13.5,
      color: "rgba(240,237,232,0.5)",
      lineHeight: 1.65,
      marginBottom: 20,
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      flexGrow: 1,
    },
    progressSection: {
      marginBottom: 18,
    },
    progressHeader: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
    progressLabel: {
      fontSize: 11,
      fontFamily: "'Courier New', monospace",
      color: "rgba(240,237,232,0.4)",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
    },
    progressPct: (pct) => ({
      fontSize: 12,
      fontFamily: "'Courier New', monospace",
      color: pct >= 80 ? "#32DCA0" : "#64A0FF",
      fontWeight: 700,
    }),
    progressTrack: {
      height: 4,
      background: "rgba(255,255,255,0.07)",
      borderRadius: 99,
      overflow: "hidden",
    },
    progressFill: (pct) => ({
      height: "100%",
      width: `${pct}%`,
      background:
        pct >= 80
          ? "linear-gradient(90deg, #32DCA0, #64A0FF)"
          : "linear-gradient(90deg, #64A0FF, #B464FF)",
      borderRadius: 99,
      transition: "width 1s ease",
    }),
    statsRow: {
      display: "flex",
      justifyContent: "space-between",
      paddingTop: 16,
      paddingBottom: 16,
      borderTop: "1px solid rgba(255,255,255,0.06)",
    },
    stat: {
      display: "flex",
      flexDirection: "column",
      gap: 3,
    },
    statLabel: {
      fontSize: 10,
      fontFamily: "'Courier New', monospace",
      color: "rgba(240,237,232,0.3)",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
    },
    statValue: {
      fontSize: 15,
      fontWeight: 700,
      color: "#F0EDE8",
      letterSpacing: "-0.01em",
    },
    statUnit: {
      fontSize: 11,
      color: "rgba(240,237,232,0.4)",
      fontWeight: 400,
    },
    donateBtn: (expired) => ({
      marginTop: 12,
      width: "100%",
      padding: "10px 0",
      borderRadius: 8,
      border: "1px solid rgba(255,255,255,0.12)",
      background: expired ? "transparent" : "rgba(255,255,255,0.06)",
      color: expired ? "rgba(240,237,232,0.2)" : "rgba(240,237,232,0.7)",
      fontSize: 13,
      fontFamily: "'Courier New', monospace",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      cursor: expired ? "not-allowed" : "pointer",
      transition: "background 0.2s ease, color 0.2s ease",
    }),
    empty: {
      color: "rgba(240,237,232,0.3)",
      fontFamily: "'Courier New', monospace",
      fontSize: 13,
      letterSpacing: "0.1em",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <p style={styles.eyebrow}>— Campaign Board</p>
        <h1 style={styles.title}>{title || "Active Campaigns"}</h1>
      </div>

      <div style={styles.grid}>
        {allCampaigns.length === 0 && (
          <p style={styles.empty}>No campaigns available.</p>
        )}

        {allCampaigns.map((campaign, i) => {
          const timeInfo = dayLeft(campaign.deadline);
          const pct = progress(campaign.amountCollected, campaign.target);
          const expired = timeInfo.expired;

          return (
            <div
              key={i}
              style={styles.card(i, expired)}
              onMouseEnter={() => !expired && setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Image */}
              <div style={styles.imgWrap}>
                <img
                  src={
                    campaign.image ||
                    "https://i.pinimg.com/736x/59/72/da/5972da1dccb478c7af2274c402a65eec.jpg"
                  }
                  style={styles.img(i, expired)}
                  alt={campaign.title}
                />
                <div style={styles.imgOverlay} />
                {campaign.category && (
                  <span style={styles.badge(campaign.category)}>
                    {campaign.category}
                  </span>
                )}
                <span style={styles.deadlineBadge(timeInfo)}>{timeInfo.label}</span>
              </div>

              {/* Body */}
              <div style={styles.body}>
                <p style={styles.cardTitle}>{campaign.title}</p>
                <p style={styles.desc}>{campaign.description}</p>

                {/* Progress */}
                <div style={styles.progressSection}>
                  <div style={styles.progressHeader}>
                    <span style={styles.progressLabel}>Funding progress</span>
                    <span style={styles.progressPct(pct)}>{pct}%</span>
                  </div>
                  <div style={styles.progressTrack}>
                    <div style={styles.progressFill(pct)} />
                  </div>
                </div>

                {/* Stats */}
                <div style={styles.statsRow}>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>Raised</span>
                    <span style={styles.statValue}>
                      {campaign.amountCollected}{" "}
                      <span style={styles.statUnit}>ETH</span>
                    </span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>Target</span>
                    <span style={styles.statValue}>
                      {campaign.target}{" "}
                      <span style={styles.statUnit}>ETH</span>
                    </span>
                  </div>
                </div>

                {/* Donate Button */}
                <button
                  disabled={expired}
                  style={styles.donateBtn(expired)}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (expired) return;
                    setDonate?.(campaign);
                    setOpenModel?.(true);
                  }}
                  onMouseEnter={(e) => {
                    if (!expired) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                      e.currentTarget.style.color = "#F0EDE8";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!expired) {
                      e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                      e.currentTarget.style.color = "rgba(240,237,232,0.7)";
                    }
                  }}
                >
                  {expired ? "Campaign Closed" : "Donate Now"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Card;