/**
 * Renders the form for editing details of a house.
 * Includes components for selecting house type, entering address,
 * housing conditions, year built, area, and geo location.
 * Handles updating state for the form values.
 * Uses custom hooks for step navigation and managing form state.
 */

import { lazy, Suspense, useState } from "react";
import Image from "next/image";
// components
import { HouseTypeRadioGroup } from "@/components/childComponents/HouseTypeRadioGroup";
import { AddressInputFields } from "@/components/childComponents/AddressInputFields";
import CustomButton from "@/components/childComponents/CustomButton";
import ErrorMessage from "../childComponents/ErrorMessage";
import { BsFillHouseGearFill } from "react-icons/bs";
import isValidStep from "@/utils/validateNextButton";
import { useWindowSize } from "@/customHooks/useWindowSize";
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
import { useEffect, useRef } from "react";
import fetchGeocodingData from "@/fetchCallServices/fetchGeocodingData";
import Link from "next/link";

const EditHouseForm: React.FC<EditHouseFormProps> = ({
  typeOfHouse,
  selectedOption,
  houseDetails,
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
    civilParish,
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

  const [fetchingCoordinates, setFetchingCoordinates] = useState(false);

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (
        streetName &&
        locality &&
        municipality &&
        postalCode &&
        municipality
      ) {
        try {
          setFetchingCoordinates(true);
          const geocodingData = await fetchGeocodingData(
            `${streetName}, ${locality}, ${municipality}, ${postalCode}`
          );
          setLatitude(geocodingData.latitude);
          setLongitude(geocodingData.longitude);
        } catch (error) {
          console.error("Error fetching coordinates:", error);
          // Optionally update state to show error
        } finally {
          setFetchingCoordinates(false);
        }
      }
    };

    fetchCoordinates();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [streetName, locality, municipality, postalCode]);

  const { width = 0 } = useWindowSize();
  const isLaptop = width >= 1024;

  return (
    <div className="fixed top-0 bottom-0 left-18 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5 lg:w-[90rem] w-72">
          <div className="flex items-center justify-start">
            <BsFillHouseGearFill
              size={32}
              className="mr-4 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
            />
            <h1 className="text-sm md:text-2xl font-black text-gray-900">
              Editar casa
            </h1>
          </div>
          <div className={`p-4 ${isLaptop ? "lg:w-[90rem]" : "w-72"}`}>
            {isLaptop ? (
              <div className="flex flex-row justify-start items-start mt-9">
                {houseDetails && (
                  <form
                    onSubmit={(e) => handleSubmit()}
                    encType="multipart/form-data"
                    className="flex flex-col gap-3 "
                  >
                    <div className="mb-2 flex flex-row">
                      <div className="flex flex-col mr-24 w-1/3">
                        <p className="font-bold text-sm">Tipo de casa</p>
                        <HouseTypeRadioGroup
                          setTypeOfHouse={handleTypeOfHouseChange}
                          typeOfHouse={typeOfHouse}
                          selectedOption={selectedOption}
                          handleOptionChange={handleOptionChange}
                        />
                        <p className="font-bold mt-7 text-sm mb-1">
                          Área Bruta (m²)
                        </p>
                        <LazyAreaInputField area={area} setArea={setArea} />
                        <p className="font-bold mt-7 text-sm mb-1">
                          Ano de construção
                        </p>
                        <LazyYearSelect
                          selectedYear={selectedYear}
                          handleYearChange={handleYearChange}
                          years={years}
                        />

                        <p className="font-bold mt-5 text-sm mb-1">
                          Condições de habitabilidade
                        </p>
                        <LazyHousingConditionsRadioGroup
                          setHousingConditions={setHousingConditions}
                          housingConditions={housingConditions}
                        />
                      </div>

                      <div className="flex flex-col mr-24 w-1/3">
                        <div className="mt-1">
                          <AddressInputFields
                            streetName={streetName}
                            locality={locality}
                            civilParish={civilParish}
                            municipality={municipality}
                            postalCode={postalCode}
                            setStreetName={setStreetName}
                            setMunicipality={setMunicipality}
                            setLocality={setLocality}
                            setCivilParish={setCivilParish}
                            setPostalCode={setPostalCode}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col w-1/3 mr-24">
                        {/* Image preview */}
                        {selectedImage && (
                          <div className="w-80 h-80 mb-10">
                            <p className="font-bold my-1 text-xs md:text-sm">
                              Nova imagem
                            </p>
                            <Image
                              src={selectedImage}
                              alt="Preview"
                              width={200}
                              height={200}
                              className="mt-1 rounded-lg w-full h-full object-cover"
                            />
                          </div>
                        )}
                        {/* Render the image here of mongoDB */}
                        {!selectedImage && imageBlob && (
                          <>
                            <div className=" w-80 h-80 mb-10">
                              <p className="font-bold text-xs md:text-sm mb-3">
                                Imagem na base de dados
                              </p>

                              <Image
                                src={URL.createObjectURL(imageBlob)}
                                alt="House"
                                width={300}
                                height={300}
                                className="mt-1 rounded-lg w-full h-full object-cover"
                              />
                            </div>
                          </>
                        )}
                        <p className="font-bold text-sm mb-1 mt-3">Imagem</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChangeWrapper}
                          placeholder="Image"
                          className="file-input file-input-bordered file-input-teal-950 file-input-sm rounded-none md:file-input-md  w-full max-w-xs"
                        />
                      </div>
                      <div className="flex flex-col justify-start items-start gap-x-2 mr-14">
                        <div>
                          <p className="font-bold mt-6 text-sm mb-2">
                            Georreferenciação
                          </p>
                          <LazyGeoLocationInputFields
                            latitude={latitude}
                            longitude={longitude}
                            setLatitude={setLatitude}
                            setLongitude={setLongitude}
                          />
                        </div>
                        <Link href={`/house/${houseDetails._id}`}>
                          <button className="btn btn-sm btn-outline rounded-none md:btn-md mb-4 mt-36 hover:bg-teal-950 hover:text-white w-32">
                            Cancelar
                          </button>
                        </Link>
                        <CustomButton text="Salvar" onClick={handleSubmit} />
                      </div>
                    </div>
                  </form>
                )}
              </div>
            ) : (
              <>
                <div className="flex flex-row justify-center items-start mt-9">
                  {houseDetails && (
                    <form
                      onSubmit={(e) => handleSubmit()}
                      encType="multipart/form-data"
                      className="flex flex-col gap-3 "
                    >
                      {/* Rendering form based on current step 1 */}
                      {currentStep === 1 && (
                        <div className="flex flex-col mr-24 w-1/3">
                          <p className="font-bold text-sm">Tipo de casa</p>
                          <HouseTypeRadioGroup
                            setTypeOfHouse={handleTypeOfHouseChange}
                            typeOfHouse={typeOfHouse}
                            selectedOption={selectedOption}
                            handleOptionChange={handleOptionChange}
                          />
                          <p className="font-bold mt-5 text-sm mb-1">
                            Área Bruta
                          </p>
                          <LazyAreaInputField area={area} setArea={setArea} />
                          <p className="font-bold mt-4 text-sm mb-1">
                            Ano de construção
                          </p>
                          <LazyYearSelect
                            selectedYear={selectedYear}
                            handleYearChange={handleYearChange}
                            years={years}
                          />

                          <p className="font-bold mt-1 text-sm mb-1">
                            Condições de habitabilidade
                          </p>
                          <LazyHousingConditionsRadioGroup
                            setHousingConditions={setHousingConditions}
                            housingConditions={housingConditions}
                          />
                        </div>
                      )}
                      {/* 
              
              Rendering form based on current step 2
              
              */}
                      {currentStep === 2 && (
                        <Suspense fallback={<div>A processar...</div>}>
                          <div className="flex flex-col mr-24 w-1/3">
                            <p className="font-bold text-sm">Morada completa</p>
                            <div className="mt-1">
                              <AddressInputFields
                                streetName={streetName}
                                locality={locality}
                                civilParish={civilParish}
                                municipality={municipality}
                                postalCode={postalCode}
                                setStreetName={setStreetName}
                                setMunicipality={setMunicipality}
                                setLocality={setLocality}
                                setCivilParish={setCivilParish}
                                setPostalCode={setPostalCode}
                              />
                            </div>
                          </div>
                        </Suspense>
                      )}
                      {/* 
              
              Rendering form based on current step 3
              
              */}
                      {currentStep === 3 && (
                        <Suspense fallback={<div>A processar...</div>}>
                          <div className="flex flex-col w-1/3">
                            {/* Image preview */}
                            {selectedImage && (
                              <div className="w-80 h-80 mb-10">
                                <p className="font-bold my-1 text-xs md:text-sm">
                                  Nova imagem
                                </p>
                                <Image
                                  src={selectedImage}
                                  alt="Preview"
                                  width={200}
                                  height={200}
                                  className="mt-1 rounded-lg w-full h-full object-cover"
                                />
                              </div>
                            )}
                            {/* Render the image here of mongoDB */}
                            {!selectedImage && imageBlob && (
                              <>
                                <div className=" w-80 h-80 mb-10">
                                  <p className="font-bold text-xs md:text-sm mb-3">
                                    Imagem na base de dados
                                  </p>

                                  <Image
                                    src={URL.createObjectURL(imageBlob)}
                                    alt="House"
                                    width={300}
                                    height={300}
                                    className="mt-1 rounded-lg w-full h-full object-cover"
                                  />
                                </div>
                              </>
                            )}
                            <p className="font-bold text-sm mb-1">Imagem</p>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleImageChangeWrapper}
                              placeholder="Image"
                              className="file-input file-input-bordered file-input-teal-950 file-input-sm rounded-none md:file-input-md  w-full max-w-xs"
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
                            className="btn btn-neutral btn-outline btn-sm rounded-none md:btn-md"
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
                            className="btn btn-neutral btn-outline btn-sm rounded-none md:btn-md"
                            disabled={!isValid}
                          >
                            Seguinte
                          </button>
                        )}
                        {/* 
                
                Submit button 
                
                
                */}
                        {currentStep === totalSteps && (
                          <CustomButton
                            text="Submeter"
                            onClick={handleSubmit}
                          />
                        )}
                      </div>
                    </form>
                  )}
                </div>
                {/* 
          
          Display error message 
          
          */}
                {!houseDetails && <div>House details not found.</div>}
                <ErrorMessage error={error || formError} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditHouseForm;
