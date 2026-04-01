const CampaignCard = ({ campaign }) => {
  const raised = campaign.raised || 0;
  const target = Number(campaign.amount) || 0;

  const progress =
    target > 0 ? Math.min((raised / target) * 100, 100) : 0;

  return (
    <div style={styles.card}>

      {/* IMAGE */}
      <div style={styles.imageWrapper}>
        <img
          src="https://images.unsplash.com/photo-1559027615-cd4628902d4a"
          alt="campaign"
          style={styles.image}
        />

        <span style={styles.badge}>
          {Math.max(0, 100 - Math.floor(progress))}% left
        </span>
      </div>

      {/* CONTENT */}
      <div style={styles.content}>
        <h3 style={styles.title}>{campaign.title}</h3>

        <p style={styles.desc}>
          {campaign.description}
        </p>

        {/* PROGRESS */}
        <div style={styles.progressWrapper}>
          <div
            style={{
              ...styles.progressBar,
              width: `${progress}%`,
            }}
          />
        </div>

        {/* STATS */}
        <div style={styles.stats}>
          <div>
            <p style={styles.label}>Raised</p>
            <p style={styles.value}>₹ {raised}</p>
          </div>

          <div>
            <p style={styles.label}>Target</p>
            <p style={styles.value}>₹ {target}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    width: "320px",
    backgroundColor: "#3A3A38",
    borderRadius: "18px",
    border: "1px solid #5F5E5A",
    overflow: "hidden",
    boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
  },

  imageWrapper: {
    position: "relative",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },

  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "rgba(0,0,0,0.6)",
    color: "#fff",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "10px",
  },

  content: {
    padding: "16px",
  },

  title: {
    color: "#F1EFE8",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "8px",
  },

  desc: {
    color: "#B4B2A9",
    fontSize: "13px",
    marginBottom: "12px",
  },

  progressWrapper: {
    height: "6px",
    backgroundColor: "#5F5E5A",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: "12px",
  },

  progressBar: {
    height: "100%",
    background:
      "linear-gradient(90deg, #6B8CFF, #A855F7)",
  },

  stats: {
    display: "flex",
    justifyContent: "space-between",
  },

  label: {
    fontSize: "11px",
    color: "#888780",
  },

  value: {
    fontSize: "14px",
    color: "#F1EFE8",
    fontWeight: "600",
  },
};

export default CampaignCard;