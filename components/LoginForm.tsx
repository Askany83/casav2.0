"use client";

import { useState, lazy, Suspense } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import ErrorMessage from "@/components/ErrorMessage";
import xss from "xss";

export default function LoginForm() {
  //set useState
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    //prevenir o refresh da página
    e.preventDefault();

    // Sanitize email and password inputs
    const sanitizedEmail = xss(email);
    const sanitizedPassword = xss(password);

    if (!sanitizedEmail || !sanitizedPassword) {
      setError("Todos os campos devem ser preenchidos!");
      return;
    }

    try {
      setLoading(true);

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
      console.log("Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center h-screen">
      <div className="p-5 border-black-400 border-2 bg-gray-100">
        <h1 className="text-xl font-bold my-4 text-gray-900 text-center">
          Login
        </h1>
        <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            id="emailInput"
            value={email}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            id="passwordInput"
            value={password}
          />
          <button
            className="bg-gray-900 text-white font-bold cursor-pointer px-6 py-2"
            disabled={loading} // Disable button when loading state is true
          >
            {loading ? "A processar..." : "Entrar"}
          </button>

          <ErrorMessage error={error} />

          <p
            className="text-center cursor-pointer "
            onClick={() => router.push("/register")}
          >
            Não tem conta? <span className="underline">Registe-se!</span>
          </p>
        </form>
      </div>
    </div>
  );
}
