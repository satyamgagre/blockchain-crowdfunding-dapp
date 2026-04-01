import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import React, { useState, useContext, useEffect } from 'react';
import { CrowdFundingContext } from "../Context/CrowdFunding";
import Link from "next/link";

const Hero = () => {
    const { createCampaign } = useContext(CrowdFundingContext);

    const [campaigns, setCampaigns] = useState({
        title: "",
        description: "",
        amount: "",
        deadline: "",
    });
    const [isWalletConnected, setIsWalletConnected] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitHovered, setSubmitHovered] = useState(false);

    useEffect(() => {
        const checkWallet = async () => {
            if (!window.ethereum) return;
            const accounts = await window.ethereum.request({ method: "eth_accounts" });
            setIsWalletConnected(accounts.length > 0);
        };
        checkWallet();

        const handleAccountsChanged = (accounts) =>
            setIsWalletConnected(accounts.length > 0);
        window.ethereum?.on("accountsChanged", handleAccountsChanged);
        return () => window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
    }, []);

    const today = new Date().toISOString().split("T")[0];

    const createNewCampaign = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        const { title, description, amount, deadline } = campaigns;
        

        if (parseFloat(amount) <= 0) {
            alert("Amount must be greater than 0");
            return;
        }

        setIsSubmitting(true);
        try {
            // 1️⃣ If wallet connected → blockchain
                if (isWalletConnected) {
                    await createCampaign({ ...campaigns, amount: amount.toString() });
                }

                // 2️⃣ ALWAYS save to Firebase (for UI)
                await addDoc(collection(db, "campaigns"), {
                    title: campaigns.title,
                    description: campaigns.description,
                    amount: Number(campaigns.amount),
                    amountCollected: 0,
                    deadline: campaigns.deadline,
                    owner: window.ethereum?.selectedAddress ?? "guest",
                    createdAt: new Date(),
                });
            setCampaigns({ title: "", description: "", amount: "", deadline: "" });
        } catch (error) {
            console.error("Error creating campaign:", error);
            alert(`Error creating campaign: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={styles.wrapper}>
            <div style={styles.bgPattern} />

            <div style={styles.container}>

                <div style={styles.heroText}>
                    <h2 style={styles.headline}>
                        Let's Make The World Better{" "}
                        <br className="hidden md:block" />
                        Together.
                    </h2>
                    <p style={styles.subtext}>
                        Join us in making a positive impact on the world through our crowdfunding platform.
                    </p>
                    <Link href="/whitepaper" style={styles.learnMore}>
                        Learn More
                        <svg
                            style={{ display: "inline-block", width: "10px", marginLeft: "8px" }}
                            fill="currentColor"
                            viewBox="0 0 12 12"
                        >
                            <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,2.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z" />
                        </svg>
                    </Link>
                </div>

                <div style={styles.card}>
                    <h3 style={styles.cardTitle}>Create a Campaign</h3>

                    <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "16px",
                        fontSize: "12px",
                        fontWeight: "500",
                        color: isWalletConnected ? "#6ee7a0" : "#d4b96a",
                        opacity: 0.8,
                    }}>
                        <span style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            backgroundColor: isWalletConnected ? "#6ee7a0" : "#d4b96a",
                            flexShrink: 0,
                        }} />
                        {isWalletConnected ? "Blockchain Mode" : "Firebase Mode"}
                    </div>

                    <form onSubmit={createNewCampaign} style={styles.form}>

                        <div style={styles.fieldWrapper}>
                            <label htmlFor="title" style={styles.label}>Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={campaigns.title}
                                onChange={(e) => setCampaigns(prev => ({ ...prev, title: e.target.value }))}
                                placeholder="Enter campaign title"
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldWrapper}>
                            <label htmlFor="description" style={styles.label}>Description</label>
                            <input
                                id="description"
                                name="description"
                                type="text"
                                value={campaigns.description}
                                onChange={(e) => setCampaigns(prev => ({ ...prev, description: e.target.value }))}
                                placeholder="Enter campaign description"
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldWrapper}>
                            <label htmlFor="amount" style={styles.label}>Target Amount</label>
                            <input
                                id="amount"
                                name="amount"
                                type="number"
                                value={campaigns.amount}
                                min="0.01"
                                step="0.01"
                                onChange={(e) => setCampaigns(prev => ({ ...prev, amount: e.target.value }))}
                                placeholder="0.00"
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={styles.fieldWrapper}>
                            <label htmlFor="deadline" style={styles.label}>Deadline</label>
                            <input
                                id="deadline"
                                name="deadline"
                                type="date"
                                value={campaigns.deadline}
                                min={today}
                                onChange={(e) => setCampaigns(prev => ({ ...prev, deadline: e.target.value }))}
                                required
                                style={styles.input}
                            />
                        </div>

                        <div style={{ marginTop: "4px", marginBottom: "8px" }}>
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                onMouseEnter={() => setSubmitHovered(true)}
                                onMouseLeave={() => setSubmitHovered(false)}
                                style={{
                                    ...styles.submitBtn,
                                    ...(submitHovered && !isSubmitting ? styles.submitBtnHover : {}),
                                    ...(isSubmitting ? { opacity: 0.6, cursor: "not-allowed" } : {}),
                                }}
                            >
                                {isSubmitting ? "Creating..." : "Create Campaign"}
                            </button>
                        </div>

                        <p style={styles.footerNote}>
                            Create your Campaign for raising funds and making a difference in the world.
                        </p>

                    </form>
                </div>

            </div>

            <svg style={styles.wave} viewBox="0 0 1160 163" preserveAspectRatio="none">
                <path
                    fill="#3A3A38"
                    d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676
                    88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036
                    162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76
                    162.5 -44 162.5 -104 162.5H-164V13Z"
                />
            </svg>
        </div>
    );
};

const styles = {
    wrapper: {
        position: "relative",
        backgroundColor: "#2C2C2A",
        overflow: "hidden",
        minHeight: "600px",
        fontFamily: "'Segoe UI', sans-serif",
    },
    bgPattern: {
        position: "absolute",
        inset: 0,
        backgroundImage: "radial-gradient(circle, rgba(241,239,232,0.03) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
    },
    container: {
        position: "relative",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "64px 24px 120px",
        display: "flex",
        alignItems: "center",
        gap: "64px",
        flexWrap: "wrap",
    },
    heroText: { flex: "1 1 380px" },
    headline: {
        fontSize: "clamp(32px, 4.5vw, 52px)",
        fontWeight: "700",
        lineHeight: "1.15",
        letterSpacing: "-0.02em",
        color: "#F1EFE8",
        margin: "0 0 20px",
        maxWidth: "480px",
    },
    subtext: {
        fontSize: "16px",
        lineHeight: "1.7",
        color: "#B4B2A9",
        maxWidth: "400px",
        margin: "0 0 28px",
    },
    learnMore: {
        display: "inline-flex",
        alignItems: "center",
        fontSize: "14px",
        fontWeight: "600",
        letterSpacing: "0.04em",
        color: "#888780",
        textDecoration: "none",
    },
    card: {
        flex: "1 1 360px",
        maxWidth: "460px",
        backgroundColor: "#3A3A38",
        borderRadius: "16px",
        border: "1px solid #5F5E5A",
        padding: "36px",
        boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
    },
    cardTitle: {
        fontSize: "20px",
        fontWeight: "700",
        color: "#F1EFE8",
        margin: "0 0 24px",
        paddingBottom: "20px",
        borderBottom: "1px solid #5F5E5A",
        textAlign: "center",
    },
    form: { display: "flex", flexDirection: "column", gap: "16px" },
    fieldWrapper: { display: "flex", flexDirection: "column", gap: "6px" },
    label: {
        display: "inline-block",
        fontSize: "12px",
        fontWeight: "600",
        color: "#D3D1C7",
        letterSpacing: "0.04em",
        textTransform: "uppercase",
    },
    input: {
        width: "100%",
        height: "44px",
        padding: "0 14px",
        borderRadius: "6px",
        border: "1px solid #5F5E5A",
        fontSize: "14px",
        color: "#F1EFE8",
        backgroundColor: "#444441",
        outline: "none",
        boxSizing: "border-box",
        colorScheme: "dark",
        fontFamily: "inherit",
        transition: "border-color 0.2s",
    },
    submitBtn: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "48px",
        padding: "0 24px",
        backgroundColor: "#888780",
        color: "#F1EFE8",
        border: "none",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        letterSpacing: "0.01em",
        transform: "translateY(0)",
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        transition: "background-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
    },
    submitBtnHover: {
        backgroundColor: "#6B6A67",
        transform: "translateY(-1px)",
        boxShadow: "0 6px 16px rgba(0,0,0,0.35)",
    },
    footerNote: {
        fontSize: "12px",
        color: "#888780",
        margin: "4px 0 0",
        lineHeight: "1.6",
    },
    wave: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "163px",
        display: "block",
    },
};

export default Hero;