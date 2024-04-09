import { useState, useEffect } from "react";
import { houseOwnerProfileFetch } from "@/fetchCallServices/getHouseOwnerProfile";
import { base64ToBlob } from "@/utils/base64ToBlob";

export function useUserData(decodedEmail: string) {
  const [userData, setUserData] = useState<any>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await houseOwnerProfileFetch(decodedEmail);
        setUserData(user);

        if (user && user.image && user.image.data) {
          const imageBlob = base64ToBlob(user.image.data);

          if (imageBlob) {
            const url = URL.createObjectURL(imageBlob);
            setBlobUrl(url);
          } else {
            console.error("Failed to convert image data to blob.");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [decodedEmail]);

  return { userData, blobUrl };
}
