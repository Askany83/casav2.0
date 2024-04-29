import { useState, useEffect } from "react";
import { base64ToBlob } from "@/utils/base64ToBlob";

const useSessionUserData = (userId: string) => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
  });
  const [phone, setPhone] = useState("");
  const [sessionImage, setSessionImage] = useState<string | null>(null);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);

  useEffect(() => {
    const userDataFromSessionStorage =
      sessionStorage.getItem("houseOwnerProfile");

    if (userDataFromSessionStorage) {
      const parsedUserData = JSON.parse(userDataFromSessionStorage);

      setUserData({
        name: parsedUserData.name,
        surname: parsedUserData.surname,
        email: parsedUserData.email,
        phone: parsedUserData.phone,
      });
      setPhone(parsedUserData.phone);

      if (parsedUserData.image && parsedUserData.image.data) {
        setSessionImage(parsedUserData.image.data);

        const imageBlob = base64ToBlob(parsedUserData.image.data);
        if (imageBlob) {
          const url = URL.createObjectURL(imageBlob);
          setBlobUrl(url);
        } else {
          console.error("Failed to convert image data to blob.");
        }
      }
    }
  }, [userId]);

  return { userData, setUserData, phone, setPhone, sessionImage, blobUrl };
};

export default useSessionUserData;
