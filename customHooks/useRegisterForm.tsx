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
  // Default role set here
  const defaultRole = "houseOwner";

  // set useState
  const [name, setName] = useState<string>("");
  const [surname, setSurname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState(defaultRole);

  const formRef = useRef<HTMLFormElement>(null);

  // set router
  const router = useRouter();

  //form state reset
  const handleReset = () => {
    setName("");
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // prevent page refresh
    e.preventDefault();

    // validate inputs - returns setError
    const validateFormResult = validateFormUser(
      name,
      surname,
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
        surname: xss(surname),
        email: xss(email),
        password: xss(password),
        role,
      });

      alert("Utilizador Criado com sucesso!");
      handleReset();

      router.push("/");
    } catch (error: any) {
      setError("Erro de conexão, tente novamente mais tarde.");
      setLoading(false);

      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  return {
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
  };
}
