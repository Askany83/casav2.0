"use client";

import { lazy, Suspense, useState, useEffect, useRef } from "react";
import { HouseTypeRadioGroup } from "@/components/childComponents/HouseTypeRadioGroup";
import { AddressInputFields } from "@/components/childComponents/AddressInputFields";
import years from "@/utils/years4RegisterHouseForm";
import useRegisterHouseForm from "@/customHooks/useRegisterHouseForm";
import { BsFillHouseAddFill } from "react-icons/bs";
import isValidStep from "@/utils/validateNextButton";
import ImageUploader from "../childComponents/ImageUploaderRegisterHouse";
import fetchGeocodingData from "@/fetchCallServices/fetchGeocodingData";
import { useWindowSize } from "@/customHooks/useWindowSize";

//lazy loading
const ErrorMessage = lazy(
  () => import("@/components/childComponents/ErrorMessage")
);
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

export const RegisterHouseForm: React.FC = () => {
  const {
    typeOfHouse,
    setTypeOfHouse,
    housingConditions,
    setHousingConditions,
    selectedOption,
    setSelectedOption,
    selectedYear,
    setSelectedYear,
    area,
    setArea,
    streetName,
    setStreetName,
    locality,
    setLocality,
    civilParish,
    setCivilParish,
    municipality,
    setMunicipality,
    postalCode,
    setPostalCode,
    latitude,
    setLatitude,
    longitude,
    setLongitude,
    error,
    handleOptionChange,
    handleYearChange,
    handleFormSubmit,
    currentStep,
    totalSteps,
    handleNext,
    handlePrev,
    handleImageChange,
    selectedImage,
    selectedImageFile,
    setSelectedImageFile,
    imageMimeType,
    handleImageChangeWrapper,
  } = useRegisterHouseForm();

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
  const municipalityRef = useRef<string>();

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (
        streetName &&
        locality &&
        municipality &&
        postalCode &&
        municipalityRef.current !== municipality // Only fetch if municipality changes
      ) {
        try {
          setFetchingCoordinates(true);
          const geocodingData = await fetchGeocodingData(
            `${streetName}, ${locality}, ${municipality}, ${postalCode}`
          );
          setLatitude(geocodingData.latitude);
          setLongitude(geocodingData.longitude);
          municipalityRef.current = municipality; // Update ref to current municipality
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
    <div className="fixed top-8 lg:top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className={`p-4 ${isLaptop ? "lg:w-[90rem]" : "w-72"}`}>
          {isLaptop ? (
            <>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <BsFillHouseAddFill
                    size={32}
                    className="mr-5 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
                  />
                  <h1 className="text-sm md:text-2xl font-black mt-1 text-gray-900">
                    Registar casa
                  </h1>
                </div>
              </div>

              <div className="flex flex-row justify-center items-start mt-9">
                <form
                  onSubmit={(e) => handleFormSubmit(e)}
                  encType="multipart/form-data"
                  className="flex flex-row"
                >
                  <div className="flex flex-col mr-24 w-1/3">
                    <p className="font-bold text-sm">Tipo de casa</p>
                    <HouseTypeRadioGroup
                      setTypeOfHouse={setTypeOfHouse}
                      typeOfHouse={typeOfHouse}
                      selectedOption={selectedOption}
                      handleOptionChange={handleOptionChange}
                    />

                    <p className="font-bold mt-5 text-sm mb-1">Área Bruta</p>
                    <LazyAreaInputField area={area} setArea={setArea} />

                    <p className="font-bold mt-6 text-sm mb-1">
                      Ano de construção
                    </p>
                    <LazyYearSelect
                      selectedYear={selectedYear}
                      handleYearChange={handleYearChange}
                      years={years}
                    />

                    <p className="font-bold mt-6 text-sm mb-1">
                      Condições de habitabilidade
                    </p>
                    <LazyHousingConditionsRadioGroup
                      setHousingConditions={setHousingConditions}
                      housingConditions={housingConditions}
                    />
                  </div>

                  <div className="flex flex-col mr-24 w-1/3">
                    <p className="font-bold text-sm">Morada completa</p>
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

                  <div className="flex flex-col w-1/3">
                    {/* image */}
                    <p className="font-bold text-sm mb-2">Imagem da casa</p>
                    <ImageUploader
                      selectedImage={selectedImage}
                      handleImageChangeWrapper={handleImageChangeWrapper}
                    />
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
                  <div className="flex justify-center gap-x-2 absolute bottom-4 left-0 right-0">
                    <button
                      type="submit"
                      className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950"
                      disabled={!selectedImageFile}
                    >
                      Registar
                    </button>
                    {error && (
                      <div className="flex justify-center">
                        <ErrorMessage error={error} />
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center">
                  <BsFillHouseAddFill
                    size={32}
                    className="mr-5 w-6 h-6 md:w-6 md:h-6 lg:w-8 lg:h-8"
                  />
                  <h1 className="text-sm md:text-2xl font-black mt-1 text-gray-900">
                    Registar casa
                  </h1>
                </div>
                {/* number of steps - x of y*/}
                <div className="flex justify-end text-xs mt-1">
                  Passo {currentStep} de {totalSteps}
                </div>
              </div>
              <div>
                <form
                  onSubmit={(e) => handleFormSubmit(e)}
                  encType="multipart/form-data"
                  className="flex flex-col gap-3 mt-11"
                >
                  {currentStep === 1 && (
                    <div className="flex flex-col">
                      <p className="font-bold text-sm">Tipo de casa</p>
                      <HouseTypeRadioGroup
                        setTypeOfHouse={setTypeOfHouse}
                        typeOfHouse={typeOfHouse}
                        selectedOption={selectedOption}
                        handleOptionChange={handleOptionChange}
                      />
                      <p className="font-bold mt-4 text-sm">Morada completa</p>
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
                  )}
                  {currentStep === 2 && (
                    <Suspense fallback={<div>A processar...</div>}>
                      <div className="flex flex-col">
                        <p className="font-bold text-sm mb-1">
                          Condições de habitabilidade
                        </p>
                        <LazyHousingConditionsRadioGroup
                          setHousingConditions={setHousingConditions}
                          housingConditions={housingConditions}
                        />
                        <p className="font-bold mt-5 text-sm mb-1">
                          Área Bruta
                        </p>
                        <LazyAreaInputField area={area} setArea={setArea} />

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
                  {currentStep === 3 && (
                    <Suspense fallback={<div>A processar...</div>}>
                      <div className="flex flex-col">
                        {/* image */}
                        <p className="font-bold text-sm mb-2">Imagem da casa</p>
                        <ImageUploader
                          selectedImage={selectedImage}
                          handleImageChangeWrapper={handleImageChangeWrapper}
                        />

                        <p className="font-bold mt-3 text-sm mb-2">
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
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handlePrev}
                        className="btn btn-neutral btn-sm rounded-none md:btn-md"
                      >
                        Anterior
                      </button>
                    )}
                    {currentStep < totalSteps && (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="btn btn-neutral btn-sm rounded-none md:btn-md"
                        disabled={!isValid}
                      >
                        Seguinte
                      </button>
                    )}

                    {currentStep === totalSteps && (
                      <button
                        type="submit"
                        className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white"
                        disabled={!selectedImageFile}
                      >
                        Registar
                      </button>
                    )}
                  </div>
                  <Suspense fallback={<div>A processar...</div>}>
                    {error && (
                      <div className="flex justify-center">
                        <ErrorMessage error={error} />
                      </div>
                    )}
                  </Suspense>
                </form>
              </div>
            </>
          )}

          {/* "multipart/form-data" - this tells the browser that the
        form will contain binary data, such as files. */}
        </div>
      </div>
    </div>
  );
};
