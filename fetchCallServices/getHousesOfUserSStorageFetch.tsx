/**
 * Fetches houses data for the given user from the API endpoint.
 * Maps over the fetched houses to transform the housingConditions to more readable values.
 * Checks sessionStorage for cached data before making the API request.
 * Updates React state and sessionStorage with the fetched/mapped houses data.
 */

import { HOUSE_IN_RECORDS_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { House } from "@/interfaces/interfaces";
import { getHousesOfUserFetchSStorage } from "@/fetchCallServices/getHousesOfUserFetchSStorage";

let intervalId: NodeJS.Timeout | null = null;

export async function getHousesOfUser(
  // Function to fetch houses data and update state and session storage
  setHouses: (houses: House[]) => void,
  updateSessionStorage: (houses: House[]) => void,
  userId?: string | null
) {
  try {
    if (!userId) {
      throw new Error("User ID not provided.");
    }

    // Check for cached data in session storage
    const cachedData = sessionStorage.getItem("cachedHouses");
    if (cachedData) {
      const cachedHouses = JSON.parse(cachedData) as House[];

      console.log(
        "Data is available in cache - getHousesOfUser:",
        cachedHouses
      );
      setHouses(cachedHouses);
    } else {
      // Prepare request headers with userId
      const headers: { [key: string]: string } = {
        "Content-Type": "application/json",
      };
      headers.Authorization = userId;

      // Fetch houses data from API endpoint
      const response = await fetch(HOUSE_IN_RECORDS_API_ENDPOINT, {
        method: "GET",
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch houses");
      }

      // Process fetched houses data
      const fetchedHouses: House[] = (await response.json()) as House[];

      console.log("Fetched houses - getHousesOfUser:", fetchedHouses);

      const mappedHouses = fetchedHouses.map((house) => ({
        ...house,
        housingConditions: mapHousingCondition(house.housingConditions),
      }));
      // Update cache and state
      sessionStorage.setItem("cachedHouses", JSON.stringify(mappedHouses));
      updateSessionStorage(mappedHouses);
    }
  } catch (error) {
    console.error("Error fetching houses:", error);
  } finally {
    // Clear the existing interval before setting a new one
    if (intervalId) {
      clearInterval(intervalId);
    }
    // Set the new interval
    intervalId = setInterval(() => {
      getHousesOfUserFetchSStorage(userId);
    }, 1800000); // 3600 seconds = 1 hour -> set to 30 minutes
  }
}

// Function to map housing conditions - user-readable strings for house conditions
const mapHousingCondition = (condition: string) => {
  return conditionsMapHouses[condition] || condition;
};
