/**
 * Custom hook to handle submitting an edit house form.
 *
 * Manages form state and validation. On submit, calls API to update house record.
 * Shows loading state and error handling.
 *
 * @param houseDetails - Details of house being edited
 * @param typeOfHouse - Type of the house
 * @param selectedOption - Selected option for the house
 * @param streetName - Street name of house
 * @param locality - Locality of the house
 * @param postalCode - Postal code of the house
 * @param housingConditions - Housing condition of the house
 * @param area - Area of the house
 * @param selectedYear - Year selected for the house
 * @param latitude - Latitude coordinate of the house
 * @param longitude - Longitude coordinate of the house
 */

import { useState } from "react";
import { patch } from "@/fetchCallServices/fetchCalls";
import { useRouter } from "next/navigation";
import { validateFormHouse } from "@/utils/validationUtils";

export const useEditHouseForm = (
  houseDetails: any,
  typeOfHouse: string,
  selectedOption: string,
  streetName: string,
  locality: string,
  postalCode: string,
  housingConditions: string,
  selectedYear: string,
  area: string,
  latitude: string,
  longitude: string
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();

  const handleSubmit = async () => {
    setIsLoading(true);

    const confirmUpdate = window.confirm(
      "Tem a certeza que quer atualizar as informações do imóvel?"
    );

    // If the user confirms, proceed with the update
    if (confirmUpdate) {
      setIsLoading(true);

      const isValid = validateFormHouse(
        typeOfHouse,
        selectedOption,
        streetName,
        locality,
        postalCode,
        housingConditions,
        area,
        selectedYear,
        latitude,
        longitude,
        setError
      );

      if (!isValid) {
        setIsLoading(false);
        return;
      }

      try {
        // Construct the updated house object with the current state values
        const updatedHouse = {
          typeOfHouse,
          selectedOption,
          streetName,
          locality,
          postalCode,
          housingConditions,
          selectedYear,
          area,
          latitude,
          longitude,
        };

        console.log("Sending PATCH request with data:", updatedHouse);

        // Make a PATCH request to your backend API
        const response = await patch(
          `/api/editHouse/${houseDetails._id}`,
          updatedHouse
        );

        // Handle the response as needed (e.g., show a success message, update state)
        console.log("House updated successfully:", response);

        // Reset loading state
        router.push("/housesInRecord");
        setIsLoading(false);
      } catch (error) {
        console.error("Error updating house:", error);
        // Handle error state as needed
        setIsLoading(false);
      }
    }
  };
  return { isLoading, error, handleSubmit };
};
