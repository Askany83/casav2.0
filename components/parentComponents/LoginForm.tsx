/**
 * Login form component.
 *
 * Renders email and password inputs, submit button,
 * and error message. Contains custom hook for form logic.
 */

"use client";

import EmailInput from "@/components/childComponents/EmailInput";
import PasswordInput from "@/components/childComponents/PasswordInput";
import CustomSubmitButton from "@/components/childComponents/CustomSubmitButton";
import ErrorMessage from "@/components/childComponents/ErrorMessage";
import useLoginForm from "@/customHooks/useLoginForm";
import { ShieldCheckered } from "@phosphor-icons/react";
import GovUserAccessLink from "../childComponents/(govUserOnly)/GovUserAccessLink";

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
  } = useLoginForm();

  return (
    <div className="grid place-items-center h-screen ">
      <div className="p-5 border-black-400 border-2 bg-amber-50 rounded-lg ">
        <div className="flex items-center">
          <ShieldCheckered
            size={32}
            weight="fill"
            style={{ fill: "black" }}
            className="mb-4 mr-2"
          />
          <h1 className="text-xl font-bold mb-4 text-gray-900 text-left">
            Login houseOwner
          </h1>
        </div>

        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
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

          {/* register user link */}
          <p
            className="text-center cursor-pointer"
            onClick={handleRegisterClick}
          >
            Não tem conta? <span className="link">Registe-se!</span>
          </p>
          <GovUserAccessLink />
        </form>
      </div>
    </div>
  );
}
