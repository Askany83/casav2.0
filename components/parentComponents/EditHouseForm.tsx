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
import { BsFillHouseGearFill } from "react-icons/bs";
import isValidStep from "@/utils/validateNextButton";
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
  municipality,
  postalCode,
  housingConditions,
  selectedYear,
  area,
  latitude,
  longitude,
  setStreetName,
  setLocality,
  setMunicipality,
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
    municipality,
    postalCode,
    housingConditions,
    selectedYear,
    area,
    latitude,
    longitude,
    selectedImage,
    imageMimeType
  );

  const isValid = isValidStep(
    currentStep,
    typeOfHouse,
    streetName,
    locality,
    municipality,
    postalCode,
    housingConditions,
    area,
    selectedYear,
    selectedImageFile,
    latitude,
    longitude
  );

  return (
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5">
          <div className="p-4 sm:w-64 md:w-80 -mt-4">
            <div className="flex items-center justify-center">
              <BsFillHouseGearFill
                size={32}
                className="mr-2 w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10"
              />
              <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
                Editar casa
              </h1>
            </div>
            <div className="divider divider-primary"></div>
            {houseDetails && (
              <form
                onSubmit={(e) => handleSubmit()}
                encType="multipart/form-data"
                className="flex flex-col gap-3 "
              >
                {/* Rendering form based on current step 1 */}
                {currentStep === 1 && (
                  <div className="flex flex-col">
                    {/* Component for selecting house type */}
                    <p className="font-bold text-sm">Tipo de casa</p>
                    <HouseTypeRadioGroup
                      setTypeOfHouse={handleTypeOfHouseChange}
                      typeOfHouse={typeOfHouse}
                      selectedOption={selectedOption}
                      handleOptionChange={handleOptionChange}
                    />
                    {/* 
                  
                  Component for inputting address details 
                  
                  */}
                    <p className="font-bold mt-4 text-sm">Morada</p>
                    <AddressInputFields
                      streetName={streetName}
                      locality={locality}
                      municipality={municipality}
                      postalCode={postalCode}
                      setStreetName={setStreetName}
                      setLocality={setLocality}
                      setMunicipality={setMunicipality}
                      setPostalCode={setPostalCode}
                    />
                  </div>
                )}
                {/* 
              
              Rendering form based on current step 2
              
              */}
                {currentStep === 2 && (
                  <Suspense fallback={<div>A processar...</div>}>
                    <div className="flex flex-col">
                      {/* 
                    
                    Lazy-loaded component for selecting housing conditions 
                    
                    */}
                      <p className="font-bold text-sm mb-1">
                        Condições de habitabilidade
                      </p>
                      <LazyHousingConditionsRadioGroup
                        setHousingConditions={setHousingConditions}
                        housingConditions={housingConditions}
                      />
                      {/* 
                    
                    Lazy-loaded component for inputting area 
                    
                    */}
                      <p className="font-bold mt-4 text-sm mb-1">Área Bruta</p>
                      <LazyAreaInputField area={area} setArea={setArea} />
                      {/* 
                    
                    Lazy-loaded component for selecting year 
                    
                    */}
                      <p className="font-bold mt-3 text-sm mb-1">
                        Ano de construção
                      </p>
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
                    <div className="flex flex-col">
                      <p className="font-bold text-sm mb-1">Imagem</p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChangeWrapper}
                        placeholder="Image"
                        className="file-input file-input-bordered file-input-primary file-input-sm rounded-box md:file-input-md w-full max-w-xs"
                      />
                      {/* Image preview */}
                      {selectedImage && (
                        <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
                          <p className="font-bold text-sm my-1 mt-1">
                            Nova imagem
                          </p>
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
                        <>
                          <p className="font-bold text-sm my-1 mb-1">
                            Imagem atual
                          </p>
                          <div className="flex items-center justify-center">
                            <Image
                              src={URL.createObjectURL(imageBlob)}
                              alt="House"
                              width={300}
                              height={300}
                              className="rounded-lg"
                            />
                          </div>
                        </>
                      )}
                      {/* 
                    
                    Lazy-loaded component for inputting geolocation 
                    
                    */}
                      <p className="font-bold text-sm mt-5 mb-1">
                        Georreferenciação
                      </p>
                      <LazyGeoLocationInputFields
                        latitude={latitude}
                        longitude={longitude}
                        setLatitude={setLatitude}
                        setLongitude={setLongitude}
                      />
                    </div>
                  </Suspense>
                )}

                <div className="flex justify-center gap-x-2">
                  {/* 
                
                Previous button 
                
                */}
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="btn btn-neutral btn-sm rounded-box md:btn-md"
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
                      className="btn btn-neutral btn-sm rounded-box md:btn-md"
                      disabled={!isValid}
                    >
                      Seguinte
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
    </div>
  );
};

export default EditHouseForm;
