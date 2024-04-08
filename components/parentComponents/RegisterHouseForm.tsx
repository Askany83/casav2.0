"use client";

import { lazy, Suspense } from "react";
import { HouseTypeRadioGroup } from "@/components/childComponents/HouseTypeRadioGroup";
import { AddressInputFields } from "@/components/childComponents/AddressInputFields";
import years from "@/utils/years4RegisterHouseForm";
import useRegisterHouseForm from "@/customHooks/useRegisterHouseForm";
import Image from "next/image";
import { Bank } from "@phosphor-icons/react";

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

  return (
    <div className="fixed top-16 bottom-10 left-0 right-0 overflow-y-auto ">
      <div className="h-full flex justify-center items-start">
        <div className="border border-black bg-amber-50 p-5 rounded-lg">
          {/* number of steps - x of y*/}
          <div className="mb-3 flex justify-end">
            Passo {currentStep} de {totalSteps}
          </div>
          <div className="flex items-center">
            <Bank
              size={32}
              weight="fill"
              style={{ fill: "black" }}
              className="mb-4 mr-2"
            />
            <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
              Registar casa
            </h1>
          </div>
          {/* "multipart/form-data" - this tells the browser that the
        form will contain binary data, such as files. */}

          <form
            onSubmit={(e) => handleFormSubmit(e)}
            encType="multipart/form-data"
          >
            {currentStep === 1 && (
              <div className="flex flex-col w-80">
                <p className="font-bold ">Tipo de casa</p>
                <HouseTypeRadioGroup
                  setTypeOfHouse={setTypeOfHouse}
                  typeOfHouse={typeOfHouse}
                  selectedOption={selectedOption}
                  handleOptionChange={handleOptionChange}
                />
                <p className="font-bold mt-5">Morada completa</p>
                <AddressInputFields
                  streetName={streetName}
                  locality={locality}
                  municipality={municipality}
                  postalCode={postalCode}
                  setStreetName={setStreetName}
                  setMunicipality={setMunicipality}
                  setLocality={setLocality}
                  setPostalCode={setPostalCode}
                />
              </div>
            )}
            {currentStep === 2 && (
              <Suspense fallback={<div>A processar...</div>}>
                <div className="flex flex-col w-80">
                  <p className="font-bold ">Condições de habitabilidade</p>
                  <LazyHousingConditionsRadioGroup
                    setHousingConditions={setHousingConditions}
                    housingConditions={housingConditions}
                  />
                  <p className="font-bold mt-5">Área Bruta</p>
                  <LazyAreaInputField area={area} setArea={setArea} />

                  <p className="font-bold mt-2">Ano de construção</p>
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
                  <p className="font-bold ">Imagem da casa</p>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChangeWrapper}
                    className="file-input file-input-bordered w-full max-w-xs mt-3"
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
                  className="btn btn-info cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
                >
                  Anterior
                </button>
              )}
              {currentStep < totalSteps && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn btn-info cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
                >
                  Próximo
                </button>
              )}

              {currentStep === totalSteps && (
                <button
                  type="submit"
                  className="btn btn-success cursor-pointer px-6 py-2 my-3 m-1 flex-grow"
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
    </div>
  );
};
