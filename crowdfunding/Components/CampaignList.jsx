import React, { useEffect, useState } from "react";
import { getCampaigns } from "../lib/campaignService";
import CampaignCard from "./CampaignCard";

const CampaignList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCampaigns();
      setCampaigns(data);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "40px" }}>
      <h2>All Campaigns</h2>

      <div style={{ display: "grid", gap: "20px" }}>
        {campaigns.map((item) => (
          <CampaignCard key={item.id} campaign={item} />
        ))}
      </div>
    </div>
  );
};

export default CampaignList;