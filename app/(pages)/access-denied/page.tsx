"use client";

import { signOut } from "next-auth/react";
import { useUserRole } from "@/context/useRoleContext";
import { useRouter } from "next/navigation";

export default function AccessDeniedPage() {
  const { userRole } = useUserRole();
  const router = useRouter();

  console.log("User role - access denied:", userRole);

  const handleSignOut = async () => {
    console.log("Sign out");
    await signOut();
    sessionStorage.clear();
    // Redirect users based on their roles after sign out
    if (userRole === "houseOwner") {
      console.log("Redirecting house owner to home page");
      router.push("/");
    } else if (userRole === "govUser") {
      console.log("Redirecting gov user to home page");
      window.location.href = "/loginGovUser";
    } else {
      console.error("Unknown role:", userRole);
      console.log("Redirecting to home page");
      // Redirect to a default page in case of an unknown role
      router.push("/");
    }
  };

  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 flex justify-center items-center">
      <div className="border border-black bg-amber-50 p-5 rounded-lg text-center">
        <div className="font-bold mb-4">
          <h1>Acesso Negado</h1>
        </div>
        <div className="mt-8">
          <p className="mb-3">
            Não tem a permissão necessária para realizar esta ação.
          </p>
          <p className="mb-8">
            Por favor faça login com as credênciais correctas!
          </p>
        </div>
        <div>
          <ul className="mb-0">
            <li
              className="btn btn-ghost border border-gray-400"
              onClick={handleSignOut}
            >
              Sair
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
