/**
 * Login form component.
 *
 * Renders email and password inputs, submit button,
 * and error message. Contains custom hook for form logic.
 */

"use client";

import dynamic from "next/dynamic";

const ErrorMessage = dynamic(
  () => import("@/components/childComponents/ErrorMessage")
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

import useLoginFormGovUser from "@/customHooks/(govUserOnly)/useLoginFormGovUser";
import { validateEmail, validatePassword } from "@/utils/validationUtils";
import { useState, useEffect } from "react";

export default function LoginForm() {
  // use hook
  const {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  } = useLoginFormGovUser();

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
  }, [email, password]);

  return (
    <div className="grid place-items-center">
      <div className="p-4 lg:w-96 lg:p-4 w-72">
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
            Login - Entidade Pública
          </h1>
        </div>

        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* child components of inputs */}
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
            text="Entrar"
          />
          <ErrorMessage error={error} />
        </form>
      </div>
    </div>
  );
}
