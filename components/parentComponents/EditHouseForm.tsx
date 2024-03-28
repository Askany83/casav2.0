/**
 * Renders the form for editing details of a house.
 * Includes components for selecting house type, entering address,
 * housing conditions, year built, area, and geo location.
 * Handles updating state for the form values.
 * Uses custom hooks for step navigation and managing form state.
 */

import { lazy, Suspense, useState } from "react";
import { Bank } from "@phosphor-icons/react";
import Image from "next/image";
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
import { handleImageChange } from "@/utils/imageConverter";
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
  imageBlob,
}) => {
  // Define state to store the selected image
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string>("");

  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [imageMimeType, setImageMimeType] = useState<string | null>(null);

  // Function to handle image selection
  const handleImageChangeWrapper = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files && event.target.files[0];

    if (!file) {
      setFormError("Por favor selecione uma imagem");
      return;
    }

    // Assuming these are your useState hooks

    await handleImageChange(
      file,
      setFormError,
      setSelectedImage,
      setSelectedImageFile,
      setImageMimeType
    );
  };

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
    longitude,
    selectedImage,
    imageMimeType
  );

  return (
    <>
      <NavbarHouseOwner />
      <div className="fixed top-16 bottom-10 left-0 right-0 overflow-y-auto ">
        <div className="h-full flex justify-center items-start">
          <div className="border border-black bg-amber-50 p-5 rounded-lg">
            <div className="flex items-center">
              <Bank
                size={32}
                weight="fill"
                style={{ fill: "black" }}
                className="mb-4 mr-2"
              />
              <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
                Editar casa
              </h1>
            </div>
            {houseDetails && (
              <form
                onSubmit={(e) => handleSubmit()}
                encType="multipart/form-data"
              >
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
                    
                    Lazy-loaded component for inputting area 
                    
                    */}
                      <p className="font-bold mt-5">Área Bruta</p>
                      <LazyAreaInputField area={area} setArea={setArea} />
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
                      <p className="font-bold my-1 mt-3">Imagem</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChangeWrapper}
                        placeholder="Image"
                        className="file-input file-input-bordered w-full max-w-xs"
                      />
                      {/* Image preview */}
                      {selectedImage && (
                        <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
                          <p className="font-bold my-1 mt-3">Nova imagem</p>
                          <Image
                            src={selectedImage}
                            alt="Preview"
                            width={200}
                            height={200}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      {/* Render the image here of mongoDB */}
                      {imageBlob && (
                        <div>
                          <p className="font-bold mt-5">Imagem atual</p>
                          <Image
                            src={URL.createObjectURL(imageBlob)}
                            alt="House"
                            width={200}
                            height={200}
                          />
                        </div>
                      )}
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
                      className="btn btn-info cursor-pointer flex-grow px-6 py-2 my-3 m-1 "
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
                      className="btn btn-info cursor-pointer flex-grow px-6 py-2 my-3 m-1"
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
            <ErrorMessage error={error || formError} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default EditHouseForm;
