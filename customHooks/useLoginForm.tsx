/**
 * Custom hook to handle login form state and submission.
 *
 * Manages state for email, password, error message, loading state.
 * Handles form submission - sanitizes inputs, validates, calls signIn API.
 * Handles redirect to register page.
 * Returns email, password, error, loading state, submit and register handlers.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import xss from "xss";
import { validateEmail, validatePassword } from "@/utils/validationUtils";

import { validateLoginForm } from "@/utils/validationUtils";

const useLoginForm = () => {
  //set useState
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sanitize inputs
      const sanitizedEmail = xss(email);
      const sanitizedPassword = xss(password);

      const validationError = validateLoginForm(
        sanitizedEmail,
        sanitizedPassword
      );
      if (validationError) {
        setError(validationError);
        return;
      }

      setLoading(true);

      /**
       * Signs the user in using credentials with NextAuth.
       * @param credentials Contains email and password from form state
       * @param options NextAuth signIn options - redirect is set to false
       * @returns Response from NextAuth signIn call
       */
      /**
       * Calls the signIn API from next-auth to authenticate the user,
       * passing the sanitized email and password.
       * Returns the response from the API.
       */
      const res = await signIn("credentials", {
        email: sanitizedEmail,
        password: sanitizedPassword,
        redirect: false,
      });

      if (res?.error) {
        setError("Credenciais inválidas");
        return;
      }

      router.push("/dashboard");
    } catch (error) {
      setError("Ocorreu um erro durante o login. Por favor, tente novamente.");
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterClick = () => {
    router.push("/register");
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
    handleRegisterClick,
  };
};

export default useLoginForm;
