/**
 * Register form component.
 *
 * Renders child input components and submit button.
 * Handles form submission using custom hook.
 */

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
import useRegisterForm from "@/customHooks/useRegisterForm";
import SurnameInput from "../childComponents/Surname";
import { useState, useEffect } from "react";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validationUtils";

export default function RegisterForm() {
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

    // custom hook
  } = useRegisterForm();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [surnameError, setSurnameError] = useState("");
  const [nameError, setNameError] = useState("");

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
  }, [email, password, surname, name]);

  return (
    <div className="grid place-items-center">
      <div className="p-4 lg:w-96 lg:p-4 w-72">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
            Registar - Proprietário
          </h1>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* child components of inputs */}

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
