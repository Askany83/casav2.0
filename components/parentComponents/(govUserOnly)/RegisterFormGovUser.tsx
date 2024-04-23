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
import HouseOwnerAccessLink from "@/components/childComponents/HouseOwnerAccessLink";
import { ImUserPlus } from "react-icons/im";
import SurnameInput from "@/components/childComponents/Surname";

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
    handleLoginClick,
    municipality,
    setMunicipality,
    // custom hook
  } = useRegisterFormGovUser();

  return (
    <div className="grid place-items-center">
      <div className="p-4 lg:w-96 lg:p-4 w-72">
        <div className="flex items-center justify-center">
          <h1 className="text-sm md:text-xl font-black text-gray-900 text-left">
            Registar - Entidade Pública
          </h1>
        </div>
        <div className="divider divider-primary"></div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* child components of inputs */}

          <MunicipalityInput value={municipality} onChange={setMunicipality} />
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
        <HouseOwnerAccessLink />
      </div>
    </div>
  );
}
