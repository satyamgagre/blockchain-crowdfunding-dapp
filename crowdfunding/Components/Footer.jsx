import React, { useState } from "react";

const Footer = () => {
    const [hoveredLink, setHoveredLink] = useState(null);

    const productList = [
        { label: "Market", icon: "↗" },
        { label: "ERC20 Token", icon: "◈" },
        { label: "Donation", icon: "♡" },
    ];
    const contactList = [
        { label: "support@verifund.org", icon: "✉" },
        { label: "+1 (123) 456-7890", icon: "◎" },
        { label: "Contact Us", icon: "→" },
    ];
    const usefulList = [
        { label: "Home", icon: "⌂" },
        { label: "About Us", icon: "◐" },
        { label: "Company Bio", icon: "≡" },
    ];

    const LinkItem = ({ item, groupKey, index }) => {
        const key = `${groupKey}-${index}`;
        const isHovered = hoveredLink === key;
        return (
            <a
                href="#!"
                onMouseEnter={() => setHoveredLink(key)}
                onMouseLeave={() => setHoveredLink(null)}
                style={{
                    color: isHovered ? "#F1EFE8" : "#B4B2A9",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginBottom: "14px",
                    textDecoration: "none",
                    fontSize: "0.875rem",
                    letterSpacing: "0.02em",
                    transition: "color 0.25s ease, gap 0.25s ease",
                    fontFamily: "'DM Mono', monospace",
                }}
            >
                <span
                    style={{
                        fontSize: "0.7rem",
                        opacity: isHovered ? 1 : 0.5,
                        transition: "opacity 0.25s ease",
                        minWidth: "14px",
                        textAlign: "center",
                    }}
                >
                    {item.icon}
                </span>
                <span>{item.label}</span>
                {isHovered && (
                    <span
                        style={{
                            marginLeft: "auto",
                            fontSize: "0.65rem",
                            opacity: 0.5,
                            letterSpacing: "0.1em",
                        }}
                    >
                        ──
                    </span>
                )}
            </a>
        );
    };

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Syne:wght@400;600;700;800&display=swap');

                .vf-footer-col h6::after {
                    content: '';
                    display: block;
                    width: 24px;
                    height: 1px;
                    background: #5C5C58;
                    margin-top: 10px;
                    transition: width 0.4s ease;
                }
                .vf-footer-col:hover h6::after {
                    width: 48px;
                }

                .vf-newsletter-input {
                    background: transparent;
                    border: 1px solid #3E3E3B;
                    color: #F1EFE8;
                    padding: 10px 14px;
                    font-family: 'DM Mono', monospace;
                    font-size: 0.8rem;
                    outline: none;
                    flex: 1;
                    border-radius: 6px 0 0 6px;
                    transition: border-color 0.2s ease;
                }
                .vf-newsletter-input::placeholder { color: #5C5C58; }
                .vf-newsletter-input:focus { border-color: #B4B2A9; }

                .vf-newsletter-btn {
                    background: #B4B2A9;
                    color: #2C2C2A;
                    border: none;
                    padding: 10px 16px;
                    font-family: 'Syne', sans-serif;
                    font-weight: 700;
                    font-size: 0.75rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    cursor: pointer;
                    border-radius: 0 6px 6px 0;
                    transition: background 0.2s ease;
                }
                .vf-newsletter-btn:hover { background: #F1EFE8; }

                .vf-blockchain-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    border: 1px solid #3E3E3B;
                    border-radius: 100px;
                    padding: 4px 12px;
                    font-family: 'DM Mono', monospace;
                    font-size: 0.65rem;
                    color: #5C5C58;
                    letter-spacing: 0.08em;
                }
                .vf-pulse {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background: #4CAF50;
                    animation: pulse 2s infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.3; }
                }
            `}</style>

            <footer style={{ backgroundColor: "#2C2C2A", color: "#B4B2A9" }}>

                {/* Main grid */}
                <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "56px 24px 40px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>

                        {/* Brand */}
                        <div className="vf-footer-col" style={{ paddingRight: "32px" }}>
                            <h6 style={{
                                color: "#F1EFE8",
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 800,
                                fontSize: "1.25rem",
                                letterSpacing: "0.06em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}>
                                Veri<span style={{ color: "#B4B2A9" }}>fund</span>
                            </h6>
                            <p style={{
                                color: "#B4B2A9",
                                fontFamily: "'DM Mono', monospace",
                                fontSize: "0.8rem",
                                lineHeight: "1.8",
                                marginBottom: "24px",
                            }}>
                                A decentralized crowdfunding platform built on the Ethereum blockchain —
                                empowering individuals and organizations to raise funds transparently and securely.
                            </p>

                            {/* Live badge */}
                            <div className="vf-blockchain-badge">
                                <span className="vf-pulse"></span>
                                Ethereum Mainnet · Live
                            </div>
                        </div>

                        {/* Products */}
                        <div className="vf-footer-col">
                            <h6 style={{
                                color: "#F1EFE8",
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}>
                                Products
                            </h6>
                            {productList.map((el, i) => (
                                <LinkItem item={el} groupKey="products" index={i} key={i} />
                            ))}
                        </div>

                        {/* Useful Links */}
                        <div className="vf-footer-col">
                            <h6 style={{
                                color: "#F1EFE8",
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}>
                                Navigate
                            </h6>
                            {usefulList.map((el, i) => (
                                <LinkItem item={el} groupKey="useful" index={i} key={i} />
                            ))}
                        </div>

                        {/* Contact */}
                        <div className="vf-footer-col">
                            <h6 style={{
                                color: "#F1EFE8",
                                fontFamily: "'Syne', sans-serif",
                                fontWeight: 700,
                                fontSize: "0.7rem",
                                letterSpacing: "0.14em",
                                textTransform: "uppercase",
                                marginBottom: "20px",
                            }}>
                                Contact
                            </h6>
                            {contactList.map((el, i) => (
                                <LinkItem item={el} groupKey="contact" index={i} key={i} />
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div style={{ borderTop: "1px solid #3E3E3B", marginTop: "48px", paddingTop: "36px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "32px", flexWrap: "wrap" }}>
                            <div style={{ flex: "1", minWidth: "200px" }}>
                                <p style={{
                                    fontFamily: "'Syne', sans-serif",
                                    fontWeight: 700,
                                    fontSize: "0.85rem",
                                    color: "#F1EFE8",
                                    letterSpacing: "0.04em",
                                    marginBottom: "4px",
                                }}>
                                    Stay in the loop
                                </p>
                                <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#5C5C58" }}>
                                    Protocol updates &amp; campaign launches
                                </p>
                            </div>
                            <div style={{ display: "flex", flex: "1", minWidth: "260px", maxWidth: "420px" }}>
                                <input
                                    className="vf-newsletter-input"
                                    type="email"
                                    placeholder="your@email.com"
                                />
                                <button className="vf-newsletter-btn">Subscribe</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div style={{
                    borderTop: "1px solid #3E3E3B",
                    padding: "20px 24px",
                }}>
                    <div style={{
                        maxWidth: "1200px",
                        margin: "0 auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}>
                        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.75rem", color: "#5C5C58" }}>
                            © 2026{" "}
                            <a href="https://verifund.org/" style={{ color: "#B4B2A9", textDecoration: "none", transition: "color 0.2s" }}
                               onMouseEnter={e => e.target.style.color = "#F1EFE8"}
                               onMouseLeave={e => e.target.style.color = "#B4B2A9"}
                            >
                                verifund.org
                            </a>
                            {" "}· All rights reserved
                        </span>
                        <div style={{ display: "flex", gap: "20px" }}>
                            {["Privacy Policy", "Terms of Service", "Audit Report"].map((link, i) => (
                                <a key={i} href="#!" style={{
                                    fontFamily: "'DM Mono', monospace",
                                    fontSize: "0.7rem",
                                    color: "#5C5C58",
                                    textDecoration: "none",
                                    letterSpacing: "0.05em",
                                    transition: "color 0.2s",
                                }}
                                onMouseEnter={e => e.target.style.color = "#B4B2A9"}
                                onMouseLeave={e => e.target.style.color = "#5C5C58"}
                                >
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </footer>
        </>
    );
};

export default Footer;