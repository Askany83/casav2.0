/**
 * AddressInputFields component renders input fields for street name, locality and postal code.
 * It takes in the current values and change handler functions for each field as props.
 */
"use client ";

import { useEffect, useState } from "react";
import {
  validateLocality,
  validateStreetName,
  validatePostalCode,
} from "@/utils/validationUtils";
import InputErrorMessage from "@/components/childComponents/InputErrorMessage";
import { TbAlertTriangle } from "react-icons/tb";

export const AddressInputFields: React.FC<{
  streetName: string;
  locality: string;
  civilParish: string;
  municipality: string;
  postalCode: string;
  setStreetName: Function;
  setLocality: Function;
  setCivilParish: Function;
  setMunicipality: Function;
  setPostalCode: Function;
}> = ({
  streetName,
  locality,
  civilParish,
  municipality,
  postalCode,
  setStreetName,
  setLocality,
  setCivilParish,
  setMunicipality,
  setPostalCode,
}) => {
  const [streetNameError, setStreetNameError] = useState("");
  const [localityError, setLocalityError] = useState("");
  const [civilParishError, setCivilParishError] = useState("");
  const [municipalityError, setMunicipalityError] = useState("");
  const [postalCodeError, setPostalCodeError] = useState("");

  useEffect(() => {
    // Validate street name
    if (streetName && !validateStreetName(streetName)) {
      setStreetNameError("Nome da rua deve ter pelo menos 5 caracteres");
    } else {
      setStreetNameError("");
    }

    if (locality && !validateLocality(locality)) {
      setLocalityError("Localidade deve ter pelo menos 5 caracteres");
    } else {
      setLocalityError("");
    }

    if (civilParish && !validateLocality(civilParish)) {
      setCivilParishError("Freguesia deve ter pelo menos 3 caracteres");
    } else {
      setCivilParishError("");
    }

    if (municipality && !validateLocality(municipality)) {
      setMunicipalityError("Concelho deve ter pelo menos 3 caracteres");
    } else {
      setMunicipalityError("");
    }

    if (postalCode && !validatePostalCode(postalCode)) {
      setPostalCodeError("Formato inválido (ex: 1111-111)");
    } else {
      setPostalCodeError("");
    }
  }, [streetName, locality, civilParish, municipality, postalCode]);

  return (
    <div className="flex flex-col -mt-1 ">
      <p className="font-bold mt-1 text-sm">Morada</p>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <input
          type="text"
          placeholder="Morada"
          value={streetName}
          onChange={(e) => setStreetName(e.target.value)}
          id="streetName"
          className="grow"
        />
        {streetNameError && (
          <TbAlertTriangle size={20} className="text-red-500" />
        )}
      </label>
      {streetNameError && (
        <div className="mt-1">
          <InputErrorMessage error={streetNameError} />
        </div>
      )}
      <p className="font-bold mt-5 text-sm">Localidade</p>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <input
          type="text"
          placeholder="Localidade"
          value={locality}
          onChange={(e) => setLocality(e.target.value)}
          id="locality"
          className="grow"
          //was giving warning in dev tools if not set
          autoComplete="off"
        />
        {localityError && (
          <TbAlertTriangle size={20} className="text-red-500" />
        )}
      </label>
      {localityError && (
        <div className="mt-1">
          <InputErrorMessage error={localityError} />
        </div>
      )}
      <p className="font-bold mt-5 text-sm">Freguesia</p>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <input
          type="text"
          className="grow"
          placeholder="Freguesia"
          value={civilParish}
          onChange={(e) => setCivilParish(e.target.value)}
          id="civilParish"
        />
        {civilParishError && (
          <TbAlertTriangle size={20} className="text-red-500" />
        )}
      </label>
      {civilParishError && (
        <div className="mt-1">
          <InputErrorMessage error={civilParishError} />
        </div>
      )}
      <p className="font-bold mt-5 text-sm">Concelho</p>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <input
          type="text"
          className="grow"
          placeholder="Concelho"
          value={municipality}
          onChange={(e) => setMunicipality(e.target.value)}
          id="municipality"
        />
        {municipalityError && (
          <TbAlertTriangle size={20} className="text-red-500" />
        )}
      </label>
      {municipalityError && (
        <div className="mt-1">
          <InputErrorMessage error={municipalityError} />
        </div>
      )}
      <p className="font-bold mt-5 text-sm">Código Postal</p>
      <label className="input input-bordered input-neutral rounded-none flex items-center gap-2 input-sm md:input-md">
        <input
          type="text"
          className="grow"
          placeholder="Código postal"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          id="postalCode"
        />
        {postalCodeError && (
          <TbAlertTriangle size={20} className="text-red-500" />
        )}
      </label>
      {postalCodeError && (
        <div className="mt-1">
          <InputErrorMessage error={postalCodeError} />
        </div>
      )}
    </div>
  );
};
