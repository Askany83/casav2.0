/**
 * Renders the login form component.
 *
 * Checks if the user is already logged in via session data.
 * If so, redirects to the dashboard page.
 * Otherwise, renders the login form component.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import LoginForm from "@/components/parentComponents/LoginForm";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CASA v2.0 - Login",
  description: "Cadastro de Alojamento Sem Aproveitamento",
  icons: {
    icon: "/logosCASA/casaFavicon.png",
  },
};

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/housesInRecord");
  return (
    <main className="min-h-screen flex flex-col lg:flex-row relative">
      <div className="w-full flex flex-col justify-center items-center relative z-10">
        {/* <LogoCasa /> */}
        <LoginForm />
      </div>
    </main>
  );
}
