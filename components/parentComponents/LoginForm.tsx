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

import GovUserAccessLink from "../../NOT IN USE/GovUserAccessLink";

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
        <div className="flex items-center justify-center mb-8">
          <h1 className="text-sm md:text-xl font-black text-gray-900 text-left text">
            Entrar - Proprietário
          </h1>
        </div>

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

        {/* register user link */}
        <p
          className="text-center cursor-pointer text-sm"
          onClick={handleRegisterClick}
        >
          Não tem conta?{" "}
          <span className="link link-info no-underline">Registar</span>
        </p>
      </div>
    </div>
  );
}
