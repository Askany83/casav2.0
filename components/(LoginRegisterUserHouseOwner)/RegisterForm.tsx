"use client";

import { useState, lazy, Suspense } from "react";
import { useRouter } from "next/navigation";
import {
  validateEmail,
  validatePassword,
  validateName,
} from "../../app/utils/valitationUtils";
import {
  USER_EXISTS_API_ENDPOINT,
  REGISTER_USER_API_ENDPOINT,
} from "../../app/utils/URLManager";
import ErrorMessage from "../(UtilsComponents)/ErrorMessage";
import xss from "xss";

export default function RegisterForm() {
  //set useState
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  //get router
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    //prevenir o refresh da página
    e.preventDefault();

    //check
    // console.log("env: ", process.env);

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

    //verificar password, Password deve conter caracteres especiais, números e letras maiúsculas, minúsculas e pelo menos 8 caracteres

    try {
      // Set loading state to true
      setLoading(true);

      //do a fetch call to the api route - userExists - para ver se o email já está registado
      const userExistsResponse = await fetch(USER_EXISTS_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: xss(email),
        }),
      });

      if (!userExistsResponse.ok) {
        throw new Error("Failed to check user existence");
      }
      //se o User não é null - setError para mostrar o erro
      const { user } = await userExistsResponse.json();

      if (user) {
        setError("Este email já está registado!");
        setLoading(false);
        return;
      }

      //do a fetch call to the api route - register - guardar user na base de  dados
      const registerResponse = await fetch(REGISTER_USER_API_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: xss(name),
          email: xss(email),
          password: xss(password),
        }),
      });

      if (!registerResponse.ok) {
        throw new Error("Failed to register user");
      }

      alert("Utilizador Criado com sucesso!");
      const form = e.target as HTMLFormElement;
      form.reset();
      router.push("/");
    } catch (error: any) {
      console.log("Error during registration: ", error);
      setError((error && error.message) || "Erro durante o registo");
    } finally {
      setLoading(false);
    }
  };

  // console.log("Nome: ", name);
  // console.log("Email: ", email);
  // console.log("Password: ", password);

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 border-black-400 border-2 bg-gray-100">
        <h1 className="text-xl font-bold my-4 text-gray-900 text-center">
          Registar
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nome"
            onChange={(e) => setName(e.target.value)}
            id="nameIput"
          />
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            id="emailInput"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
          />
          <button
            className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2"
            disabled={loading} // Disable button when loading state is true
          >
            {loading ? "A processar..." : "Registar"}
          </button>

          <ErrorMessage error={error} />
          <p
            className="text-center cursor-pointer "
            onClick={() => router.push("/")}
          >
            Já tem conta? <span className="underline">Login</span>
          </p>
        </form>
      </div>
    </div>
  );
}
