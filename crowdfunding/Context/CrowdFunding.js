import React, { useState, useEffect } from 'react';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

// INTERNAL IMPORT
import { CrowdFundingAddress, CrowdFundingABI } from './constants';

//  -- FETCHING SMART CONTRACT 
const fetchContract = (signerOrProvider) =>
    new ethers.Contract(CrowdFundingAddress, CrowdFundingABI, signerOrProvider);

export const CrowdFundingContext = React.createContext();

export const CrowdFundingProvider = ({ children }) => {
    const titleData = "CrowdFunding Contract";
    const [currentAccount, setCurrentAccount] = useState("");

    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        if (!title || !description || !amount || !deadline) {
            alert("Please fill all fields");
            return;
        }

        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(
                currentAccount, //Owner
                title, //Title
                description, //Description
                ethers.utils.parseEther(amount), //Amount
                Math.floor(new Date(deadline).getTime() / 1000) //Deadline
            );
            await transaction.wait();
            console.log("Contract call successful:", transaction);
        } catch (error) {
        console.error("Contract call failed:", error);
    }
    };

    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = fetchContract(provider);

        const campaigns = await contract.getCampaigns();

        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected),
            pId: i,
        }));

        return parsedCampaigns;
    };

    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = fetchContract(provider);

        const allCampaigns = await contract.getCampaigns();

        const account = await window.ethereum.request({
            method: "eth_accounts",
        });

        const currentUser = account[0] || "";

        const filteredCampaigns = allCampaigns.filter(
            (campaign) => 
                campaign.owner.toLowerCase() === currentUser.toLowerCase() //"0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266"
        );

        const userData = filteredCampaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected),
            pId: i,
        }));

        return userData;
    };

    const donate = async (pId, amount) => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),
        });

        await campaignData.wait();
        location.reload();

        return campaignData;
    };

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545");
        const contract = fetchContract(provider);

        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;

        const parsedDonations = [];

        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }

        return parsedDonations;
    };


    // CHECK IF WALLET IS CONNECTED
   const checkIfWalletIsConnected = async () => {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask.");
            return;
        }

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        });

            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            } else {
                console.log("No accounts found");
            }  }catch (error) {
                console.log("Something wrong while connecting to wallet", error);
            }
        }

    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);

    // CONNECT WALLET
    const connectWallet = async () => {
    try {
        if (!window.ethereum) {
            alert("Please install MetaMask.");
            return;
        }

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        });

        setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("Error while connecting to wallet", error);
        }
    };

    return (
        <CrowdFundingContext.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}
        >
            {children}
        </CrowdFundingContext.Provider>
    );
};