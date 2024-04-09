/**
 * Custom hook that fetches full house details for a given house ID.
 * Uses cached house data in sessionStorage if available, otherwise returns null.
 */

import { useEffect, useState } from "react";

const useFullHouseDetails = (id: string) => {
  const [houseDetails, setHouseDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch house details from sessionStorage based on the provided id
    const cachedHouses = sessionStorage.getItem("cachedHouses");
    if (cachedHouses) {
      const parsedHouses = JSON.parse(cachedHouses);

      // Find the house with the provided id
      const foundHouse = parsedHouses.find((house: any) => house._id === id);

      // If the house is found, update state with its details
      if (foundHouse) {
        setHouseDetails(foundHouse);
        setIsLoading(false);

        // If house is not found
      } else {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setError("Falha ao carregar os detalhes da casa.");
    }
  }, [id]); // Trigger effect when id changes

  return { houseDetails, isLoading, error };
};

export default useFullHouseDetails;
