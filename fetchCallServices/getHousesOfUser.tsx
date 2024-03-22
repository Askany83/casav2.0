/**
 * Fetches houses data for the given user from the API endpoint.
 * Maps over the fetched houses to transform the housingConditions to more readable values.
 * Checks sessionStorage for cached data before making the API request.
 * Updates React state and sessionStorage with the fetched/mapped houses data.
 */

import { HOUSE_IN_RECORDS_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { House } from "@/interfaces/interfaces";

export async function getHousesOfUser(
  // Function to fetch houses data and update state and session storage
  setHouses: (houses: House[]) => void,
  updateSessionStorage: (houses: House[]) => void,
  userEmail?: string | null // User email to include in request headers
) {
  try {
    if (!userEmail) {
      throw new Error("User email not provided.");
    }

    // Check for cached data in session storage
    const cachedData = sessionStorage.getItem("cachedHouses");
    if (cachedData) {
      const cachedHouses = JSON.parse(cachedData) as House[];
      console.log("Data is available in cache:", cachedHouses);
      setHouses(cachedHouses);
    }

    // Prepare request headers with user email
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };
    headers.Authorization = userEmail;

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
    console.log("Fetched houses:", fetchedHouses);

    const mappedHouses = fetchedHouses.map((house) => ({
      ...house,
      housingConditions: mapHousingCondition(house.housingConditions),
    }));

    // Compare fetched houses with cached houses
    const cachedHouses = JSON.parse(
      sessionStorage.getItem("cachedHouses") || "[]"
    );
    const isDifferent =
      JSON.stringify(mappedHouses) !== JSON.stringify(cachedHouses);

    // If fetched houses are different from cached houses, update cache and state
    if (isDifferent) {
      sessionStorage.setItem("cachedHouses", JSON.stringify(mappedHouses));
      updateSessionStorage(mappedHouses);
    }
  } catch (error) {
    console.error("Error fetching houses:", error);
  }
}

// Function to map housing conditions - user-readable strings for house conditions
const mapHousingCondition = (condition: string) => {
  return conditionsMapHouses[condition] || condition;
};
