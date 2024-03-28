/**
 * EditHouse component renders the EditHouseForm and handles all state
 * and logic for editing house details.
 *
 * It uses the useEditHouseDetails custom hook to manage state and effects.
 *
 * The component takes in the house id as a parameter and passes it to
 * useEditHouseDetails hook. It renders the form and passes all the required
 * props from the hook.
 */

"use client";

import EditHouseForm from "@/components/parentComponents/EditHouseForm";
import useEditHouseDetails from "@/customHooks/useEditHouseDetails";

export const EditHouse = ({ params }: { params: { _id: string } }) => {
  const id = params._id;

  const {
    typeOfHouse,
    selectedOption,
    houseDetails,
    isLoading,
    handleTypeOfHouseChange,
    handleOptionChange,
    streetName,
    locality,
    postalCode,
    housingConditions,
    selectedYear,
    area,
    latitude,
    longitude,
    setStreetName,
    setLocality,
    setPostalCode,
    setHousingConditions,
    handleYearChange,
    setArea,
    setLatitude,
    setLongitude,
    imageBlob,
  } = useEditHouseDetails(id);

  return (
    <>
      <EditHouseForm
        typeOfHouse={typeOfHouse}
        selectedOption={selectedOption}
        houseDetails={houseDetails}
        handleTypeOfHouseChange={handleTypeOfHouseChange}
        handleOptionChange={handleOptionChange}
        streetName={streetName}
        locality={locality}
        postalCode={postalCode}
        housingConditions={housingConditions}
        selectedYear={selectedYear}
        area={area}
        latitude={latitude}
        longitude={longitude}
        setStreetName={setStreetName}
        setLocality={setLocality}
        setPostalCode={setPostalCode}
        setHousingConditions={setHousingConditions}
        handleYearChange={handleYearChange}
        setArea={setArea}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
        imageBlob={imageBlob}
      />
    </>
  );
};

export default EditHouse;
