"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import { HouseTypeRadioGroup } from "@/components/childComponents/HouseTypeRadioGroup";
import { AddressInputFields } from "@/components/childComponents/AddressInputFields";
import years from "@/utils/years4RegisterHouseForm";
import useRegisterHouseForm from "@/customHooks/useRegisterHouseForm";
import Image from "next/image";

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
  } = useRegisterHouseForm();

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 border-black-400 border-2 bg-gray-100 ">
        {/* number of steps - x of y*/}
        <div className="mb-3 flex justify-end">
          Passo {currentStep} de {totalSteps}
        </div>
        <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
          Registar casa
        </h1>
        {/* "multipart/form-data" - this tells the browser that the
        form will contain binary data, such as files. */}

        <form
          onSubmit={(e) =>
            handleFormSubmit(e, selectedImageFile, imageMimeType)
          }
          encType="multipart/form-data"
        >
          {currentStep === 1 && (
            <div className="flex flex-col w-80">
              <p className="font-bold mt-5">Tipo de casa</p>
              <HouseTypeRadioGroup
                setTypeOfHouse={setTypeOfHouse}
                typeOfHouse={typeOfHouse}
                selectedOption={selectedOption}
                handleOptionChange={handleOptionChange}
              />
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
          {currentStep === 2 && (
            <Suspense fallback={<div>A processar...</div>}>
              <div className="flex flex-col w-80">
                <p className="font-bold mt-5">Condições de habitabilidade</p>
                <LazyHousingConditionsRadioGroup
                  setHousingConditions={setHousingConditions}
                  housingConditions={housingConditions}
                />
                <p className="font-bold mt-5">Área Bruta</p>
                <LazyAreaInputField area={area} setArea={setArea} />

                <p className="font-bold mt-5">Ano de construção</p>
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
              <div className="flex flex-col w-80">
                {/* image *********************************************************************/}
                <p className="font-bold mt-5">Imagem da casa</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="py-1 mt-3"
                />
                {/* Image preview */}
                {selectedImage && (
                  <div className="my-3 w-200 h-200 aspect-w-1 aspect-h-1">
                    <Image
                      src={selectedImage}
                      alt="Preview"
                      width={200}
                      height={200}
                      className="object-cover w-full h-full"
                    />
                  </div>
                )}

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
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
              >
                Anterior
              </button>
            )}
            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
              >
                Próximo
              </button>
            )}

            {currentStep === totalSteps && (
              <button
                type="submit"
                className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
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
    </div>
  );
};
