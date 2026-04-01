"use client";

import React, { useEffect, useRef, useState } from "react";

// ── Inline BlurText (no external import needed) ──────────────────────────
const BlurText = ({
  text = "",
  delay = 100,
  animateBy = "words",
  direction = "top",
  onAnimationComplete,
  className = "",
}) => {
  const units = animateBy === "words" ? text.split(" ") : text.split("");
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      onAnimationComplete?.();
    }, units.length * delay + 600);
    return () => clearTimeout(timer);
  }, [visible]);

  const fromY = direction === "top" ? "-18px" : "18px";

  return (
    <span ref={ref} className={className} style={{ display: "inline" }}>
      {units.map((unit, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: visible ? 1 : 0,
            filter: visible ? "blur(0px)" : "blur(8px)",
            transform: visible ? "translateY(0)" : `translateY(${fromY})`,
            transition: `opacity 0.55s ease ${i * delay}ms, filter 0.55s ease ${i * delay}ms, transform 0.55s ease ${i * delay}ms`,
            marginRight: animateBy === "words" ? "0.25em" : "0",
          }}
        >
          {unit}
        </span>
      ))}
    </span>
  );
};

// ── Section data ──────────────────────────────────────────────────────────
const sections = [
  {
    id: "introduction",
    label: "01",
    title: "Introduction",
    content:
      "VeriFund is a decentralized crowdfunding platform built on blockchain technology. It enables individuals and organizations worldwide to raise funds in a fully transparent, permissionless environment — without relying on centralized intermediaries. Every transaction is verifiable on-chain, giving backers confidence that their contributions reach the intended purpose.",
  },
  {
    id: "problem",
    label: "02",
    title: "Problem Statement",
    content:
      "Conventional crowdfunding platforms act as trusted intermediaries who collect, hold, and disburse funds. This model introduces single points of failure: platforms can freeze campaigns, deduct fees exceeding 10%, or even misallocate funds. Donors have little visibility into how money is used after it leaves their wallet, and cross-border contributions are often restricted or heavily taxed.",
  },
  {
    id: "solution",
    label: "03",
    title: "Our Solution",
    content:
      "VeriFund replaces the intermediary with auditable smart contracts. Campaign creators deploy a contract that automatically routes funds only when predefined milestones are met. Backers vote on milestone completion, and the contract releases the corresponding tranche. If a campaign fails to reach its goal, contributors are refunded automatically — no manual intervention required.",
  },
  {
    id: "architecture",
    label: "04",
    title: "System Architecture",
    content:
      "The platform is composed of three layers. The presentation layer is a Next.js application that communicates with the blockchain via ethers.js. The contract layer consists of Solidity smart contracts deployed on an EVM-compatible network, managing campaign lifecycle, milestone tracking, and fund custody. The data layer uses IPFS for decentralized storage of campaign metadata, images, and documents — keeping the chain lightweight.",
  },
  {
    id: "features",
    label: "05",
    title: "Key Features",
    content:
      "Milestone-based fund release prevents misuse of capital. On-chain governance allows backers to vote on progress. Global accessibility means anyone with a crypto wallet can participate. Gas-optimized contracts keep fees minimal. Campaign creators receive a real-time dashboard showing contribution history, backer demographics, and milestone status.",
  },
  {
    id: "tokenomics",
    label: "06",
    title: "Tokenomics",
    content:
      "The native PDO token is used for platform governance, staking, and fee discounts. A fixed supply of 100 million PDO is minted at genesis. 40% is allocated to the community treasury, 25% to the founding team with a 3-year vesting schedule, 20% to ecosystem grants, and 15% to the initial liquidity pool. Token holders can propose and vote on protocol upgrades.",
  },
  {
    id: "activity",
    label: "07",
    title: "Activity & Transparency",
    content:
      "Every donation, refund, milestone vote, and fund release is emitted as an on-chain event and indexed by a dedicated subgraph. Users can query the full history of any campaign at any time. A public activity feed on the platform surface-renders these events in human-readable format, so non-technical backers can follow campaign progress without inspecting raw transactions.",
  },
  {
    id: "security",
    label: "08",
    title: "Security",
    content:
      "All smart contracts are written with the Checks-Effects-Interactions pattern to prevent reentrancy attacks. Contracts are audited by an independent third-party security firm before mainnet deployment. A bug bounty program is maintained on Immunefi. Multi-sig governance wallets control protocol-level parameters, requiring at least 3-of-5 key holders to approve any change.",
  },
  {
    id: "roadmap",
    label: "09",
    title: "Roadmap",
    content:
      "Q1 2026 — Testnet launch with core crowdfunding contracts. Q2 2026 — Security audit and community beta. Q3 2026 — Mainnet launch with milestone voting. Q4 2026 — Mobile app and fiat on-ramp integration. Q1 2026 — Cross-chain support for additional EVM networks. Q2 2026 — DAO transition, handing full protocol governance to token holders.",
  },
  {
    id: "team",
    label: "10",
    title: "Team & Community",
    content:
      "VeriFund is built by a team of blockchain engineers, product designers, and community managers with backgrounds in DeFi protocol development and consumer fintech. The project is open-source; all contracts and front-end code are publicly available on GitHub. Community contributors are rewarded through the ecosystem grant program funded by the treasury.",
  },
];

const WhitePaper = () => {
  const [active, setActive] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom > 160) {
          setActive(sec.id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        background: "#2C2C2A",
        color: "#F1EFE8",
        minHeight: "100vh",
        display: "flex",
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      {/* ── SIDEBAR ── */}
      <aside
        style={{
          width: "220px",
          flexShrink: 0,
          borderRight: "1px solid #5F5E5A",
          padding: "40px 24px",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <p
          style={{
            fontSize: "10px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#888780",
            marginBottom: "20px",
          }}
        >
          Contents
        </p>

        {sections.map((sec) => {
          const isActive = active === sec.id;
          return (
            <a
              key={sec.id}
              href={`#${sec.id}`}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "6px 10px",
                borderRadius: "6px",
                textDecoration: "none",
                fontSize: "13px",
                color: isActive ? "#F1EFE8" : "#888780",
                background: isActive ? "#3A3A38" : "transparent",
                borderLeft: isActive ? "2px solid #D3D1C7" : "2px solid transparent",
                transition: "all 0.2s ease",
              }}
            >
              <span
                style={{
                  fontSize: "10px",
                  color: isActive ? "#D3D1C7" : "#5F5E5A",
                  fontFamily: "monospace",
                  minWidth: "20px",
                }}
              >
                {sec.label}
              </span>
              {sec.title}
            </a>
          );
        })}
      </aside>

      {/* ── MAIN ── */}
      <main style={{ flex: 1, maxWidth: "760px", padding: "60px 48px", margin: "0 auto" }}>

        {/* Hero */}
        <div style={{ marginBottom: "64px" }}>
          <p
            style={{
              fontSize: "11px",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#888780",
              marginBottom: "16px",
            }}
          >
            Version 1.0 · 2026
          </p>

          <h1 style={{ fontSize: "40px", fontWeight: "400", lineHeight: 1.2, margin: 0 }}>
            <BlurText
              text="VeriFund"
              delay={120}
              animateBy="words"
              direction="top"
              className=""
            />
            <br />
            <BlurText
              text="Whitepaper"
              delay={120}
              animateBy="words"
              direction="top"
              className=""
            />
          </h1>

          <div
            style={{
              width: "48px",
              height: "1px",
              background: "#5F5E5A",
              margin: "24px 0",
            }}
          />

          <p style={{ color: "#B4B2A9", fontSize: "16px", lineHeight: 1.7, maxWidth: "520px" }}>
            A decentralized crowdfunding protocol built on blockchain — transparent,
            trustless, and open to the world.
          </p>
        </div>

        {/* Divider */}
        <div style={{ height: "1px", background: "#3A3A38", marginBottom: "48px" }} />

        {/* Sections */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
          {sections.map((sec, idx) => (
            <section
              key={sec.id}
              id={sec.id}
              style={{
                padding: "40px 0",
                borderBottom: idx < sections.length - 1 ? "1px solid #3A3A38" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "16px" }}>
                <span
                  style={{
                    fontSize: "11px",
                    fontFamily: "monospace",
                    color: "#5F5E5A",
                    letterSpacing: "0.05em",
                  }}
                >
                  {sec.label}
                </span>
                <h2
                  style={{
                    fontSize: "18px",
                    fontWeight: "400",
                    color: "#D3D1C7",
                    margin: 0,
                    letterSpacing: "0.01em",
                  }}
                >
                  <BlurText
                    text={sec.title}
                    delay={60}
                    animateBy="words"
                    direction="top"
                  />
                </h2>
              </div>

              <p
                style={{
                  color: "#B4B2A9",
                  fontSize: "15px",
                  lineHeight: "1.8",
                  margin: 0,
                  paddingLeft: "27px",
                }}
              >
                {sec.content}
              </p>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "32px",
            borderTop: "1px solid #3A3A38",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "13px", color: "#5F5E5A" }}>VeriFund © 2026</span>
          <span style={{ fontSize: "13px", color: "#5F5E5A" }}>v1.0</span>
        </div>
      </main>
    </div>
  );
};

export default WhitePaper;