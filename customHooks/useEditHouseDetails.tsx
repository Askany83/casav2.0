import { useEffect, useState } from "react";
import useFullHouseDetails from "@/customHooks/useFullHouseDetails";

const useEditHouseDetails = (id: string) => {
  const [typeOfHouse, setTypeOfHouse] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [housingConditions, setHousingConditions] = useState("");
  const [streetName, setStreetName] = useState("");
  const [locality, setLocality] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [area, setArea] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

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
      setPostalCode(houseDetails.postalCode || "");
      setHousingConditions(houseDetails.housingConditions || "");
      setSelectedYear(houseDetails.selectedYear || "");
      setArea(houseDetails.area || "");
      setLatitude(houseDetails.latitude || "");
      setLongitude(houseDetails.longitude || "");
    }

    // console.log("houseDetails_hook", houseDetails);
  }, [houseDetails]);

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
  };
};

export default useEditHouseDetails;
