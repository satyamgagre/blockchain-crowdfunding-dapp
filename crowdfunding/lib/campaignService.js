import { db } from "./firebase";
import { collection, getDocs } from "firebase/firestore";

// GET all campaigns
export const getCampaigns = async () => {
  try {
    const snapshot = await getDocs(collection(db, "campaigns"));

    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return data;
  } catch (error) {
    console.log("Error:", error);
    return [];
  }
};