import { useEffect, useState, useRef } from "react";
import useFullHouseDetails from "@/customHooks/useFullHouseDetails";
import { base64ToBlob } from "@/utils/base64ToBlob";
import { conditionsMapHouses } from "@/utils/conditionsMapHouses";

// Create a reverse mapping object
const reverseConditionsMapHouses: { [key: string]: string } = {};
for (const key in conditionsMapHouses) {
  reverseConditionsMapHouses[conditionsMapHouses[key]] = key;
}

const useEditHouseDetails = (id: string) => {
  const [typeOfHouse, setTypeOfHouse] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [housingConditions, setHousingConditions] = useState("");
  const [streetName, setStreetName] = useState("");
  const [locality, setLocality] = useState("");
  const [civilParish, setCivilParish] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [area, setArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  const [imageBlob, setImageBlob] = useState<Blob | null>(null);

  // Fetch full house details using custom hook
  const { houseDetails, isLoading } = useFullHouseDetails(id);

  // Event handlers for changing house details
  const handleTypeOfHouseChange = (value: string) => {
    setTypeOfHouse(value);
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(e.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  // Update state when house details change
  useEffect(() => {
    if (houseDetails) {
      setTypeOfHouse(houseDetails.typeOfHouse || "");
      setSelectedOption(houseDetails.selectedOption || "");
      setStreetName(houseDetails.streetName || "");
      setLocality(houseDetails.locality || "");
      setCivilParish(houseDetails.civilParish || "");
      setMunicipality(houseDetails.municipality || "");
      setPostalCode(houseDetails.postalCode || "");
      setSelectedYear(houseDetails.selectedYear || "");
      setArea(houseDetails.area || "");
      setLatitude(houseDetails.latitude || "");
      setLongitude(houseDetails.longitude || "");

      // Reverse the user-readable string back to its corresponding key
      const reversedCondition =
        reverseConditionsMapHouses[houseDetails.housingConditions];
      setHousingConditions(reversedCondition || "");

      const imageData = houseDetails.image?.data || "";
      setImageBlob(base64ToBlob(imageData));
    }

    // Skip the first run to avoid infinite loop
    // if (!isInitialMount.current) {
    //   console.log("houseDetails - useEditHouseDetails: ", houseDetails);
    // } else {
    //   isInitialMount.current = false;
    // }
  }, [houseDetails]);

  // console.log("housing conditions - useEditHouseDetails: ", housingConditions);

  // Log imageBlob whenever it changes
  // useEffect(() => {
  //   console.log("image - : useEditHouseDetails", imageBlob);
  // }, [imageBlob]);

  return {
    typeOfHouse,
    selectedOption,
    houseDetails,
    isLoading,
    handleTypeOfHouseChange,
    handleOptionChange,
    streetName,
    setStreetName,
    locality,
    setLocality,
    civilParish,
    setCivilParish,
    postalCode,
    setPostalCode,
    housingConditions,
    selectedYear,
    area,
    latitude,
    longitude,
    setHousingConditions,
    handleYearChange,
    setArea,
    setLatitude,
    setLongitude,
    imageBlob,
    municipality,
    setMunicipality,
  };
};

export default useEditHouseDetails;
