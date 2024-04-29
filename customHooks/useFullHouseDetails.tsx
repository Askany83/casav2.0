"use client";

import { useEffect, useState } from "react";

const useFullHouseDetails = (id: string) => {
  const [houseDetails, setHouseDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [helpRequest, setHelpRequest] = useState<any>(null); // Change to any type

  useEffect(() => {
    const fetchHouseDetailsAndHelpRequest = async () => {
      try {
        // Fetch house details from sessionStorage based on the provided id
        const cachedHouses = sessionStorage.getItem("cachedHouses");
        if (cachedHouses) {
          const parsedHouses = JSON.parse(cachedHouses);

          // Find the house with the provided id
          const foundHouse = parsedHouses.find(
            (house: any) => house._id === id
          );

          // If the house is found, update state with its details
          if (foundHouse) {
            setHouseDetails(foundHouse);

            // Fetch help request data
            const response = await fetch(
              `/api/getHelpRequest?houseId=${foundHouse._id}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch help request data");
            }
            const helpRequestData = await response.json();
            setHelpRequest(helpRequestData);
            console.log("Help request data:", helpRequestData);

            // Store both house details and help request data in sessionStorage
            sessionStorage.setItem(
              "cachedHouseDetails",
              JSON.stringify(foundHouse)
            );
            sessionStorage.setItem(
              "helpRequest",
              JSON.stringify(helpRequestData)
            );
          } else {
            setError("Casa não encontrada.");
          }
        } else {
          setError("Falha ao carregar os detalhes da casa.");
        }
      } catch (error) {
        console.error("Error fetching house details:", error);
        setError("Erro ao carregar os detalhes da casa.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchHouseDetailsAndHelpRequest();
  }, [id]);

  return { houseDetails, helpRequest, isLoading, error };
};

export default useFullHouseDetails;
