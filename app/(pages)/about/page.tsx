"use client";

import { useUserRole } from "@/context/useRoleContext";
import { useFetchUserRole } from "@/customHooks/useFetchUserRole";
import Link from "next/link";

export default function AboutPage() {
  const { userRole, setUserRole } = useUserRole();
  useFetchUserRole(userRole, setUserRole);

  console.log("userRole: ", userRole);

  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex flex-col  justify-center items-center">
        <div className="flex flex-col items-center justify-center">
          <h1>Sobre</h1>
          {userRole === "houseOwner" ? (
            <Link href="/housesInRecord">
              <button className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950">
                Voltar
              </button>
            </Link>
          ) : (
            <Link href="/allHousesInRecord">
              <button className="btn btn-sm rounded-none md:btn-md mt-4 mb-4 bg-teal-950 text-white hover:text-teal-950">
                Voltar
              </button>
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
