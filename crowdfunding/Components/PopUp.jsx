import React, { useState, useEffect, useRef } from "react";

const PopUp = ({ setOpenModel, donate, donateFunction, getDonations }) => {
  const [amount, setAmount] = useState("");
  const [allDonationData, setAllDonationData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [focused, setFocused] = useState(false);
  const inputRef = useRef(null);

const createDonation = async () => {
  if (!amount || isLoading) return;

  setIsLoading(true);

  try {
    const data = await donateFunction(donate.pId, amount);
    console.log(data);

    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      setOpenModel(false);
    }, 1800);

  } catch (error) {
    console.log(error);
  } finally {
    setIsLoading(false);
  }
};

  useEffect(() => {
    const fetchDonations = async () => {
      const donationData = await getDonations(donate.pId);
      setAllDonationData(donationData);
    };
    fetchDonations();
  }, [donate.pId]);

  const quickAmounts = [0.01, 0.05, 0.1, 0.5];

  const totalRaised = allDonationData.reduce(
    (acc, d) => acc + parseFloat(d.donation || 0),
    0
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');

        .popup-overlay {
          position: fixed;
          inset: 0;
          z-index: 50;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: fadeIn 0.18s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(99, 220, 180, 0.3); }
          70% { box-shadow: 0 0 0 8px rgba(99, 220, 180, 0); }
          100% { box-shadow: 0 0 0 0 rgba(99, 220, 180, 0); }
        }

        .popup-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
        }

        .popup-card {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 460px;
          margin: 0 16px;
          border-radius: 24px;
          overflow: hidden;
          animation: slideUp 0.26s cubic-bezier(0.22, 1, 0.36, 1);
          background: rgba(18, 18, 20, 0.6);
          backdrop-filter: blur(32px) saturate(180%);
          -webkit-backdrop-filter: blur(32px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 8px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
        }

        .popup-header {
          padding: 22px 24px 20px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .popup-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4ade80;
          margin-bottom: 6px;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .popup-label::before {
          content: '';
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse-ring 2s infinite;
        }

        .popup-title {
          font-family: 'DM Sans', sans-serif;
          font-size: 18px;
          font-weight: 600;
          color: #f5f5f5;
          line-height: 1.3;
          margin: 0;
        }

        .close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #666;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s ease;
          margin-top: 2px;
        }

        .close-btn:hover {
          background: rgba(255,255,255,0.06);
          color: #bbb;
          border-color: rgba(255,255,255,0.2);
        }

        .popup-body {
          padding: 22px 24px;
        }

        .stats-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 22px;
        }

        .stat-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 14px;
          padding: 12px 14px;
          backdrop-filter: blur(8px);
        }

        .stat-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          color: #555;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-bottom: 5px;
        }

        .stat-value {
          font-family: 'DM Sans', sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: #e8e8e8;
        }

        .stat-unit {
          font-size: 11px;
          font-weight: 400;
          color: #666;
          margin-left: 3px;
        }

        .desc-text {
          font-family: 'DM Sans', sans-serif;
          font-size: 13.5px;
          line-height: 1.65;
          color: #777;
          margin-bottom: 20px;
        }

        .field-label {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: #555;
          margin-bottom: 8px;
          display: block;
        }

        .amount-wrapper {
          display: flex;
          align-items: center;
          border-radius: 14px;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(8px);
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
          overflow: hidden;
          margin-bottom: 10px;
        }

        .amount-prefix {
          padding: 0 14px;
          height: 48px;
          display: flex;
          align-items: center;
          font-family: 'DM Mono', monospace;
          font-size: 16px;
          color: #4ade80;
          border-right: 1px solid rgba(255,255,255,0.07);
          background: rgba(74,222,128,0.06);
        }

        .amount-input {
          flex: 1;
          height: 48px;
          padding: 0 16px;
          background: transparent;
          border: none;
          outline: none;
          font-family: 'DM Mono', monospace;
          font-size: 16px;
          color: #f0f0f0;
          width: 100%;
        }

        .amount-input::placeholder {
          color: #3a3a3a;
        }

        .quick-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 22px;
        }

        .quick-btn {
          border-radius: 10px;
          padding: 9px 0;
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          text-align: center;
        }

        .quick-btn.active {
          background: rgba(74,222,128,0.12);
          border: 1px solid rgba(74,222,128,0.4);
          color: #4ade80;
        }

        .quick-btn.inactive {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          color: #888;
        }

        .quick-btn.inactive:hover {
          background: rgba(255,255,255,0.08);
          border-color: rgba(255,255,255,0.15);
          color: #ccc;
        }

        .divider {
          height: 1px;
          background: rgba(255,255,255,0.05);
          margin: 0 0 20px;
        }

        .donors-heading {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: #444;
          margin-bottom: 10px;
        }

        .donor-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 14px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          margin-bottom: 6px;
          transition: border-color 0.15s, background 0.15s;
        }

        .donor-row:hover {
          background: rgba(255,255,255,0.07);
          border-color: rgba(255,255,255,0.12);
        }

        .donor-address {
          font-family: 'DM Mono', monospace;
          font-size: 12px;
          color: #666;
        }

        .donor-amount {
          font-family: 'DM Mono', monospace;
          font-size: 12.5px;
          font-weight: 500;
          color: #4ade80;
        }

        .popup-footer {
          padding: 16px 24px 22px;
          border-top: 1px solid rgba(255,255,255,0.05);
          display: flex;
          align-items: center;
          justify-content: flex-end;
          gap: 10px;
        }

        .cancel-btn {
          padding: 11px 20px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.1);
          background: transparent;
          color: #666;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .cancel-btn:hover {
          background: rgba(255,255,255,0.04);
          color: #999;
        }

        .donate-btn {
          padding: 11px 28px;
          border-radius: 12px;
          border: none;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          min-width: 120px;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }

        .donate-btn.idle {
          background: #4ade80;
          color: #0a1a0f;
        }

        .donate-btn.idle:hover:not(:disabled) {
          background: #6ee7a0;
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(74,222,128,0.25);
        }

        .donate-btn.idle:active:not(:disabled) {
          transform: translateY(0);
        }

        .donate-btn.loading {
          background: rgba(74,222,128,0.1);
          color: #4ade80;
          border: 1px solid rgba(74,222,128,0.2);
          backdrop-filter: blur(8px);
        }

        .donate-btn.success-state {
          background: #4ade80;
          color: #0a1a0f;
        }

        .donate-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(74,222,128,0.25);
          border-top-color: #4ade80;
          border-radius: 50%;
          animation: spin 0.7s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .checkmark {
          font-size: 15px;
        }
      `}</style>

      <div className="popup-overlay">
        <div
          className="popup-backdrop"
          onClick={() => setOpenModel(false)}
        />

        <div className="popup-card">

          {/* Header */}
          <div className="popup-header">
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="popup-label">Active Campaign</div>
              <h2 className="popup-title">{donate.title}</h2>
            </div>
            <button className="close-btn" onClick={() => setOpenModel(false)}>✕</button>
          </div>

          {/* Body */}
          <div className="popup-body">
            {/* Stats */}
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-label">Total Raised</div>
                <div className="stat-value">
                  {totalRaised.toFixed(3)}
                  <span className="stat-unit">ETH</span>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-label">Donors</div>
                <div className="stat-value">
                  {allDonationData.length}
                  <span className="stat-unit">people</span>
                </div>
              </div>
            </div>

            {/* Description */}
            {donate.description && (
              <p className="desc-text">{donate.description}</p>
            )}

            {/* Amount Input */}
            <span className="field-label">Donation amount (ETH)</span>
            <div
              className="amount-wrapper"
              style={{
                borderColor: focused ? 'rgba(74,222,128,0.35)' : 'rgba(255,255,255,0.09)',
                boxShadow: focused ? '0 0 0 3px rgba(74,222,128,0.08)' : 'none',
              }}
            >
              <div className="amount-prefix">Ξ</div>
              <input
                ref={inputRef}
                type="number"
                className="amount-input"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                placeholder="0.00"
              />
            </div>

            {/* Quick Amounts */}
            <div className="quick-grid">
              {quickAmounts.map(val => (
                <button
                  key={val}
                  className={`quick-btn ${amount === String(val) ? "active" : "inactive"}`}
                  onClick={() => setAmount(String(val))}
                >
                  {val}
                </button>
              ))}
            </div>

            {/* Donors */}
            {allDonationData?.length > 0 && (
              <>
                <div className="divider" />
                <div className="donors-heading">Recent Donors</div>
                {allDonationData.map((item, i) => (
                  <div className="donor-row" key={i}>
                    <span className="donor-address">
                      {item.donator.slice(0, 6)}···{item.donator.slice(-4)}
                    </span>
                    <span className="donor-amount">{item.donation} ETH</span>
                  </div>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="popup-footer">
            <button className="cancel-btn" onClick={() => setOpenModel(false)}>
              Cancel
            </button>
            <button
              className={`donate-btn ${success ? "success-state" : isLoading ? "loading" : "idle"}`}
              onClick={createDonation}
              disabled={!amount || isLoading}
            >
              {success ? (
                <>
                  <span className="checkmark">✓</span>
                  Done!
                </>
              ) : isLoading ? (
                <>
                  <div className="spinner" />
                  Sending…
                </>
              ) : (
                "Donate"
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUp;