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
import ErrorMessage from "@/components/childComponents/ErrorMessage";

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
      setLocalityError("localidade deve ter pelo menos 5 caracteres");
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
      <input
        type="text"
        className="mt-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Morada"
        value={streetName}
        onChange={(e) => setStreetName(e.target.value)}
        id="streetName"
      />
      {streetNameError && (
        <div className="mt-4">
          <ErrorMessage error={streetNameError} />
        </div>
      )}
      <input
        type="text"
        className="mt-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Localidade"
        value={locality}
        onChange={(e) => setLocality(e.target.value)}
        id="locality"
        //was giving warning in dev tools if not set
        autoComplete="off"
      />
      {localityError && (
        <div className="mt-4">
          <ErrorMessage error={localityError} />
        </div>
      )}
      <input
        type="text"
        className="mt-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Freguesia"
        value={civilParish}
        onChange={(e) => setCivilParish(e.target.value)}
        id="civilParish"
      />
      {civilParishError && (
        <div className="mt-4">
          <ErrorMessage error={civilParishError} />
        </div>
      )}
      <input
        type="text"
        className="my-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Concelho"
        value={municipality}
        onChange={(e) => setMunicipality(e.target.value)}
        id="municipality"
      />
      {municipalityError && (
        <div className="mt-4">
          <ErrorMessage error={municipalityError} />
        </div>
      )}
      <input
        type="text"
        className="mb-3 input input-bordered input-sm input-neutral rounded-none md:input-md w-full max-w-xs"
        placeholder="Código postal"
        value={postalCode}
        onChange={(e) => setPostalCode(e.target.value)}
        id="postalCode"
      />
      {postalCodeError && (
        <div className="mt-4">
          <ErrorMessage error={postalCodeError} />
        </div>
      )}
    </div>
  );
};
