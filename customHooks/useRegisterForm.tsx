/**
 * Custom hook to handle user registration form state and submission.
 *
 * Manages form field values, validation, api calls,
 * error handling, and routing.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  USER_EXISTS_API_ENDPOINT,
  REGISTER_USER_API_ENDPOINT,
} from "@/fetchCallServices/apiEndpoints";
import xss from "xss";
import { post } from "@/fetchCallServices/fetchCalls";
import { useRef } from "react";
import { validateFormUser } from "@/utils/validationUtils";

export default function useRegisterForm() {
  // set useState
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  // set router
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // prevent page refresh
    e.preventDefault();

    // validate inputs
    const validateFormResult = validateFormUser(
      name,
      email,
      password,
      setError
    );

    if (!validateFormResult) {
      return;
    }

    try {
      // set loading state to true
      setLoading(true);

      // verify if user exists
      const userExistsResponse = await post<{ user: any }>(
        USER_EXISTS_API_ENDPOINT,
        { email: xss(email) }
      );

      if (userExistsResponse.user) {
        setError("Este email já está registado!");
        setLoading(false);
        return;
      }

      // register user if not exists
      await post(REGISTER_USER_API_ENDPOINT, {
        name: xss(name),
        email: xss(email),
        password: xss(password),
      });
      alert("Utilizador Criado com sucesso!");

      const form = formRef.current;
      if (form) {
        form.reset();
      }

      router.push("/");
    } catch (error: any) {
      console.log("Error during registration: ", error);
      setError((error && error.message) || "Erro durante o registo");
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
