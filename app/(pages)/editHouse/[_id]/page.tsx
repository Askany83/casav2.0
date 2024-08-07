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
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUserRole } from "@/context/useRoleContext";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import Footer from "@/components/parentComponents/Footer";

export const EditHouse = ({ params }: { params: { _id: string } }) => {
  const id = params._id;

  const router = useRouter();
  const { userRole } = useUserRole();

  useEffect(() => {
    // Redirect user if they do not have the appropriate role
    if (userRole !== "houseOwner") {
      router.push("/access-denied");
    }
  }, [userRole, router]);

  // console.log("User role - edit House:", userRole);

  const {
    typeOfHouse,
    selectedOption,
    houseDetails,
    isLoading,
    handleTypeOfHouseChange,
    handleOptionChange,
    streetName,
    locality,
    civilParish,
    municipality,
    postalCode,
    housingConditions,
    selectedYear,
    area,
    latitude,
    longitude,
    setStreetName,
    setLocality,
    setCivilParish,
    setMunicipality,
    setPostalCode,
    setHousingConditions,
    handleYearChange,
    setArea,
    setLatitude,
    setLongitude,
    imageBlob,
    //this retrieves the full house details to populate the fields, to see the hook that manages the edit form look inside the component - EditHouseForm
  } = useEditHouseDetails(id);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex justify-center items-center">
        <NavbarHouseOwner />
        <EditHouseForm
          typeOfHouse={typeOfHouse}
          selectedOption={selectedOption}
          houseDetails={houseDetails}
          handleTypeOfHouseChange={handleTypeOfHouseChange}
          handleOptionChange={handleOptionChange}
          streetName={streetName}
          locality={locality}
          civilParish={civilParish}
          municipality={municipality}
          postalCode={postalCode}
          housingConditions={housingConditions}
          selectedYear={selectedYear}
          area={area}
          latitude={latitude}
          longitude={longitude}
          setStreetName={setStreetName}
          setLocality={setLocality}
          setCivilParish={setCivilParish}
          setMunicipality={setMunicipality}
          setPostalCode={setPostalCode}
          setHousingConditions={setHousingConditions}
          handleYearChange={handleYearChange}
          setArea={setArea}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          imageBlob={imageBlob}
        />
        <Footer />
      </div>
    </main>
  );
};

export default EditHouse;
