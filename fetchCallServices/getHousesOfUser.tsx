import { HOUSE_IN_RECORDS_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { House } from "@/interfaces/interfaces";

export async function getHousesOfUser(
  setHouses: (houses: House[]) => void,
  userEmail?: string | null
) {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (userEmail) {
      headers.Authorization = userEmail;
    }

    const response = await fetch(HOUSE_IN_RECORDS_API_ENDPOINT, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch houses");
    }

    const fetchedHouses: House[] = await response.json();
    // Map fetched values to display values
    const mappedHouses = fetchedHouses.map((house) => ({
      ...house,
      housingConditions: mapHousingCondition(house.housingConditions),
    }));
    setHouses(mappedHouses);
    console.log(mappedHouses);
  } catch (error) {
    console.error(error);
  }
}

// Function to map housing conditions
const mapHousingCondition = (condition: string) => {
  return conditionsMapHouses[condition] || condition;
};
