"use client";

import { useState, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import { REGISTER_HOUSE_API_ENDPOINT } from "../app/utils/URLManager";
import {
  validateStreetName,
  validateLocality,
  validatePostalCode,
  validateArea,
  validateLatitude,
  validateLongitude,
} from "@/app/utils/valitationUtils";
import xss from "xss";
import { useSession } from "next-auth/react";
import { HouseTypeRadioGroup } from "./HouseTypeRadioGroup";
import { AddressInputFields } from "./AddressInputFields";
import { HousingConditionsRadioGroup } from "./HousingConditionsRadioGroup";
import { YearSelect } from "./YearSelect";
import { AreaInputField } from "./AreaInputField";
import { GeoLocationInputFields } from "./GeoLocationInputFields";
//lazy loading
const ErrorMessage = lazy(() => import("@/components/ErrorMessage"));

export const RegisterHouseForm: React.FC = () => {
  const [typeOfHouse, setTypeOfHouse] = useState<string>("apartamento");
  const [housingConditions, setHousingConditions] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string>("t1");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [area, setArea] = useState<string>("");
  const [streetName, setStreetName] = useState<string>("");
  const [locality, setLocality] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [latitude, setLatitude] = useState<string>("");
  const [longitude, setLongitude] = useState<string>("");
  const [error, setError] = useState<string>("");

  const years = [];
  for (let year = 1900; year <= 2024; year++) {
    years.push(year);
  }

  const router = useRouter();
  const { data: session } = useSession();
  const userEmail = session?.user?.email;

  const validateForm = () => {
    if (!typeOfHouse) {
      setError("Tipo de casa: vazio");
      return false;
    }
    if (!selectedOption) {
      setError("Número de quartos: vazio");
      return false;
    }
    if (!streetName || !validateStreetName(streetName)) {
      setError("Nome da rua: vazio ou formato inválido");
      alert("Nome da rua deve ter entre 5 e 100 caracteres");
      return false;
    }

    if (!locality || !validateLocality(locality)) {
      setError("Localidade: vazia ou com caracteres inválidos");
      alert("Localidade deve ter entre 2 e 100 caracteres");
      return false;
    }

    if (!postalCode || !validatePostalCode(postalCode)) {
      setError("Código postal com formato inválido(ex. 1111-111)");
      return false;
    }
    if (!housingConditions) {
      setError("Condições de habitabilidade: vazio");
      return false;
    }
    if (!area || !validateArea(area)) {
      setError("Área bruta deve ser um número entre 1 e 9999");
      return false;
    }
    if (!selectedYear) {
      setError("Ano selecionado: vazio");
      return false;
    }
    if (!latitude || !validateLatitude(latitude)) {
      setError("latitude: deve ser um número entre -90 e 90");
      return false;
    }
    if (!longitude || !validateLongitude(longitude)) {
      setError("longitude: deve ser um número entre -180 e 180");
      return false;
    }

    return true;
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const sanitizedFormData = {
        typeOfHouse: xss(typeOfHouse.trim()),
        housingConditions: xss(housingConditions.trim()),
        selectedOption: xss(selectedOption.trim()),
        selectedYear: xss(selectedYear.trim()),
        area: xss(area.trim()),
        streetName: xss(streetName.trim()),
        locality: xss(locality.trim()),
        postalCode: xss(postalCode.trim()),
        latitude: xss(latitude.trim()),
        longitude: xss(longitude.trim()),
        email: userEmail,
      };
      console.log(sanitizedFormData);

      const registerHouse = await fetch(REGISTER_HOUSE_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(sanitizedFormData),
      });

      if (!registerHouse.ok) {
        throw new Error("Failed to register house");
      }
      alert("Casa Criada com sucesso!");
      const form = event.target as HTMLFormElement;
      form.reset();
      router.push("/housesInRecord");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid place-items-center h-screen pt-24 ">
      <div className="p-5 border-black-400 border-2 bg-gray-100 pb-20">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col">
            {/* type of house *********************************/}
            <p className="font-bold mt-5">Tipo de casa</p>
            <HouseTypeRadioGroup
              setTypeOfHouse={setTypeOfHouse}
              typeOfHouse={typeOfHouse}
              selectedOption={selectedOption}
              handleOptionChange={handleOptionChange}
            />
            {/* adress *********************************/}
            <div>
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
            {/* housing conditions *********************************/}
            <div className="flex flex-col">
              <p className="font-bold mt-5">Condições de habitabilidade</p>
              <HousingConditionsRadioGroup
                setHousingConditions={setHousingConditions}
              />
            </div>
            {/* year of construction *********************************/}
            <p className="font-bold mt-6">Ano de construção</p>
            <YearSelect
              selectedYear={selectedYear}
              handleYearChange={handleYearChange}
              years={years}
            />
            {/* area *********************************/}
            <p className="font-bold mt-5">Área Bruta</p>
            <AreaInputField area={area} setArea={setArea} />
            {/* GPS *********************************/}
            <div>
              <p className="font-bold mt-5">Georreferenciação</p>
              <GeoLocationInputFields
                latitude={latitude}
                longitude={longitude}
                setLatitude={setLatitude}
                setLongitude={setLongitude}
              />
            </div>
            <button className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3">
              Registar
            </button>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
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
