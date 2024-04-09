import { HOUSE_IN_RECORDS_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { House } from "@/interfaces/interfaces";

export async function getHousesOfUser(userId?: string | null) {
  try {
    if (!userId) {
      throw new Error("User ID not provided.");
    }

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
  } catch (error) {
    console.error("Error fetching houses:", error);
  }
}

// Function to map housing conditions - user-readable strings for house conditions
const mapHousingCondition = (condition: string) => {
  return conditionsMapHouses[condition] || condition;
};
