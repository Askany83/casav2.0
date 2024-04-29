import { useEffect, useState } from "react";
import { houseOwnerProfileFetch } from "@/fetchCallServices/getHouseOwnerProfile";
import { useUserEmailFromSession } from "@/customHooks/useUserEmailFromSession";

export function useUserIdFromSession() {
  const [userId, setUserId] = useState<string | null>(null);
  const userEmail = useUserEmailFromSession();

  useEffect(() => {
    if (userEmail) {
      houseOwnerProfileFetch(userEmail)
        .then((userData) => {
          if (userData && userData._id) {
            setUserId(userData._id);
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userEmail]);

  return userId;
}
