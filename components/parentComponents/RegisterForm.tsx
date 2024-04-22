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

import GovUserAccessLink from "../childComponents/(govUserOnly)/GovUserAccessLink";
import SurnameInput from "../childComponents/Surname";

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
    handleLoginClick,
    // custom hook
  } = useRegisterForm();

  return (
    <div className="grid place-items-center">
      <div className="p-4 lg:w-96 lg:p-4 w-72">
        <div className="flex items-center justify-center">
          <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
            Registar - Proprietário
          </h1>
        </div>
        <div className="divider divider-primary"></div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* child components of inputs */}

          <NameInput value={name} onChange={setName} />
          <SurnameInput value={surname} onChange={setSurname} />
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />

          {/* submit button & error message */}
          <CustomSubmitButton
            onClick={() => handleSubmit}
            disabled={loading}
            loading={loading}
            text="Registar"
          />
          <ErrorMessage error={error} />
        </form>
        <div className="divider divider-primary"></div>
        <p
          className="text-center cursor-pointer text-xs lg:text-base"
          onClick={handleLoginClick}
        >
          Já tem conta? <span className="link link-info">Login</span>
        </p>
        <GovUserAccessLink />
      </div>
    </div>
  );
}
