// useFetchUserRole.js or useFetchUserRole.ts
import { useEffect } from "react";
import { USER_ROLE_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";

export const useFetchUserRole = (
  userRole: string | null,
  setUserRole: (role: string) => void
): void => {
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch(USER_ROLE_API_ENDPOINT);
        const data = await response.json();

        console.log("User role data: ", data);
        if (response.ok) {
          setUserRole(data.role);
        } else {
          console.error("Error fetching user role:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    if (!userRole) fetchUserRole();
  }, [userRole, setUserRole]);
};
