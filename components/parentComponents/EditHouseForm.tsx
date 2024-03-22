/**
 * Renders the form for editing details of a house.
 * Includes components for selecting house type, entering address,
 * housing conditions, year built, area, and geo location.
 * Handles updating state for the form values.
 * Uses custom hooks for step navigation and managing form state.
 */

import { lazy, Suspense } from "react";
// components
import { HouseTypeRadioGroup } from "@/components/childComponents/HouseTypeRadioGroup";
import { AddressInputFields } from "@/components/childComponents/AddressInputFields";
import CustomButton from "@/components/childComponents/CustomButton";
import ErrorMessage from "../childComponents/ErrorMessage";
import NavbarHouseOwner from "@/components/parentComponents/NavbarHouseOwner";
import Footer from "@/components/parentComponents/Footer";
// lazy components
const LazyHousingConditionsRadioGroup = lazy(
  () => import("@/components/childComponents/HousingConditionsRadioGroup")
);
const LazyYearSelect = lazy(
  () => import("@/components/childComponents/YearSelect")
);
const LazyAreaInputField = lazy(
  () => import("@/components/childComponents/AreaInputField")
);
const LazyGeoLocationInputFields = lazy(
  () => import("@/components/childComponents/GeoLocationInputFields")
);
// hooks
import { useStepNavigation } from "@/customHooks/useStepNavigation";
import { useEditHouseForm } from "@/customHooks/useEditHouseForm";
// util
import years from "@/utils/years4RegisterHouseForm";
// interface
import { EditHouseFormProps } from "@/interfaces/interfaces";

const EditHouseForm: React.FC<EditHouseFormProps> = ({
  typeOfHouse,
  selectedOption,
  houseDetails,
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
}) => {
  // Custom hook for managing navigation between steps
  const { currentStep, totalSteps, handleNext, handlePrev } =
    useStepNavigation();

  // Custom hook for handling form submission
  const { isLoading, error, handleSubmit } = useEditHouseForm(
    houseDetails,
    typeOfHouse,
    selectedOption,
    streetName,
    locality,
    postalCode,
    housingConditions,
    selectedYear,
    area,
    latitude,
    longitude
  );

  return (
    <>
      <NavbarHouseOwner />
      <div className="grid place-items-center h-screen">
        <div className="p-5 border-black-400 border-2 bg-gray-100 ">
          <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
            Editar casa
          </h1>
          {houseDetails && (
            <form>
              {/* 
              
              Rendering form based on current step 1
              
              */}
              {currentStep === 1 && (
                <div className="flex flex-col w-80">
                  {/* 
                  
                  Component for selecting house type 
                  
                  */}
                  <p className="font-bold mt-5">Tipo de casa</p>
                  <HouseTypeRadioGroup
                    setTypeOfHouse={handleTypeOfHouseChange}
                    typeOfHouse={typeOfHouse}
                    selectedOption={selectedOption}
                    handleOptionChange={handleOptionChange}
                  />
                  {/* 
                  
                  Component for inputting address details 
                  
                  */}
                  <p className="font-bold mt-5">Morada</p>
                  <AddressInputFields
                    streetName={streetName}
                    locality={locality}
                    postalCode={postalCode}
                    setStreetName={setStreetName}
                    setLocality={setLocality}
                    setPostalCode={setPostalCode}
                  />
                </div>
              )}
              {/* 
              
              Rendering form based on current step 2
              
              */}
              {currentStep === 2 && (
                <Suspense fallback={<div>A processar...</div>}>
                  <div className="flex flex-col w-80">
                    {/* 
                    
                    Lazy-loaded component for selecting housing conditions 
                    
                    */}
                    <p className="font-bold mt-5">
                      Condições de habitabilidade
                    </p>
                    <LazyHousingConditionsRadioGroup
                      setHousingConditions={setHousingConditions}
                      housingConditions={housingConditions}
                    />
                    {/* 
                    
                    Lazy-loaded component for selecting year 
                    
                    */}
                    <p className="font-bold mt-5">Ano de construção</p>
                    <LazyYearSelect
                      selectedYear={selectedYear}
                      handleYearChange={handleYearChange}
                      years={years}
                    />
                  </div>
                </Suspense>
              )}
              {/* 
              
              Rendering form based on current step 3
              
              */}
              {currentStep === 3 && (
                <Suspense fallback={<div>A processar...</div>}>
                  <div className="flex flex-col w-80">
                    {/* 
                    
                    Lazy-loaded component for inputting area 
                    
                    */}
                    <p className="font-bold mt-5">Área Bruta</p>
                    <LazyAreaInputField area={area} setArea={setArea} />
                    {/* 
                    
                    Lazy-loaded component for inputting geolocation 
                    
                    */}
                    <p className="font-bold mt-5">Georreferenciação</p>
                    <LazyGeoLocationInputFields
                      latitude={latitude}
                      longitude={longitude}
                      setLatitude={setLatitude}
                      setLongitude={setLongitude}
                    />
                  </div>
                </Suspense>
              )}

              <div className="flex justify-center">
                {/* 
                
                Previous button 
                
                */}
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1 mr-5"
                  >
                    Anterior
                  </button>
                )}
                {/* 
                
                Next button 
                
                */}
                {currentStep < totalSteps && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1"
                  >
                    Próximo
                  </button>
                )}
                {/* 
                
                Submit button 
                
                
                */}
                {currentStep === totalSteps && (
                  <CustomButton text="Submeter" onClick={handleSubmit} />
                )}
              </div>
            </form>
          )}
          {/* 
          
          Display error message 
          
          */}
          {!houseDetails && <div>House details not found.</div>}
          <ErrorMessage error={error} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditHouseForm;
