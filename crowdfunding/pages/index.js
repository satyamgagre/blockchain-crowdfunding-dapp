import React, { useEffect, useContext, useState } from 'react';

// INTERNAL IMPORT
import { CrowdFundingContext } from '../Context/CrowdFunding';
import { Hero, Card, PopUp } from '../Components';

const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations,
  } = useContext(CrowdFundingContext);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaigns, setUserCampaigns] = useState([]);

  useEffect(() => {
    const getCampaignsData = getCampaigns();
    const userCampaignsData = getUserCampaigns();

    const fetchData = async () => {
      const allData = await getCampaignsData;
      const userData = await userCampaignsData;

      setAllCampaigns(allData);
      setUserCampaigns(userData);
    };

    fetchData();
  }, []);

  // DONATE POPUP MODAL
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState({});

  console.log('Donate Campaign:', donateCampaign);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />

      <Card
        title="All Listed Campaigns"
        allCampaigns={allCampaigns}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      <Card
        title="Your Created Campaigns"
        allCampaigns={userCampaigns}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />

      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default index;
