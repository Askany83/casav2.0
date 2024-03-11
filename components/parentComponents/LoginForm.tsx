/**
 * LoginForm component renders a login form.
 *
 * It uses the useLoginForm custom hook to manage form state and submit logic.
 * Renders EmailInput, PasswordInput, CustomButton and ErrorMessage sub-components.
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
const CustomButton = dynamic(
  () => import("@/components/childComponents/CustomButton")
);
import useLoginForm from "@/customHooks/useLoginForm";

export default function LoginForm() {
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
    <div className="grid place-items-center h-screen">
      <div className="p-5 border-black-400 border-2 bg-gray-100">
        <h1 className="text-xl font-bold mb-4 text-gray-900 text-center">
          Login
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <EmailInput value={email} onChange={setEmail} />
          <PasswordInput value={password} onChange={setPassword} />
          <CustomButton
            onClick={() => handleSubmit}
            disabled={loading}
            loading={loading}
            text="Entrar"
          />

          <ErrorMessage error={error} />

          <p
            className="text-center cursor-pointer"
            onClick={handleRegisterClick}
          >
            Não tem conta? <span className="underline">Registe-se!</span>
          </p>
        </form>
      </div>
    </div>
  );
}
