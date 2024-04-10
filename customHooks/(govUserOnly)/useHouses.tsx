import { useEffect } from "react";
import { GET_ALL_HOUSES_IN_RECORD_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { House } from "@/interfaces/interfaces";

export const useHouses = (setHouses: (houses: House[]) => void) => {
  useEffect(() => {
    async function fetchAllHouses() {
      try {
        const cachedHouses = sessionStorage.getItem("cachedHouses");
        if (cachedHouses) {
          console.log("Using cached houses");
          setHouses(JSON.parse(cachedHouses));
          return;
        }

        const response = await fetch(GET_ALL_HOUSES_IN_RECORD_API_ENDPOINT);
        if (!response.ok) {
          throw new Error("Failed to fetch houses");
        }
        const data = await response.json();
        setHouses(data);

        sessionStorage.setItem("cachedHouses", JSON.stringify(data));
        console.log("Fetched all houses in record:", data);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    }

    fetchAllHouses();
  }, [setHouses]); // Dependency array includes setHouses to re-run if this function changes
};
