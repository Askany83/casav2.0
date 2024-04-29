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
    <div className="grid place-items-center ">
      <div className="p-4 lg:w-96 lg:p-4 w-72">
        <div className="flex items-center justify-center">
          <h1 className="text-sm md:text-xl font-black text-gray-900 text-left text">
            Login - Proprietário
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
          className="text-center cursor-pointer text-xs lg:text-base"
          onClick={handleRegisterClick}
        >
          Não tem conta? <span className="link link-info">Registe-se!</span>
        </p>
        <GovUserAccessLink />
      </div>
    </div>
  );
}
