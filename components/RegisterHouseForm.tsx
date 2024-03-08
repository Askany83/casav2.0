"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { REGISTER_HOUSE_API_ENDPOINT } from "./URLManager";
import {
  validateStreetName,
  validateLocality,
  validatePostalCode,
  validateArea,
  validateLatitude,
  validateLongitude,
} from "@/app/utils/valitationUtils";
import ErrorMessage from "@/components/ErrorMessage";
import xss from "xss";
import { useSession } from "next-auth/react";

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
            <div className="flex items-center my-1">
              <input
                type="radio"
                name="houseType"
                value="apartamento"
                onChange={() => setTypeOfHouse("apartamento")}
                className="form-radio h-4 w-4 text-black "
                id="apartamento"
                defaultChecked={typeOfHouse === "apartamento"}
              />
              <label htmlFor="apartamento" className="flex items-center ml-2">
                Apartamento
              </label>
            </div>
            <div className="flex items-center my-1">
              <input
                type="radio"
                name="houseType"
                value="moradia"
                onChange={() => setTypeOfHouse("moradia")}
                className="form-radio h-4 w-4 text-black "
                id="moradia"
              />
              <label htmlFor="moradia" className="flex items-center ml-2">
                Moradia
              </label>
            </div>
            {typeOfHouse && (
              <div className="mt-2 h-30 w-210">
                <select
                  className="px-3 py-2 border"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  id="selectedOption"
                >
                  {typeOfHouse === "apartamento" ? (
                    <>
                      <option value="t1" id="t1">
                        T1
                      </option>
                      <option value="t2" id="t2">
                        T2
                      </option>
                    </>
                  ) : (
                    <>
                      <option value="m1" id="m1">
                        M1
                      </option>
                      <option value="m2" id="m2">
                        M2
                      </option>
                    </>
                  )}
                </select>
              </div>
            )}
            {/* adress *********************************/}
            <div>
              <p className="font-bold mt-5">Morada</p>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="my-3"
                  placeholder="Nome da rua"
                  value={streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                  id="streetName"
                />
                <input
                  type="text"
                  className="my-3"
                  placeholder="Localidade"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  id="locality"
                  //was giving warning in dev tools if not set
                  autoComplete="off"
                />
                <input
                  type="text"
                  className="my-3"
                  placeholder="Código postal"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  id="postalCode"
                />
              </div>
            </div>
            {/* housing conditions *********************************/}
            <div className="flex flex-col">
              <p className="font-bold mt-5">Condições de habitabilidade</p>
              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  name="housingConditions"
                  value="habitavelManutencaoLeve"
                  onChange={() =>
                    setHousingConditions("habitavelManutencaoLeve")
                  }
                  className="form-radio h-4 w-4 text-black mt-1"
                  id="habitavelManutencaoLeve"
                />
                <label
                  htmlFor="habitavelManutencaoLeve"
                  className="flex items-center ml-2 h-6"
                >
                  Habitável - requer manutenção leve
                </label>
              </div>

              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  name="housingConditions"
                  value="habitavelRenovacao"
                  onChange={() => setHousingConditions("habitavelRenovacao")}
                  className="form-radio h-4 w-4 text-black mt-1"
                  id="habitavelRenovacao"
                />
                <label
                  htmlFor="habitavelRenovacao"
                  className="flex items-center ml-2 h-6"
                >
                  Habitável - requer obras de renovação
                </label>
              </div>

              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  name="housingConditions"
                  value="habitavelReparacao"
                  onChange={() => setHousingConditions("habitavelReparacao")}
                  className="form-radio h-4 w-4 text-black mt-1"
                  id="habitavelReparacao"
                />
                <label
                  htmlFor="habitavelReparacao"
                  className="flex items-center ml-2 h-6"
                >
                  Habitável - requer obras de reparação
                </label>
              </div>

              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  name="housingConditions"
                  value="naoHabitavelRemodelacao"
                  onChange={() =>
                    setHousingConditions("naoHabitavelRemodelacao")
                  }
                  className="form-radio h-4 w-4 text-black mt-1"
                  id="naoHabitavelRemodelacao"
                />
                <label
                  htmlFor="naoHabitavelRemodelacao"
                  className="flex items-center ml-2 h-6"
                >
                  Não Habitável - requer remodelação
                </label>
              </div>

              <div className="flex items-center mt-3">
                <input
                  type="radio"
                  name="housingConditions"
                  value="naoHabitavelDemolicao"
                  onChange={() => setHousingConditions("naoHabitavelDemolicao")}
                  className="form-radio h-4 w-4 text-black mt-1"
                  id="naoHabitavelDemolicao"
                />
                <label
                  htmlFor="naoHabitavelDemolicao"
                  className="flex items-center ml-2 h-6"
                >
                  Não Habitável - requer demolição
                </label>
              </div>
            </div>
            {/* year of construction *********************************/}
            <p className="font-bold mt-6">Ano de construção</p>
            <div className="mt-4 h-30 w-210">
              <select
                className="px-3 py-2 border"
                value={selectedYear}
                onChange={handleYearChange}
                id="selectedYear"
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {/* area *********************************/}
            <p className="font-bold mt-5">Área Bruta</p>
            <div className="flex flex-col">
              <input
                type="text"
                className="my-3"
                placeholder="m&sup2;"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                id="area"
              />
            </div>
            {/* GPS *********************************/}
            <div>
              <p className="font-bold mt-5">Georreferenciação</p>
              <div className="flex flex-col">
                <input
                  type="text"
                  className="my-3"
                  placeholder="latitude"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  id="latitude"
                />
                <input
                  type="text"
                  className="my-3"
                  placeholder="longitude"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  id="longitude"
                />
              </div>
            </div>
            <button className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2 my-3">
              Registar
            </button>
          </div>
          {error && (
            <div className="flex justify-center">
              <ErrorMessage error={error} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};
