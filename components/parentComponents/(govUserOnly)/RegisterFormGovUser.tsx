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

export default function RegisterFormGovUser() {
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
    municipality,
    setMunicipality,
    // custom hook
  } = useRegisterFormGovUser();

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 border-black-400 border-2 bg-amber-50 rounded-lg">
        <div className="flex items-center">
          {/* <UserPlus
            size={32}
            weight="bold"
            style={{ fill: "black" }}
            className="mb-4 mr-2"
          /> */}
          <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
            Registar GovUser
          </h1>
        </div>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          {/* child components of inputs */}

          <MunicipalityInput value={municipality} onChange={setMunicipality} />
          <NameInput value={name} onChange={setName} />
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
          <p className="text-center cursor-pointer " onClick={handleLoginClick}>
            Já tem conta? <span className="link">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
