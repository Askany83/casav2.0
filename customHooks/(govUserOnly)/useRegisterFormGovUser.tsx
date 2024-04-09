/**
 * Custom hook to handle user registration form state and submission.
 *
 * Manages form field values, validation, api calls,
 * error handling, and routing.
 */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { USER_EXISTS_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";
import xss from "xss";
import { post } from "@/fetchCallServices/fetchCalls";
import { useRef } from "react";
import { validateFormGovUser } from "@/utils/validationUtils";
import { REGISTER_GOV_USER_API_ENDPOINT } from "@/fetchCallServices/apiEndpoints";

export default function useRegisterFormGovUser() {
  // Default role set here
  const defaultRole = "govUser";

  // set useState
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [role, setRole] = useState(defaultRole);
  const [municipality, setMunicipality] = useState<string>("");

  const formRef = useRef<HTMLFormElement>(null);

  // set router
  const router = useRouter();

  //CHANGE ROUTE ???
  const handleLoginClick = () => {
    router.push("/loginGovUser");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    // prevent page refresh
    e.preventDefault();

    // validate inputs
    const validateFormResultGovUser = validateFormGovUser(
      municipality,
      name,
      email,
      password,
      setError
    );

    if (!validateFormResultGovUser) {
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
      await post(REGISTER_GOV_USER_API_ENDPOINT, {
        municipality: xss(municipality),
        name: xss(name),
        email: xss(email),
        password: xss(password),
        role,
      });
      alert("Município criado com sucesso!");

      const form = formRef.current;
      if (form) {
        form.reset();
      }

      //CHANGE ROUTE ???

      router.push("/loginGovUser");
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
    municipality,
    setMunicipality,
  };
}
