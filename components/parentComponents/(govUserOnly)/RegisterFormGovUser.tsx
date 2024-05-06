"use client";

import dynamic from "next/dynamic";
const ErrorMessage = dynamic(
  () => import("@/components/childComponents/ErrorMessage")
);
const NameInput = dynamic(
  () => import("@/components/childComponents/NameInput")
);
const EmailInput = dynamic(
  () => import("@/components/childComponents/EmailInput")
);
const PasswordInput = dynamic(
  () => import("@/components/childComponents/PasswordInput")
);
const CustomSubmitButton = dynamic(
  () => import("@/components/childComponents/CustomSubmitButton")
);

// import { UserPlus } from "@phosphor-icons/react";

import MunicipalityInput from "@/components/childComponents/(govUserOnly)/MunicipalityInputField";
import useRegisterFormGovUser from "@/customHooks/(govUserOnly)/useRegisterFormGovUser";
import SurnameInput from "@/components/childComponents/Surname";
import {
  validateEmail,
  validateMunicipality,
  validateName,
  validatePassword,
} from "@/utils/validationUtils";
import { useState, useEffect } from "react";

export default function RegisterFormGovUser() {
  const {
    name,
    setName,
    surname,
    setSurname,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,

    municipality,
    setMunicipality,
    // custom hook
  } = useRegisterFormGovUser();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [nameError, setNameError] = useState("");
  const [municipalityError, setMunicipalityError] = useState("");

  useEffect(() => {
    // Validate email
    if (email && !validateEmail(email)) {
      setEmailError("Formato de email inválido");
    } else {
      setEmailError("");
    }

    // Validate password
    if (password && !validatePassword(password)) {
      setPasswordError(
        "Pelo menos 8 caracteres, incluindo letras maiúsculas, minúsculas e números"
      );
    } else {
      setPasswordError("");
    }

    if (surname && !validateName(surname)) {
      setSurnameError("Apelido deve ter pelo menos 3 letras");
    } else {
      setSurnameError("");
    }

    if (name && !validateName(name)) {
      setNameError("Nome deve ter pelo menos 3 letras");
    } else {
      setNameError("");
    }

    if (municipality && !validateMunicipality(municipality)) {
      setMunicipalityError("Concelho deve ter pelo menos 3 letras");
    } else {
      setMunicipalityError("");
    }
  }, [email, password, surname, name, municipality]);

  return (
    <div className="grid place-items-center">
      <div className="p-4 lg:w-96 lg:p-4 w-72">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
            Registar - Entidade Pública
          </h1>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* child components of inputs */}

          <MunicipalityInput
            value={municipality}
            onChange={setMunicipality}
            errorMessage={municipalityError}
          />
          <NameInput value={name} onChange={setName} errorMessage={nameError} />
          <SurnameInput
            value={surname}
            onChange={setSurname}
            errorMessage={surnameError}
          />
          <EmailInput
            value={email}
            onChange={setEmail}
            errorMessage={emailError}
          />
          <PasswordInput
            value={password}
            onChange={setPassword}
            errorMessage={passwordError}
          />

          {/* submit button & error message */}
          <CustomSubmitButton
            onClick={() => handleSubmit}
            disabled={loading}
            loading={loading}
            text="Registar"
          />

          <ErrorMessage error={error} />
        </form>
      </div>
    </div>
  );
}
