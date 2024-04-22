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
 * @param municipality - Municipality of the house
 * @param postalCode - Postal code of the house
 * @param housingConditions - Housing condition of the house
 * @param area - Area of the house
 * @param selectedYear - Year selected for the house
 * @param latitude - Latitude coordinate of the house
 * @param longitude - Longitude coordinate of the house
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateFormHouse } from "@/utils/validationUtils";
import xss from "xss";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";
import { useUserIdFromSession } from "./useUserIdFromSession";
import { EDIT_HOUSE_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";

export const useEditHouseForm = (
  houseDetails: any,
  typeOfHouse: string,
  selectedOption: string,
  streetName: string,
  locality: string,
  municipality: string,
  postalCode: string,
  housingConditions: string,
  selectedYear: string,
  area: string,
  latitude: string,
  longitude: string,
  selectedImage: string | null,
  imageMimeType: string | null
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const router = useRouter();
  //get user id
  const userId = useUserIdFromSession();

  //Update house details
  const handleSubmit = async () => {
    setIsLoading(true);

    const confirmUpdate = window.confirm(
      "Tem a certeza que quer atualizar as informações do imóvel?"
    );

    // If the user confirms, proceed with the update
    if (confirmUpdate) {
      setIsLoading(true);

      try {
        const isValid = validateFormHouse(
          typeOfHouse,
          selectedOption,
          streetName,
          locality,
          municipality,
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

        const formData = new FormData();

        // Append each form field and log it
        formData.append("typeOfHouse", xss(typeOfHouse.trim()));
        formData.append("housingConditions", xss(housingConditions.trim()));
        formData.append("selectedOption", xss(selectedOption.trim()));
        formData.append("selectedYear", xss(selectedYear.trim()));
        formData.append("area", xss(area.trim()));
        formData.append("streetName", xss(streetName.trim()));
        formData.append("locality", xss(locality.trim()));
        formData.append("municipality", xss(municipality.trim()));
        formData.append("postalCode", xss(postalCode.trim()));
        formData.append("latitude", xss(latitude.trim()));
        formData.append("longitude", xss(longitude.trim()));

        if (userId) {
          formData.append("userId", userId);
        }

        // Append image data and MIME type if available
        // console.log("selectedImageFile:", selectedImageFile);
        // console.log("imageMimeType:", imageMimeType);

        // Append image data and MIME type if available
        if (selectedImage && imageMimeType) {
          formData.append("imageBase64", selectedImage);
          formData.append("imageType", imageMimeType);

          // console.log("Appended image 222:", selectedImage);
          // console.log("Appended imageType 222:", imageMimeType);

          // Logging formData entries
          // console.log("FormData entries:");
          // for (const [key, value] of Array.from(formData.entries())) {
          //   console.log(`${key}: ${value}`);
          // }
        } else {
          console.log("No image to append to formData.");
        }

        // Make a PATCH request to your backend API
        const response = await fetch(
          EDIT_HOUSE_API_ENDPOINT(houseDetails._id),
          {
            method: "PATCH",
            body: formData,
          }
        );

        // Handle the response as needed
        // console.log("House updated successfully - useEditHouseForm:", response);
        if (response.ok) {
          // House updated successfully
          const cachedData = sessionStorage.getItem("cachedHouses");
          if (cachedData) {
            const cachedHouses = JSON.parse(cachedData) as any[];
            const updatedHouses = cachedHouses.map((house) => {
              if (house._id === houseDetails._id) {
                return {
                  ...house,
                  typeOfHouse,
                  housingConditions: conditionsMapHouses[housingConditions],
                  selectedOption,
                  selectedYear,
                  area,
                  streetName,
                  locality,
                  municipality,
                  postalCode,
                  latitude,
                  longitude,
                  userId,
                  image: {
                    data: selectedImage ? selectedImage : house.image?.data,
                    contentType: imageMimeType
                      ? imageMimeType
                      : house.image?.contentType,
                  },
                };
              }
              return house;
            });
            sessionStorage.setItem(
              "cachedHouses",
              JSON.stringify(updatedHouses)
            );
          }

          alert("Casa editada com sucesso!");
          router.push("/housesInRecord");
        } else {
          console.error("Failed to update house");
        }
      } catch (error) {
        console.error("Error updating house:", error);
        setError(
          "Erro ao atualizar a casa. Por favor, tente novamente mais tarde."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };
  return { isLoading, error, handleSubmit };
};
