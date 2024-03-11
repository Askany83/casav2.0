"use client";

import { lazy, Suspense } from "react";
import { HouseTypeRadioGroup } from "@/components/childComponents/HouseTypeRadioGroup";
import { AddressInputFields } from "@/components/childComponents/AddressInputFields";
import years from "@/utils/years4RegisterHouseForm";
import useRegisterHouseForm from "@/customHooks/useRegisterHouseForm";
import CustomButton from "@/components/childComponents/CustomButton";
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
        <form onSubmit={handleFormSubmit}>
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
                />
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
                <p className="font-bold mt-5">Área Bruta</p>
                <LazyAreaInputField area={area} setArea={setArea} />
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
                className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1"
              >
                Anterior
              </button>
            )}
            {currentStep < totalSteps && (
              <button
                type="button"
                onClick={handleNext}
                className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3 m-1"
              >
                Próximo
              </button>
            )}

            {currentStep === totalSteps && (
              <CustomButton onClick={() => handleFormSubmit} text="Registar" />
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
