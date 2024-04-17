"use client";

import { lazy, Suspense } from "react";
import { HouseTypeRadioGroup } from "@/components/childComponents/HouseTypeRadioGroup";
import { AddressInputFields } from "@/components/childComponents/AddressInputFields";
import years from "@/utils/years4RegisterHouseForm";
import useRegisterHouseForm from "@/customHooks/useRegisterHouseForm";
import Image from "next/image";
import { BsFillHouseAddFill } from "react-icons/bs";

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
    <div className="fixed top-16 bottom-12 left-0 right-0 overflow-y-auto ">
      <div className="grid place-items-start h-screen justify-center ">
        <div className="p-5">
          <div className="p-4 glass rounded-lg sm:w-64 md:w-80">
            {/* number of steps - x of y*/}
            <div className="mb-3 flex justify-end text-xs">
              Passo {currentStep} de {totalSteps}
            </div>
            <div className="flex items-center justify-center">
              <BsFillHouseAddFill size={32} className="mr-2" />
              <h1 className="text-xl font-black mt-2 text-gray-900">
                Registar casa
              </h1>
            </div>
            <div className="divider divider-primary"></div>
            {/* "multipart/form-data" - this tells the browser that the
        form will contain binary data, such as files. */}

            <form
              onSubmit={(e) => handleFormSubmit(e)}
              encType="multipart/form-data"
              className="flex flex-col gap-3 "
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
                  <div className="flex flex-col">
                    <p className="font-bold text-sm mb-1">
                      Condições de habitabilidade
                    </p>
                    <LazyHousingConditionsRadioGroup
                      setHousingConditions={setHousingConditions}
                      housingConditions={housingConditions}
                    />
                    <p className="font-bold mt-5 text-sm mb-1">Área Bruta</p>
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
                    {/* image *********************************************************************/}
                    <p className="font-bold text-sm mb-1">Imagem da casa</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChangeWrapper}
                      className="file-input file-input-bordered w-full max-w-xs"
                    />
                    {/* Image preview */}
                    {selectedImage && (
                      <div className="my-3 flex items-center justify-center">
                        <Image
                          src={selectedImage}
                          alt="Preview"
                          width={200}
                          height={200}
                          className=""
                        />
                      </div>
                    )}

                    <p className="font-bold mt-3 text-sm mb-1">
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
                    className="btn btn-neutral"
                  >
                    Anterior
                  </button>
                )}
                {currentStep < totalSteps && (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-neutral"
                  >
                    Seguinte
                  </button>
                )}

                {currentStep === totalSteps && (
                  <button
                    type="submit"
                    className="btn btn-primary"
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
    </div>
  );
};
