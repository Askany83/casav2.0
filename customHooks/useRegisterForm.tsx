/**
 * Custom hook for handling user registration form state and submission.
 *
 * Manages form field values, validation, api calls to check for existing user,
 * and submission to register new user. Returns handlers to update form values,
 * submit form, and navigate to login page.
 */
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "@/utils/valitationUtils";
import {
  USER_EXISTS_API_ENDPOINT,
  REGISTER_USER_API_ENDPOINT,
} from "@/fetchCallServices/apiEndpoints";
import xss from "xss";
import { post } from "@/fetchCallServices/fetchCalls";
import { useRef } from "react";

export default function useRegisterForm() {
  //set useState
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const formRef = useRef<HTMLFormElement>(null);

  //get router
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    //prevenir o refresh da página
    e.preventDefault();

    //verificar se campos estão preenchidos
    if (!name || !email || !password) {
      setError("Todos os campos devem ser preenchidos!");
      return;
    }

    if (!validateName(name)) {
      setError("Nome deve ter entre 5 e 20 letras!");
      return;
    }

    //verificar se o email é válido
    if (!validateEmail(email)) {
      setError("O email inserido não é válido!");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password deve conter caracteres especiais, números e letras maiúsculas e minúsculas, e ter pelo menos 8 caracteres!"
      );
      setError("Password não oferece segurança suficiente!");
      return;
    }

    try {
      // Set loading state to true
      setLoading(true);

      const userExistsResponse = await post<{ user: any }>(
        USER_EXISTS_API_ENDPOINT,
        { email: xss(email) }
      );

      if (userExistsResponse.user) {
        setError("Este email já está registado!");
        setLoading(false);
        return;
      }

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

  const handleLoginClick = () => {
    router.push("/");
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
