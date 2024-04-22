/**
 * Login form component.
 *
 * Renders email and password inputs, submit button,
 * and error message. Contains custom hook for form logic.
 */

"use client";

import dynamic from "next/dynamic";

import { ShieldCheckered } from "@phosphor-icons/react";

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
import HouseOwnerAccessLink from "@/components/childComponents/HouseOwnerAccessLink";

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
    handleRegisterClick,
  } = useLoginFormGovUser();

  return (
    <div className="grid place-items-center">
      <div className="p-4 glass rounded-lg max-w-md w-full">
        <div className="flex items-center justify-center">
          <ShieldCheckered
            size={32}
            weight="fill"
            style={{ fill: "black" }}
            className="mr-2"
          />
          <h1 className="text-xl font-black text-gray-900 text-left">
            Login - Entidade Pública
          </h1>
        </div>
        <div className="divider divider-primary"></div>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          {/* child components of inputs */}
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          {/* submit button & error message */}
          <CustomSubmitButton
            onClick={() => handleSubmit}
            disabled={loading}
            loading={loading}
            text="Entrar"
          />
          <ErrorMessage error={error} />
        </form>
        <div className="divider divider-primary"></div>
        {/* register user link */}
        <p
          className="text-center cursor-pointer text-sm"
          onClick={handleRegisterClick}
        >
          Não tem conta? <span className="link">Registe-se!</span>
        </p>
        <HouseOwnerAccessLink />
      </div>
    </div>
  );
}
