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

export default function RegisterForm() {
  const {
    name,
    setName,
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    handleLoginClick,
    // custom hook ****************************************************************************************************************************
  } = useRegisterForm();

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 border-black-400 border-2 bg-gray-100">
        <h1 className="text-xl font-bold mb-4 text-gray-900 text-center">
          Registar
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* child components of inputs ****************************************************************************************************************************/}

          <NameInput value={name} onChange={setName} />
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />

          {/* submit button & error message ****************************************************************************************************************************/}
          <CustomSubmitButton
            onClick={() => handleSubmit}
            disabled={loading}
            loading={loading}
            text="Registar"
          />

          <ErrorMessage error={error} />
          <p className="text-center cursor-pointer " onClick={handleLoginClick}>
            Já tem conta? <span className="underline">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
