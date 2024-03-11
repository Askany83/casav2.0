/**
 * RegisterForm component handles the register form and register logic.
 *
 * Uses the custom hook useRegisterForm to manage state and submit logic.
 * Renders child components like input fields and buttons.
 * Navigates to login page on click of login link.
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
const CustomButton = dynamic(
  () => import("@/components/childComponents/CustomButton")
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
  } = useRegisterForm();

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 border-black-400 border-2 bg-gray-100">
        <h1 className="text-xl font-bold mb-4 text-gray-900 text-center">
          Registar
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <NameInput value={name} onChange={setName} />
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          <CustomButton
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
