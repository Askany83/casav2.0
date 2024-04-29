/**
 * Page component for the register page.
 *
 * Checks if the user is already authenticated via getServerSession.
 * If so, redirects to /dashboard.
 * Otherwise, renders the <RegisterForm> component.
 */

import RegisterForm from "@/components/parentComponents/RegisterForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LogoCasa from "@/components/childComponents/logoCasa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CASA v2.0 - Entrar",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

export default async function Register() {
  const session = await getServerSession(authOptions);

  // console.log("session - register: ", session);
  if (session) redirect("/housesInRecord");
  return (
    <main className="min-h-screen flex flex-col lg:flex-row">
      <div className="w-full flex flex-col  justify-center items-center">
        {/* <LogoCasa /> */}
        <RegisterForm />
      </div>
    </main>
  );
}
